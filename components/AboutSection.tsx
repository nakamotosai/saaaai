import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Heart, MessageCircle } from 'lucide-react';
import { ABOUT, SITE_META, PHOTO_WALL } from '../constants';

const PhotoCard: React.FC<{ pair: typeof PHOTO_WALL[0]; index: number }> = ({ pair, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    // Random auto-flip logic: 2-5 seconds interval
    useEffect(() => {
        const triggerFlip = () => {
            const delay = Math.random() * 3000 + 2000; // Random delay between 2-5 seconds
            return setTimeout(() => {
                setIsFlipped(v => !v); // Must flip
                triggerFlip();
            }, delay);
        };

        const timer = triggerFlip();
        return () => clearTimeout(timer);
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

const PhotoWall: React.FC<{ onPatternLoaded: () => void }> = ({ onPatternLoaded }) => {
    return (
        <div className="w-full h-[400px] md:h-full grid grid-cols-2 grid-rows-2 gap-3 md:gap-4 p-3 md:p-4 bg-white/5 border border-white/20 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            {/* Inner Blur Layer (Prevents popping during entry animation) */}
            <div className="absolute inset-0 backdrop-blur-md z-[-1]" />

            {/* Seigaiha Pattern Overlay */}
            <motion.div
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 0.02,
                        transition: { duration: 1.5, ease: "easeOut" }
                    }
                }}
                onAnimationComplete={onPatternLoaded}
                className="absolute inset-0 pointer-events-none z-0 transition-opacity group-hover:opacity-[0.04]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' width='120' height='60' viewBox='0 0 120 60'%3E%3Cpath fill='%23ffffff' d='M13.005 31.426a55 55 0 0 1 93.99 0 60 60 0 0 0-9.89 3.114 45 45 0 0 0-74.21 0 60 60 0 0 0-9.89-3.114zm14.499 5.249a40 40 0 0 1 64.992 0 60 60 0 0 0-8.496 5.325 30 30 0 0 0-48 0 60 60 0 0 0-8.496-5.325zm12.371 8.493a25 25 0 0 1 40.25 0 60 60 0 0 0-7.063 7.458 15 15 0 0 0-26.124 0 60 60 0 0 0-7.063-7.458zm10.477 12.202a10 10 0 0 1 19.296 0 60 60 0 0 0-1.897 3.133 60 60 0 0 0-15.502 0 60 60 0 0 0-1.897-3.133zM-46.995 61.426a55 55 0 0 1 93.99 0 60 60 0 0 0-9.89 3.114 45 45 0 0 0-74.21 0 60 60 0 0 0-9.89-3.114zm14.499 5.249a40 40 0 0 1 64.992 0 60 60 0 0 0-8.496 5.325 30 30 0 0 0-48 0 60 60 0 0 0-8.496-5.325zM73.005 61.426a55 55 0 0 1 93.99 0 60 60 0 0 0-9.89 3.114 45 45 0 0 0-74.21 0 60 60 0 0 0-9.89-3.114zm14.499 5.249a40 40 0 0 1 64.992 0 60 60 0 0 0-8.496 5.325 30 30 0 0 0-48 0 60 60 0 0 0-8.496-5.325zM-46.995 1.426a55 55 0 0 1 93.99 0 60 60 0 0 0-9.89 3.114 45 45 0 0 0-74.21 0 60 60 0 0 0-9.89-3.114zm14.499 5.249a40 40 0 0 1 64.992 0 60 60 0 0 0-8.496 5.325 30 30 0 0 0-48 0 60 60 0 0 0-8.496-5.325zm12.371 8.493a25 25 0 0 1 40.25 0 60 60 0 0 0-7.063 7.458 15 15 0 0 0-26.124 0 60 60 0 0 0-7.063-7.458zm10.477 12.202a10 10 0 0 1 19.296 0 60 60 0 0 0-1.897 3.133 60 60 0 0 0-15.502 0 60 60 0 0 0-1.897-3.133zM73.005 1.426a55 55 0 0 1 93.99 0 60 60 0 0 0-9.89 3.114 45 45 0 0 0-74.21 0 60 60 0 0 0-9.89-3.114zm14.499 5.249a40 40 0 0 1 64.992 0 60 60 0 0 0-8.496 5.325 30 30 0 0 0-48 0 60 60 0 0 0-8.496-5.325zm12.371 8.493a25 25 0 0 1 40.25 0 60 60 0 0 0-7.063 7.458 15 15 0 0 0-26.124 0 60 60 0 0 0-7.063-7.458zm10.477 12.202a10 10 0 0 1 19.296 0 60 60 0 0 0-1.897 3.133 60 60 0 0 0-15.502 0 60 60 0 0 0-1.897-3.133zM50.352-2.630a10 10 0 0 1 19.296 0 60 60 0 0 0-1.897 3.133 60 60 0 0 0-15.502 0 60 60 0 0 0-1.897-3.133z'/%3E%3C/svg%3E")`,
                    backgroundSize: '80px 40px'
                }}
            />

            {/* Background Decorative Blurs */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[40px] -mr-16 -mt-16 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px] -ml-16 -mb-16 pointer-events-none" />

            {PHOTO_WALL.map((pair, idx) => (
                <PhotoCard key={pair.id} pair={pair} index={idx} />
            ))}
        </div>
    );
};

const AboutSection: React.FC = () => {
    const [isPatternLoaded, setIsPatternLoaded] = useState(false);
    // --- ENTRY ANIMATION VARIANTS ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 1.5, // Even clearer gap for narrative
                delayChildren: 0.2,
            }
        }
    };

    const infoEntryVariants = {
        hidden: { y: -100, opacity: 0, scale: 0.95 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 45,
                damping: 18
            }
        }
    };

    const photoWallEntryVariants = {
        hidden: { y: -100, opacity: 0, scale: 0.95 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 45,
                damping: 18
            }
        }
    };

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
                    variants={infoEntryVariants}
                    whileHover={{
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        borderColor: "rgba(255, 255, 255, 0.3)"
                    }}
                    className="relative flex-1 bg-white/10 border border-white/10 rounded-[2.5rem] p-6 md:p-12 flex flex-col justify-center shadow-2xl overflow-hidden group transform-gpu"
                >
                    {/* Seigaiha Pattern Overlay */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 0.02,
                                transition: { duration: 1.5, ease: "easeOut" }
                            }
                        }}
                        className="absolute inset-0 pointer-events-none z-0 transition-opacity group-hover:opacity-[0.04]"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' width='120' height='60' viewBox='0 0 120 60'%3E%3Cpath fill='%23ffffff' d='M13.005 31.426a55 55 0 0 1 93.99 0 60 60 0 0 0-9.89 3.114 45 45 0 0 0-74.21 0 60 60 0 0 0-9.89-3.114zm14.499 5.249a40 40 0 0 1 64.992 0 60 60 0 0 0-8.496 5.325 30 30 0 0 0-48 0 60 60 0 0 0-8.496-5.325zm12.371 8.493a25 25 0 0 1 40.25 0 60 60 0 0 0-7.063 7.458 15 15 0 0 0-26.124 0 60 60 0 0 0-7.063-7.458zm10.477 12.202a10 10 0 0 1 19.296 0 60 60 0 0 0-1.897 3.133 60 60 0 0 0-15.502 0 60 60 0 0 0-1.897-3.133zM-46.995 61.426a55 55 0 0 1 93.99 0 60 60 0 0 0-9.89 3.114 45 45 0 0 0-74.21 0 60 60 0 0 0-9.89-3.114zm14.499 5.249a40 40 0 0 1 64.992 0 60 60 0 0 0-8.496 5.325 30 30 0 0 0-48 0 60 60 0 0 0-8.496-5.325zM73.005 61.426a55 55 0 0 1 93.99 0 60 60 0 0 0-9.89 3.114 45 45 0 0 0-74.21 0 60 60 0 0 0-9.89-3.114zm14.499 5.249a40 40 0 0 1 64.992 0 60 60 0 0 0-8.496 5.325 30 30 0 0 0-48 0 60 60 0 0 0-8.496-5.325zM-46.995 1.426a55 55 0 0 1 93.99 0 60 60 0 0 0-9.89 3.114 45 45 0 0 0-74.21 0 60 60 0 0 0-9.89-3.114zm14.499 5.249a40 40 0 0 1 64.992 0 60 60 0 0 0-8.496 5.325 30 30 0 0 0-48 0 60 60 0 0 0-8.496-5.325zm12.371 8.493a25 25 0 0 1 40.25 0 60 60 0 0 0-7.063 7.458 15 15 0 0 0-26.124 0 60 60 0 0 0-7.063-7.458zm10.477 12.202a10 10 0 0 1 19.296 0 60 60 0 0 0-1.897 3.133 60 60 0 0 0-15.502 0 60 60 0 0 0-1.897-3.133zM73.005 1.426a55 55 0 0 1 93.99 0 60 60 0 0 0-9.89 3.114 45 45 0 0 0-74.21 0 60 60 0 0 0-9.89-3.114zm14.499 5.249a40 40 0 0 1 64.992 0 60 60 0 0 0-8.496 5.325 30 30 0 0 0-48 0 60 60 0 0 0-8.496-5.325zm12.371 8.493a25 25 0 0 1 40.25 0 60 60 0 0 0-7.063 7.458 15 15 0 0 0-26.124 0 60 60 0 0 0-7.063-7.458zm10.477 12.202a10 10 0 0 1 19.296 0 60 60 0 0 0-1.897 3.133 60 60 0 0 0-15.502 0 60 60 0 0 0-1.897-3.133zM50.352-2.630a10 10 0 0 1 19.296 0 60 60 0 0 0-1.897 3.133 60 60 0 0 0-15.502 0 60 60 0 0 0-1.897-3.133z'/%3E%3C/svg%3E")`,
                            backgroundSize: '80px 40px'
                        }}
                    />

                    <div className="relative z-10 mb-3 md:mb-6">
                        <span className="text-indigo-400 font-mono text-[10px] tracking-widest uppercase flex items-center gap-2 mb-1">
                            <div className="w-6 h-px bg-indigo-400"></div>
                            Hello There
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-1 laser-text">
                            {ABOUT.titleStart} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-cyan-400 animate-gradient-text">{ABOUT.titleEnd}</span>
                        </h2>
                    </div>

                    <div className="relative z-10 space-y-4 md:space-y-6">
                        <p className="text-gray-300 leading-relaxed text-xs md:text-base font-light border-l-2 border-white/20 pl-4 whitespace-pre-line laser-text">
                            {ABOUT.description}
                        </p>

                        {/* Tags Section - Compacted for mobile */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pt-2">
                            <div>
                                <h4 className="flex items-center gap-2 text-white font-bold text-sm mb-2 laser-text">
                                    <Users className="w-4 h-4 text-indigo-400" />
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
                                    <Heart className="w-4 h-4 text-pink-400" />
                                    {ABOUT.tags.interestsTitle}
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {ABOUT.tags.interestList.map((interest, idx) => (
                                        <span key={idx} className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-gray-300 border border-white/5 laser-text">
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <a href={`mailto:${SITE_META.email}`} className="px-5 py-2.5 bg-white text-black rounded-full font-bold text-[10px] tracking-widest hover:bg-gradient-to-r hover:from-cyan-500 hover:to-indigo-600 hover:text-white transition-all duration-300 flex items-center gap-2">
                                {ABOUT.ctaButton}
                                <ArrowUpRightIcon />
                            </a>
                            <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                <MessageCircle className="w-4 h-4" />
                                <span>WeChat: <span className="text-white font-mono">{ABOUT.wechatId}</span></span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Dynamic Photo Wall */}
                <motion.div
                    variants={photoWallEntryVariants}
                    className="w-full md:flex-1 md:max-w-[450px] flex-shrink-0 flex"
                >
                    <motion.div
                        animate={isPatternLoaded ? {
                            y: [0, -25, 0],
                            rotate: [1, -1.5, 1.5, 1],
                        } : {}}
                        transition={{
                            y: {
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            },
                            rotate: {
                                duration: 11,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                        className="w-full h-full"
                    >
                        <PhotoWall onPatternLoaded={() => setIsPatternLoaded(true)} />
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