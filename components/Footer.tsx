import React from 'react';
import { SOCIAL_LINKS, SITE_META, SEIGAIHA_PATTERN } from '../constants';
import { motion } from 'framer-motion';

const Footer: React.FC<{ canShow: boolean }> = ({ canShow }) => {
  return (
    <footer id="contact" className="relative z-20 md:mt-8 md:mb-12 mb-12 px-6 md:px-12 flex justify-center scroll-mt-24">
      <motion.div
        initial="hidden"
        whileInView={canShow ? "visible" : "hidden"}
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 }
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut"
        }}
        className="w-full max-w-6xl bg-black/30 backdrop-blur-xl border border-white/10 rounded-[2.5rem] py-6 px-8 flex flex-col items-center shadow-2xl relative overflow-hidden group"
      >
        {/* Seigaiha Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none z-0 transition-opacity group-hover:opacity-[0.04]"
          style={{
            backgroundImage: SEIGAIHA_PATTERN,
            backgroundSize: '120px 60px'
          }}
        ></div>

        {/* Compact Logo Section */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6 relative z-10">
          <div
            className="flex items-baseline gap-0 select-none cursor-pointer"
            onClick={() => window.location.reload()}
          >
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white laser-text">
              {SITE_META.logoTitle}
            </span>
            <span className="text-xl md:text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-cyan-400 pb-0.5 animate-gradient-text">
              {SITE_META.logoHighlight}.com
            </span>
          </div>
          <span className="hidden md:block w-px h-4 bg-white/20"></span>
          <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase">© {SITE_META.copyrightYear} Original</p>
        </div>

        {/* Tight Social Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 md:gap-x-12 relative z-10 w-full max-w-5xl">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target={link.url.startsWith('http') ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group/link flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-white/5 transition-colors"
            >
              <span className="text-[9px] font-bold text-cyan-400/60 group-hover/link:text-cyan-400 transition-colors uppercase tracking-[0.2em] mb-0.5">
                {link.platform.split(':')[0]}
              </span>
              <span className="text-[11px] md:text-xs font-medium text-white/60 group-hover/link:text-white transition-colors tracking-wide">
                {link.platform.includes(':') ? link.platform.split(':')[1].trim() : link.platform}
              </span>
            </a>
          ))}
        </div>

      </motion.div>
    </footer>
  );
};

export default Footer;