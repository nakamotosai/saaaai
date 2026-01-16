import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react';
import { NAV_LINKS, SITE_META, SEIGAIHA_PATTERN, PROJECTS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsQuickLinksOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close menu on click
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md bg-black/20 border-b border-white/10 text-white transition-all duration-300"
      >
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
          style={{
            backgroundImage: SEIGAIHA_PATTERN,
            backgroundSize: '80px 40px'
          }}
        ></div>

        <div className="flex items-center gap-8 z-50">
          <div
            className="group flex items-baseline gap-0 cursor-pointer select-none relative"
            onClick={() => window.location.reload()}
          >
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-white laser-text">
              {SITE_META.logoTitle}
            </span>
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-cyan-400 pb-1 animate-gradient-text">
              {SITE_META.logoHighlight}.com
            </span>
          </div>

          {/* Desktop Quick Links */}
          <div className="hidden md:block relative" ref={dropdownRef}>
            <button
              onClick={() => setIsQuickLinksOpen(!isQuickLinksOpen)}
              className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all laser-text group"
            >
              <span>快速链接</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isQuickLinksOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isQuickLinksOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-72 rounded-2xl overflow-hidden backdrop-blur-3xl bg-black/40 border border-white/10 shadow-2xl"
                >
                  <div className="py-2">
                    {PROJECTS.map((project, idx) => (
                      <a
                        key={project.id}
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 px-4 py-4 hover:bg-white/10 transition-all group/item"
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 shadow-lg">
                          <img src={project.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-sm font-bold text-gray-200 group-hover/item:text-white transition-colors truncate">
                            {project.title}
                          </span>
                          {project.url && project.id !== 3 && (
                            <span className="text-[10px] text-gray-500 group-hover/item:text-cyan-400/70 transition-colors truncate font-mono mt-0.5">
                              {project.url.replace(/^https?:\/\//, '')}
                            </span>
                          )}
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-600 group-hover/item:text-cyan-400 transition-colors opacity-0 group-hover/item:opacity-100" />
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide text-gray-300 z-50">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleScroll(e, link.id)}
              className="text-gray-300 hover:text-white transition-all uppercase laser-text"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden z-50 relative">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/98 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center p-8"
          >
            <div className="w-full max-w-xs flex flex-col gap-10">
              {/* Main Nav Links */}
              <div className="flex flex-col items-center gap-6">
                {NAV_LINKS.map((link, idx) => (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    onClick={(e) => handleScroll(e, link.id)}
                    className="text-2xl font-black tracking-widest text-white uppercase laser-text"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              {/* Mobile Quick Links Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-4 border-t border-white/10 pt-8"
              >
                <span className="text-xs font-bold text-white/40 tracking-[0.2em] text-center uppercase">Quick Links</span>
                <div className="grid grid-cols-1 gap-3">
                  {PROJECTS.map((project, idx) => (
                    <motion.a
                      key={project.id}
                      href={project.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.05 }}
                      className="flex items-center gap-4 px-4 py-4 rounded-2xl bg-white/5 border border-white/5 text-sm font-medium text-gray-300 hover:bg-white/10 active:scale-95 transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                        <img src={project.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col flex-1 text-left min-w-0">
                        <span className="font-bold text-gray-200 truncate">{project.title}</span>
                        {project.url && project.id !== 3 && (
                          <span className="text-[10px] text-gray-500 truncate font-mono mt-0.5">{project.url.replace(/^https?:\/\//, '')}</span>
                        )}
                      </div>
                      <ExternalLink className="w-4 h-4 text-white/20" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-12 text-xs text-white/30 font-mono laser-text"
            >
              {SITE_META.domainName}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;