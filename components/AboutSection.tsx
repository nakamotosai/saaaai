import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, MessageCircle } from 'lucide-react';
import { ABOUT, SITE_META, SITE_IMAGES } from '../constants';

const FlightMapCard: React.FC = () => {
    return (
        <div className="w-full md:w-[450px] aspect-square md:aspect-auto md:h-full relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-[6px] border-white/20 bg-[#38bdf8] group cursor-default">

            {/* SVG Canvas for the entire illustration */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">

                {/* 1. Ocean / Sky Background */}
                <rect width="400" height="400" fill="#38bdf8" />
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" opacity="0.1" />
                </pattern>
                <rect width="400" height="400" fill="url(#grid)" />

                {/* 2. Map Elements (Abstract Landmasses) */}
                <path d="M -50 450 L -50 250 Q 50 240 100 280 T 180 450 Z" fill="#4ade80" stroke="#22c55e" strokeWidth="4" />
                <path d="M 450 -50 L 450 150 Q 350 180 300 120 T 250 -50 Z" fill="#4ade80" stroke="#22c55e" strokeWidth="4" />
                <circle cx="220" cy="350" r="15" fill="#4ade80" stroke="#22c55e" strokeWidth="3" />
                <circle cx="380" cy="200" r="10" fill="#4ade80" stroke="#22c55e" strokeWidth="3" />

                {/* 3. Flight Path Line */}
                <path id="flightPath" d="M 80 300 Q 200 120 320 100" fill="none" stroke="white" strokeWidth="4" strokeDasharray="8 8" strokeLinecap="round" className="opacity-60" />

                {/* 4. Landmarks */}
                <g transform="translate(80, 300)">
                    <circle r="20" fill="#f472b6" opacity="0.3"><animate attributeName="r" values="20;30;20" dur="2s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" /></circle>
                    <g transform="translate(-15, -60) scale(0.6)">
                        <rect x="22" y="50" width="6" height="40" fill="#db2777" />
                        <circle cx="25" cy="50" r="12" fill="#ec4899" />
                        <rect x="23" y="30" width="4" height="20" fill="#db2777" />
                        <circle cx="25" cy="30" r="8" fill="#ec4899" />
                        <rect x="24" y="0" width="2" height="30" fill="#db2777" />
                    </g>
                    <rect x="-35" y="10" width="70" height="20" rx="10" fill="rgba(0,0,0,0.4)" />
                    <text x="0" y="24" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{ABOUT.flightPath.start}</text>
                </g>

                <g transform="translate(320, 100)">
                    <circle r="20" fill="#f87171" opacity="0.3"><animate attributeName="r" values="20;30;20" dur="2s" begin="1s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.3;0;0.3" dur="2s" begin="1s" repeatCount="indefinite" /></circle>
                    <g transform="translate(-15, -60) scale(0.6)">
                        <path d="M 10 90 L 40 90 L 25 0 Z" fill="#ef4444" />
                        <path d="M 15 90 L 35 90 L 25 20 Z" fill="none" stroke="white" strokeWidth="2" />
                        <line x1="18" y1="60" x2="32" y2="60" stroke="white" strokeWidth="3" />
                        <line x1="22" y1="30" x2="28" y2="30" stroke="white" strokeWidth="3" />
                    </g>
                    <rect x="-25" y="10" width="50" height="20" rx="10" fill="rgba(0,0,0,0.4)" />
                    <text x="0" y="24" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{ABOUT.flightPath.end}</text>
                </g>
            </svg>

            {/* 5. Animated Plane */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-0 left-0 w-12 h-12"
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }}
                    style={{ offsetPath: "path('M 80 300 Q 200 120 320 100')", offsetRotate: "auto" }}
                >
                    <svg viewBox="0 0 24 24" className="w-12 h-12 drop-shadow-lg transform -rotate-90">
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="white" stroke="#e2e8f0" strokeWidth="0.5" />
                        <path d="M 11.5 9 L 11.5 3.5" stroke="#cbd5e1" strokeWidth="1" />
                        <circle cx="11.5" cy="6" r="1" fill="#ef4444" />
                    </svg>
                </motion.div>
            </div>

            <Cloud x="10%" y="20%" size={40} duration={20} delay={0} />
            <Cloud x="70%" y="60%" size={60} duration={25} delay={5} />
            <Cloud x="40%" y="80%" size={30} duration={18} delay={2} />

            <div className="absolute top-6 left-6 z-30">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1.5 rounded-full shadow-lg">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse border border-white" />
                    <span className="text-white text-[10px] font-bold tracking-widest uppercase shadow-sm">Route Active</span>
                </div>
            </div>
        </div>
    );
};

const Cloud: React.FC<{ x: string; y: string; size: number; duration: number; delay: number }> = ({ x, y, size, duration, delay }) => (
    <motion.div
        className="absolute text-white/40"
        style={{ top: y, left: x }}
        animate={{ x: [0, 50, 0] }}
        transition={{ duration: duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
        <svg width={size} height={size / 1.5} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.5,19c-3.037,0-5.5-2.463-5.5-5.5c0-0.41,0.057-0.806,0.142-1.191C11.556,12.115,10.823,12,10,12c-2.209,0-4,1.791-4,4 s1.791,4,4,4c0.354,0,0.692-0.061,1.018-0.152C11.97,20.887,13.67,21.5,15.5,21.5c3.037,0,5.5-2.463,5.5-5.5S18.537,10.5,15.5,10.5 c-0.669,0-1.302,0.122-1.895,0.339C13.437,8.814,13.882,7.189,14.5,6c0.618-1.189,0.173-2.814-0.895-4.839 C12.698,0.957,11.353,0.5,10,0.5c-3.037,0-5.5,2.463-5.5,5.5c0,0.41,0.057,0.806,0.142,1.191C4.056,7.385,3.323,7.5,2.5,7.5 c-2.209,0-4,1.791-4,4s1.791,4,4,4c0.354,0,0.692-0.061,1.018-0.152C3.97,16.387,5.67,17,7.5,17c3.037,0,5.5-2.463,5.5-5.5 S10.537,6,7.5,6c-0.669,0-1.302,0.122-1.895,0.339C5.437,4.314,5.882,2.689,6.5,1.5" opacity="0.8" />
            <circle cx="12" cy="12" r="8" />
            <circle cx="18" cy="14" r="5" />
        </svg>
    </motion.div>
);

const AboutSection: React.FC = () => {
    return (
        <section id="about" className="relative z-20 pt-0 px-6 md:px-12 flex justify-center items-center scroll-mt-32">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl w-full flex flex-col md:flex-row gap-8 md:items-stretch justify-center"
            >
                {/* Left: Animated Flight Map Card */}
                {/* Responsive: w-full on mobile, fixed width on desktop */}
                <motion.div whileHover={{ y: -5 }} className="w-full md:w-auto flex-shrink-0 flex">
                    <FlightMapCard />
                </motion.div>

                {/* Right: Glassmorphism Text Container */}
                <motion.div
                    whileHover={{
                        y: -5,
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        borderColor: "rgba(255, 255, 255, 0.3)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-center shadow-2xl overflow-hidden group"
                >
                    {/* Background Texture */}
                    <div className="absolute inset-0 z-0 select-none pointer-events-none">
                        <img
                            src={SITE_IMAGES.aboutCardTexture}
                            alt="Background Texture"
                            className="w-full h-full object-cover opacity-5 mix-blend-overlay group-hover:opacity-10 transition-opacity"
                        />
                    </div>

                    <div className="relative z-10 mb-6">
                        <span className="text-purple-400 font-mono text-xs tracking-widest uppercase flex items-center gap-2 mb-2">
                            <div className="w-8 h-px bg-purple-400"></div>
                            Hello There
                        </span>
                        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none mb-2">
                            {ABOUT.titleStart} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 animate-gradient-text">{ABOUT.titleEnd}</span>
                        </h2>
                    </div>

                    <div className="relative z-10 space-y-6">
                        <p className="text-gray-300 leading-relaxed text-sm md:text-base font-light border-l-2 border-white/20 pl-4 whitespace-pre-line">
                            {ABOUT.description}
                        </p>

                        {/* Tags Section - Stacked on Mobile, Grid on Desktop */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            <div>
                                <h4 className="flex items-center gap-2 text-white font-bold text-sm mb-2">
                                    <Users className="w-4 h-4 text-purple-400" />
                                    {ABOUT.tags.profileTitle}
                                </h4>
                                <ul className="space-y-1">
                                    {ABOUT.tags.profileList.map((tag, idx) => (
                                        <li key={idx} className="text-xs text-gray-400">{tag}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="flex items-center gap-2 text-white font-bold text-sm mb-2">
                                    <Heart className="w-4 h-4 text-pink-400" />
                                    {ABOUT.tags.interestsTitle}
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {ABOUT.tags.interestList.map((interest, idx) => (
                                        <span key={idx} className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-gray-300 border border-white/5">
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <a href={`mailto:${SITE_META.email}`} className="px-6 py-3 bg-white text-black rounded-full font-bold text-xs tracking-widest hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-600 hover:text-white transition-all duration-300 flex items-center gap-2">
                                {ABOUT.ctaButton}
                                <ArrowUpRightIcon />
                            </a>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <MessageCircle className="w-4 h-4" />
                                <span>WeChat: <span className="text-white font-mono">{ABOUT.wechatId}</span></span>
                            </div>
                        </div>
                    </div>
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