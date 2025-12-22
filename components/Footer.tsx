import React from 'react';
import { SOCIAL_LINKS, SITE_META } from '../constants';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      id="contact" 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-20 mt-12 mb-6 px-6 md:px-12 flex justify-center scroll-mt-24"
    >
      <div className="w-full max-w-6xl bg-black/40 backdrop-blur-xl border border-white/10 rounded-full py-4 px-8 flex flex-col md:flex-row items-center justify-between shadow-2xl">
        
        {/* Brand / Copyright */}
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="flex items-baseline gap-0 select-none">
             <span className="text-xl md:text-2xl font-black tracking-tighter text-white">
                {SITE_META.logoTitle}
             </span>
             {/* Animated Gradient AI */}
             <span className="text-xl md:text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 animate-gradient-text">
                {SITE_META.logoHighlight}
             </span>
             <span className="text-lg md:text-xl font-bold tracking-tight text-white/40 ml-0.5">
                .com
             </span>
          </div>
          <span className="hidden md:inline-block w-px h-4 bg-white/20"></span>
          <p className="text-xs text-gray-400">© {SITE_META.copyrightYear}</p>
        </div>

        {/* Socials Compact */}
        <div className="flex items-center gap-6 mb-4 md:mb-0">
            {SOCIAL_LINKS.map((link) => (
                <a key={link.platform} href={link.url} className="text-xs font-medium text-gray-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-500 transition-all uppercase tracking-wider">
                    {link.platform}
                </a>
            ))}
        </div>

        {/* Contact Action */}
        <div>
           <a href={`mailto:${SITE_META.email}`} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/5 rounded-full px-4 py-2 text-xs font-bold text-white transition-all group">
             <span>Get in Touch</span>
             <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
           </a>
        </div>

      </div>
    </motion.footer>
  );
};

export default Footer;