import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const MouseGlow: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    // Check if device is mobile or has no fine pointer (touch device)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || !window.matchMedia('(pointer: fine)').matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth, slightly delayed spring for the glow movement to feel organic
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  if (isMobile) return null;

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      // Keeping mix-blend-screen for the neon feel
      className="fixed top-0 left-0 w-[600px] h-[600px] pointer-events-none z-[5] mix-blend-screen"
    >
      {/* 
        Container for Rotating/Pulsing effects 
        This ensures the light feels "alive" even when the mouse stops moving.
      */}
      <motion.div
        className="w-full h-full relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {/* 
            Layer 1: Ambient Color (Vibrant but transparent)
            Rotating Gradient Blob - Reduced opacity significantly
          */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-800 via-blue-800 to-cyan-800 opacity-10 blur-[100px]"
        />

        {/* 
            Layer 2: Soft Highlight (Off-center to create rotation effect)
            Moves slightly to simulate shifting light - Reduced opacity significantly
          */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [-20, 20, -20],
            y: [-20, 20, -20]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute inset-[20%] rounded-full bg-indigo-600 opacity-10 blur-[80px]"
        />

        {/* 
            Layer 3: Core (Subtle pop)
            Pulsing brighter center - Reduced opacity significantly
          */}
        <motion.div
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-[40%] rounded-full bg-cyan-300 opacity-5 blur-[50px]"
        />
      </motion.div>
    </motion.div>
  );
};