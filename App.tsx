import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import ProjectGallery from './components/ProjectGallery';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import { MouseGlow } from './components/MouseGlow';
import { SITE_IMAGES } from './constants';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force browser to NOT restore scroll position on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Reset scroll to top on mount (F5 refresh)
    window.scrollTo(0, 0);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Background Rotation Logic: Every 5 seconds
    const interval = setInterval(() => {
      setCurrentBgIndex(prev => (prev + 1) % SITE_IMAGES.backgrounds.length);
    }, 5000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(interval);
    };
  }, []);

  const { scrollYProgress } = useScroll();

  // Background Parallax: Move slightly slower than scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", isMobile ? "2%" : "5%"], { clamp: true });
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1.15, isMobile ? 1.18 : 1.25], { clamp: true });

  // Darkness overlay as we scroll
  const overlayOpacity = useTransform(scrollYProgress, [0.1, 0.7], [0.3, 0.7], { clamp: true });

  return (
    <div className="relative w-full bg-black min-h-screen font-sans selection:bg-indigo-500/30 selection:text-cyan-200">
      <Navbar />

      {/* Invisible Mouse Glow (z-5) */}
      <MouseGlow />

      {/* Fixed Background Layer (z-0) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{
            y: bgY,
            scale: bgScale,
          }}
          className="relative w-full h-full will-change-transform"
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={currentBgIndex}
              src={SITE_IMAGES.backgrounds[currentBgIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.0, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover object-center"
              alt="Dynamic Background"
            />
          </AnimatePresence>

          {/* Dynamic Darkening Overlay */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black mix-blend-multiply transition-opacity duration-300"
          />
          {/* Static Gradient Overlay for base readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        </motion.div>
      </div>

      {/* Scrollable Content (z-10) */}
      <main className="relative z-10 flex flex-col">
        <div className="pb-12 md:pb-0">
          <ProjectGallery />
        </div>
        <div className="mt-12 md:mt-0">
          <AboutSection onAnimationComplete={() => setFooterVisible(true)} isMobile={isMobile} />
        </div>
        <div className="mt-12 md:mt-0">
          <Footer canShow={footerVisible} />
        </div>
      </main>
    </div>
  );
}

export default App;