import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Heart, MessageCircle, Mail } from 'lucide-react';
import { ABOUT, SITE_META, PHOTO_WALL, SEIGAIHA_PATTERN } from '../constants';

const PhotoCard: React.FC<{ pair: typeof PHOTO_WALL[0]; index: number }> = ({ pair, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Random auto-flip logic: 2-5 seconds interval
    useEffect(() => {
        const scheduleFlip = () => {
            // Random duration between 2000ms (2s) and 5000ms (5s)
            const nextDelay = Math.random() * 3000 + 2000;

            timeoutRef.current = setTimeout(() => {
                setIsFlipped(prev => !prev);
                scheduleFlip();
            }, nextDelay);
        };

        scheduleFlip();

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div
            className="relative w-full h-full cursor-pointer group"
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ perspective: '1200px' }}
        >
            <motion.div
                className="w-full h-full relative"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    mass: 1
                }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front side */}
                <div
                    className="absolute inset-0 w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-lg"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <img
                        src={pair.front}
                        alt="Gallery Front"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Back side */}
                <div
                    className="absolute inset-0 w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-lg"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    <img
                        src={pair.back}
                        alt="Gallery Back"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </motion.div>
        </div>
    );
};

const PhotoWall: React.FC = () => {
    return (
        <div className="w-full h-[400px] md:h-full grid grid-cols-2 grid-rows-2 gap-3 md:gap-4 p-3 md:p-4 bg-black/20 backdrop-blur-md border border-white/20 rounded-[3rem] shadow-2xl relative overflow-hidden group">

            {/* Seigaiha Pattern Overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-0 transition-opacity group-hover:opacity-[0.04] opacity-[0.02]"
                style={{
                    backgroundImage: SEIGAIHA_PATTERN,
                    backgroundSize: '80px 40px'
                }}
            />

            {/* Background Decorative Blurs */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px] -mr-16 -mt-16 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] -ml-16 -mb-16 pointer-events-none" />

            {PHOTO_WALL.map((pair, idx) => (
                <PhotoCard key={pair.id} pair={pair} index={idx} />
            ))}
        </div>
    );
};

const AboutSection: React.FC<{ onAnimationComplete?: () => void; isMobile: boolean }> = ({ onAnimationComplete, isMobile }) => {
    // --- ENTRY ANIMATION VARIANTS ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 1.0, // Sequential drop
                delayChildren: 0.2,
            }
        }
    };

    const desktopDropVariants = {
        hidden: { opacity: 0, backdropFilter: "blur(0px)" },
        visible: {
            opacity: 1,
            backdropFilter: "blur(4px)",
            transition: {
                duration: 1.0,
                ease: "linear"
            }
        }
    };

    const mobileDropVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 1.0,
                ease: "linear"
            }
        }
    };

    const dropVariants = isMobile ? mobileDropVariants : desktopDropVariants;

    return (
        <section id="about" className="relative z-20 md:mt-12 md:mb-6 px-6 md:px-12 flex justify-center items-center scroll-mt-32">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                className="max-w-6xl w-full flex flex-col md:flex-row gap-10 md:gap-8 md:items-stretch justify-center"
            >
                {/* Left: Glassmorphism Text Container */}
                <motion.div
                    variants={dropVariants}
                    animate={{
                        y: [0, -10, 0],
                        rotate: [-0.5, 0.5, -0.5],
                    }}
                    transition={{
                        y: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
                        rotate: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
                    }}
                    className="relative flex-1 bg-black/20 backdrop-blur-md border border-white/20 rounded-[2.5rem] p-6 md:p-12 flex flex-col justify-center shadow-2xl overflow-hidden group transform-gpu"
                >
                    {/* Seigaiha Pattern Overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none z-0 transition-opacity group-hover:opacity-[0.04] opacity-[0.02]"
                        style={{
                            backgroundImage: SEIGAIHA_PATTERN,
                            backgroundSize: '80px 40px'
                        }}
                    />

                    <div className="relative z-10 mb-3 md:mb-6">
                        <span className="text-cyan-400 font-mono text-[10px] tracking-widest uppercase flex items-center gap-2 mb-1">
                            <div className="w-6 h-px bg-cyan-400"></div>
                            Hello There
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-1 laser-text">
                            {ABOUT.titleStart} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-cyan-400 animate-gradient-text">{ABOUT.titleEnd}</span>
                        </h2>
                    </div>

                    <div className="relative z-10 space-y-4 md:space-y-6">
                        <p className="text-gray-100 leading-relaxed text-sm md:text-base font-medium border-l-2 border-white/20 pl-4 whitespace-pre-line laser-text">
                            {ABOUT.description}
                        </p>

                        {/* Tags Section - Compacted for mobile */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pt-2">
                            <div>
                                <h4 className="flex items-center gap-2 text-white font-bold text-sm mb-2 laser-text">
                                    <Users className="w-4 h-4 text-sky-400" />
                                    {ABOUT.tags.profileTitle}
                                </h4>
                                <ul className="space-y-1">
                                    {ABOUT.tags.profileList.map((tag, idx) => (
                                        <li key={idx} className="text-xs text-gray-400 laser-text">{tag}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="flex items-center gap-2 text-white font-bold text-sm mb-2 laser-text">
                                    <Heart className="w-4 h-4 text-pink-500" />
                                    {ABOUT.tags.interestsTitle}
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {ABOUT.tags.interestList.map((interest, idx) => (
                                        <span key={idx} className="text-[10px] bg-black/40 px-2 py-0.5 rounded-full text-gray-300 border border-white/5 laser-text">
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex flex-col md:flex-row md:items-start lg:items-center gap-6">
                            <a href={`mailto:${SITE_META.email}`} className="w-fit px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-xs tracking-widest hover:bg-white/20 hover:border-white/40 transition-all duration-300 flex items-center gap-2 shadow-xl group h-fit">
                                {ABOUT.ctaButton}
                                <div className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                                    <ArrowUpRightIcon />
                                </div>
                            </a>

                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3 text-xs text-gray-200">
                                    <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span className="font-medium">WeChat: <span className="text-white font-mono ml-1">{ABOUT.wechatId}</span></span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-gray-200">
                                    <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                                    <span className="font-medium">Email:
                                        <a href={`mailto:${SITE_META.email}`} className="text-white font-mono ml-1 hover:text-cyan-400 transition-colors">
                                            {SITE_META.email}
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Dynamic Photo Wall */}
                <motion.div
                    variants={dropVariants}
                    onAnimationComplete={() => onAnimationComplete?.()}
                    className="w-full md:flex-1 md:max-w-[450px] flex-shrink-0 flex"
                >
                    <motion.div
                        animate={{
                            y: [0, -25, 0],
                            x: [0, 3, -3, 0],
                            rotate: [1, -1.5, 1.5, 1],
                        }}
                        transition={{
                            y: {
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 2.2
                            },
                            x: {
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 2.2
                            },
                            rotate: {
                                duration: 11,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 2.2
                            }
                        }}
                        className="w-full h-full"
                    >
                        <PhotoWall />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

const ArrowUpRightIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="7" y1="17" x2="17" y2="7"></line>
        <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
);

export default AboutSection;