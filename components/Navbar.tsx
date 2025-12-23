import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE_META, SEIGAIHA_PATTERN } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close menu on click
    const element = document.getElementById(id);
    if (element) {
      // Small timeout to allow menu closing animation to start/finish
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
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md bg-black/20 border-b border-white/10 text-white transition-all duration-300 overflow-hidden"
      >
        {/* Seigaiha Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
          style={{
            backgroundImage: SEIGAIHA_PATTERN,
            backgroundSize: '80px 40px'
          }}
        ></div>
        <div
          className="group flex items-baseline gap-0 cursor-pointer select-none z-50 relative"
          onClick={() => window.location.reload()}
        >
          {/* 'saaa' part */}
          <span className="text-2xl md:text-3xl font-black tracking-tighter text-white laser-text">
            {SITE_META.logoTitle}
          </span>

          {/* 'ai.com' part - Animated Gradient */}
          <span className="text-2xl md:text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-cyan-400 pb-1 animate-gradient-text">
            {SITE_META.logoHighlight}.com
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide text-gray-300">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleScroll(e, link.id)}
              className="text-gray-300 transition-all uppercase laser-text"
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
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-md md:hidden flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                  onClick={(e) => handleScroll(e, link.id)}
                  className="text-2xl font-black tracking-widest text-white uppercase laser-text"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Decorative bottom element */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
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