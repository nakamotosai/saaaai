import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from './components/Navbar';
import ProjectGallery from './components/ProjectGallery';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import { MouseGlow } from './components/MouseGlow';
import { SITE_IMAGES } from './constants';

function App() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [footerVisible, setFooterVisible] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll();

  // Background Parallax: Move slightly slower than scroll
  // We start at -5% and move to 5%, with a higher base scale (1.15) to ensure no black edges
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", isMobile ? "2%" : "5%"], { clamp: true });
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1.15, isMobile ? 1.18 : 1.25], { clamp: true });

  // OPTIMIZATION: Removed dynamic 'filter' (blur) which causes heavy lag.
  // Instead, we use a simple opacity overlay to darken the background as we scroll.
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
            // Removed filter={bgFilter} for performance
          }}
          className="relative w-full h-full will-change-transform"
        >
          <img
            src={SITE_IMAGES.mainBackground}
            alt="Main Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Dynamic Darkening Overlay - much cheaper than blur filter */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black mix-blend-multiply"
          />
          {/* Static Gradient Overlay for base readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        </motion.div>
      </div>

      {/* Scrollable Content (z-10) */}
      <main className="relative z-10 flex flex-col gap-12 md:gap-0">
        <ProjectGallery />
        <AboutSection onAnimationComplete={() => setFooterVisible(true)} isMobile={isMobile} />
        <Footer canShow={footerVisible} />
      </main>
    </div>
  );
}

export default App;