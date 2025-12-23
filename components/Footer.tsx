import React from 'react';
import { SOCIAL_LINKS, SITE_META } from '../constants';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="relative z-20 md:mt-12 md:mb-6 mb-12 px-6 md:px-12 flex justify-center scroll-mt-24">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          duration: 1.0,
          ease: "easeOut"
        }}
        className="w-full max-w-6xl bg-white/5 border border-white/10 rounded-[2.5rem] py-4 px-8 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden"
      >
        {/* Seigaiha Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' width='120' height='60' viewBox='0 0 120 60'%3E%3Cpath fill='%23ffffff' d='M13.005 31.426a55 55 0 0 1 93.99 0 60 60 0 0 0-9.89 3.114 45 45 0 0 0-74.21 0 60 60 0 0 0-9.89-3.114zm14.499 5.249a40 40 0 0 1 64.992 0 60 60 0 0 0-8.496 5.325 30 30 0 0 0-48 0 60 60 0 0 0-8.496-5.325zm12.371 8.493a25 25 0 0 1 40.25 0 60 60 0 0 0-7.063 7.458 15 15 0 0 0-26.124 0 60 60 0 0 0-7.063-7.458zm10.477 12.202a10 10 0 0 1 19.296 0 60 60 0 0 0-1.897 3.133 60 60 0 0 0-15.502 0 60 60 0 0 0-1.897-3.133zM-46.995 61.426a55 55 0 0 1 93.99 0 60 60 0 0 0-9.89 3.114 45 45 0 0 0-74.21 0 60 60 0 0 0-9.89-3.114zm14.499 5.249a40 40 0 0 1 64.992 0 60 60 0 0 0-8.496 5.325 30 30 0 0 0-48 0 60 60 0 0 0-8.496-5.325zM73.005 61.426a55 55 0 0 1 93.99 0 60 60 0 0 0-9.89 3.114 45 45 0 0 0-74.21 0 60 60 0 0 0-9.89-3.114zm14.499 5.249a40 40 0 0 1 64.992 0 60 60 0 0 0-8.496 5.325 30 30 0 0 0-48 0 60 60 0 0 0-8.496-5.325zM-46.995 1.426a55 55 0 0 1 93.99 0 60 60 0 0 0-9.89 3.114 45 45 0 0 0-74.21 0 60 60 0 0 0-9.89-3.114zm14.499 5.249a40 40 0 0 1 64.992 0 60 60 0 0 0-8.496 5.325 30 30 0 0 0-48 0 60 60 0 0 0-8.496-5.325zm12.371 8.493a25 25 0 0 1 40.25 0 60 60 0 0 0-7.063 7.458 15 15 0 0 0-26.124 0 60 60 0 0 0-7.063-7.458zm10.477 12.202a10 10 0 0 1 19.296 0 60 60 0 0 0-1.897 3.133 60 60 0 0 0-15.502 0 60 60 0 0 0-1.897-3.133zM73.005 1.426a55 55 0 0 1 93.99 0 60 60 0 0 0-9.89 3.114 45 45 0 0 0-74.21 0 60 60 0 0 0-9.89-3.114zm14.499 5.249a40 40 0 0 1 64.992 0 60 60 0 0 0-8.496 5.325 30 30 0 0 0-48 0 60 60 0 0 0-8.496-5.325zm12.371 8.493a25 25 0 0 1 40.25 0 60 60 0 0 0-7.063 7.458 15 15 0 0 0-26.124 0 60 60 0 0 0-7.063-7.458zm10.477 12.202a10 10 0 0 1 19.296 0 60 60 0 0 0-1.897 3.133 60 60 0 0 0-15.502 0 60 60 0 0 0-1.897-3.133zM50.352-2.630a10 10 0 0 1 19.296 0 60 60 0 0 0-1.897 3.133 60 60 0 0 0-15.502 0 60 60 0 0 0-1.897-3.133z'/%3E%3C/svg%3E")`,
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
          <a href={`mailto:${SITE_META.email}`} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/5 rounded-full px-4 py-2 text-xs font-bold text-white transition-all group">
            <span>Get in Touch</span>
            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </a>
        </div>

      </motion.div>
    </footer>
  );
};

export default Footer;