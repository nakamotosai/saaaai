import React from 'react';
import { SOCIAL_LINKS, SITE_META, SEIGAIHA_PATTERN } from '../constants';
import { motion } from 'framer-motion';

const Footer: React.FC<{ canShow: boolean }> = ({ canShow }) => {
  return (
    <footer id="contact" className="relative z-20 md:mt-12 md:mb-6 mb-12 px-6 md:px-12 flex justify-center scroll-mt-24">
      <motion.div
        initial="hidden"
        whileInView={canShow ? "visible" : "hidden"}
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }}
        transition={{
          duration: 1.0,
          ease: "easeOut"
        }}
        className="w-full max-w-6xl bg-black/20 backdrop-blur-md border border-white/10 rounded-[2.5rem] py-4 px-8 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden"
      >
        {/* Seigaiha Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
          style={{
            backgroundImage: SEIGAIHA_PATTERN,
            backgroundSize: '80px 40px'
          }}
        ></div>

        {/* Brand / Copyright */}
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div
            className="flex items-baseline gap-0 select-none cursor-pointer"
            onClick={() => window.location.reload()}
          >
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white laser-text">
              {SITE_META.logoTitle}
            </span>
            {/* Animated Gradient AI.com */}
            <span className="text-xl md:text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-cyan-400 pb-1 animate-gradient-text">
              {SITE_META.logoHighlight}.com
            </span>
          </div>
          <span className="hidden md:inline-block w-px h-4 bg-white/20"></span>
          <p className="text-xs text-gray-400 laser-text">© {SITE_META.copyrightYear}</p>
        </div>

        {/* Socials Compact */}
        <div className="flex items-center gap-6 mb-4 md:mb-0">
          {SOCIAL_LINKS.map((link) => (
            <a key={link.platform} href={link.url} className="text-xs font-medium text-gray-400 transition-all uppercase tracking-wider laser-text">
              {link.platform}
            </a>
          ))}
        </div>

        {/* Contact Action */}
        <div>
          <a href={`mailto:${SITE_META.email}`} className="flex items-center gap-2 bg-black/40 hover:bg-black/60 border border-white/10 rounded-full px-4 py-2 text-xs font-bold text-white transition-all group">
            <span>Get in Touch</span>
            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </a>
        </div>

      </motion.div>
    </footer>
  );
};

export default Footer;