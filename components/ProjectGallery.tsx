import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { PROJECTS, PROFILE, SITE_META } from '../constants';
import { ArrowRight, MapPin, Clock, MessageSquareText, User, ChevronRight } from 'lucide-react';

interface ProjectGalleryProps {
  // We don't strictly need props here as we use internal logic
}

const ProjectGallery: React.FC<ProjectGalleryProps> = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null); // Ref for mobile scroll container
  
  // Track scroll progress of the desktop container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"] 
  });

  // Track scroll progress of the mobile horizontal container
  const { scrollXProgress: mobileScrollX } = useScroll({
    container: mobileContainerRef
  });

  // --- PHYSICS CONFIGURATION (Desktop) ---
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 600, 
    damping: 50,    
    mass: 0.2,      
    restDelta: 0.001
  });

  // --- TRANSFORMS (Desktop) ---
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-65%"], { clamp: true }); 
  const myWorkOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const indicatorLeft = useTransform(smoothProgress, [0, 1], ["0.5%", "80.5%"]); 
  const scrollBarOpacity = useTransform(smoothProgress, [0.95, 1], [1, 0]);

  // --- MOBILE SCROLLBAR TRANSFORM ---
  // Map 0-1 scroll progress to the width of the track for the thumb
  // Thumb moves from 0% to ~70% inside the track (assuming thumb is 30% width).
  const mobileThumbLeft = useTransform(mobileScrollX, [0, 1], ["0%", "70%"]);

  return (
    // Height adjustments: h-auto for mobile, 250vh for desktop
    <section ref={targetRef} id="projects" className="relative h-auto md:h-[250vh] md:min-h-screen bg-transparent">
      
      {/* =========================================
          MOBILE LAYOUT (Visible < md)
          Uses Native Horizontal Snap Scroll
         ========================================= */}
      <div className="md:hidden pt-28 pb-8 w-full flex flex-col">
          
          {/* 
             Native Horizontal Scroll Container 
             snap-x: Enables snapping
             snap-mandatory: Forces it to stop on a card
          */}
          <div 
            ref={mobileContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory px-6 gap-3 w-full hide-scrollbar items-center"
          >
             
             {/* Profile / Intro Card (First Item) */}
             <div className="snap-center shrink-0 w-[50vw] h-[50vh] relative rounded-[1.5rem] overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md shadow-xl flex flex-col justify-between p-4">
                 {/* Decorative Blobs */}
                 <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/20 rounded-full blur-[30px] -mr-6 -mt-6 pointer-events-none mix-blend-screen"></div>
                 <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-[30px] -ml-6 -mb-6 pointer-events-none mix-blend-screen"></div>
                 
                 {/* Top Section: Title & Name */}
                 <div className="relative z-10 flex flex-col gap-2">
                     {/* Title - Compact size */}
                     <h2 className="text-2xl font-extrabold text-white tracking-tighter leading-none">
                        我的<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 animate-gradient-text">作品</span>
                     </h2>

                     <div className="flex items-center gap-1.5 mt-1">
                         <div className="p-1 rounded-full bg-white/10 border border-white/20">
                           <User className="w-2.5 h-2.5 text-purple-400" />
                         </div>
                         <span className="text-[10px] font-bold text-white tracking-wide">{PROFILE.name}</span>
                     </div>
                 </div>

                 {/* Bottom Section: Details & Bio - Tight spacing */}
                 <div className="relative z-10 flex flex-col gap-2">
                     <div className="space-y-1">
                         <div className="flex items-center gap-1.5 text-[9px] text-white/80">
                           <MapPin className="w-2.5 h-2.5 text-gray-400 shrink-0" />
                           <span className="truncate">{PROFILE.role}</span>
                         </div>
                         <div className="flex items-center gap-1.5 text-[9px] text-white/80">
                           <Clock className="w-2.5 h-2.5 text-gray-400 shrink-0" />
                           <span className="truncate">旅居日本 <span className="text-purple-300 font-bold">{PROFILE.yearsInJapan}</span></span>
                         </div>
                     </div>
                     
                     <div className="w-6 h-px bg-white/20 my-1"></div>

                     {/* Bio */}
                     <p className="text-[9px] text-white/90 leading-relaxed font-medium italic opacity-90 line-clamp-3">
                       "{PROFILE.bio}"
                     </p>
                     
                     {/* Swipe Hint */}
                     <div className="flex items-center gap-1 mt-1 text-white/40 text-[8px] font-mono tracking-widest uppercase">
                        <span>Scroll</span>
                        <ChevronRight className="w-2.5 h-2.5 animate-pulse text-purple-400" />
                     </div>
                 </div>
             </div>

             {/* Project Cards */}
             {PROJECTS.map((project) => (
               <a 
                 key={project.id} 
                 href={project.url || '#'}
                 target={project.url ? "_blank" : undefined}
                 rel={project.url ? "noopener noreferrer" : undefined}
                 className="snap-center shrink-0 w-[85vw] h-[50vh] relative group overflow-hidden rounded-[1.5rem] bg-white/10 backdrop-blur-md border border-white/20 shadow-xl flex flex-col"
               >
                 {/* Image Area */}
                 <div className="h-[65%] w-full overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                    
                    {/* Category Label Overlay */}
                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                        <span className="text-[9px] font-mono text-purple-300 tracking-wider uppercase">{project.category}</span>
                    </div>
                 </div>

                 {/* Content Area */}
                 <div className="h-[35%] p-5 flex flex-col justify-between bg-white/5 border-t border-white/10">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1.5 leading-tight">{project.title}</h3>
                        <p className="text-white/60 text-[10px] line-clamp-2">{project.description}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-white group-active:text-purple-400 transition-colors">
                        VIEW PROJECT <ArrowRight className="w-2.5 h-2.5" />
                    </div>
                 </div>
               </a>
            ))}
             
             {/* Spacer for right padding */}
             <div className="snap-center shrink-0 w-2" />
          </div>

          {/* Mobile Custom Scrollbar (Restored & Repositioned to the gap) */}
          <div className="flex justify-center w-full mt-6">
            <div className="h-1 bg-white/10 rounded-full w-24 overflow-hidden relative">
                <motion.div 
                    style={{ left: mobileThumbLeft }}
                    className="absolute top-0 bottom-0 w-[30%] bg-white/40 rounded-full"
                />
            </div>
          </div>
      </div>


      {/* =========================================
          DESKTOP LAYOUT (Visible >= md)
          Uses Framer Motion Sticky + Translate
         ========================================= */}
      <div className="hidden md:block sticky top-0 flex h-screen flex-col items-center overflow-hidden">
        
        <div className="relative z-10 w-full h-full flex flex-col">
          <div className="w-full h-full relative">
            
            {/* 
              Center Gallery Area
            */}
            <div className="absolute top-20 bottom-[10%] left-0 right-0 flex flex-col justify-center items-center">
                {/* Gallery Track */}
                <div className="flex flex-row items-center w-full pl-8 md:pl-24 h-[45vh] min-h-[350px] max-h-[500px]">
                    
                    {/* Static Left Title Block - Wraps the "My Work" Card */}
                    <div className="relative z-0 shrink-0 w-[220px] mr-8 md:mr-12 h-full flex items-center"> 
                    <motion.div 
                        style={{ 
                          opacity: myWorkOpacity,
                          transformOrigin: "center left"
                        }}
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-full bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-2xl overflow-hidden relative cursor-pointer group"
                    >
                        {/* Decorative background blur - Updated to Purple/Cyan mix */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-[40px] -mr-8 -mt-8 pointer-events-none mix-blend-screen group-hover:bg-purple-400/30 transition-colors duration-500"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px] -ml-8 -mb-8 pointer-events-none mix-blend-screen group-hover:bg-cyan-400/20 transition-colors duration-500"></div>
                        
                        {/* 
                           CONTENT CONTAINER 
                        */}
                        <div className="relative z-10 w-full h-full flex flex-col justify-center p-6 gap-6">
                            
                            {/* Title Section */}
                            <div>
                                {/* FIX: Reduced weight from font-black to font-extrabold and tracking-tighter to tracking-tight to fix the 'Pin' (品) character */}
                                <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none drop-shadow-lg break-words">
                                我的<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 animate-gradient-text">
                                    作品
                                </span>
                                </h2>
                            </div>

                            {/* Bio Section */}
                            <div className="flex flex-col gap-3">
                               {/* Name */}
                               <div className="inline-flex items-center gap-2">
                                  <div className="p-1 rounded-full bg-white/10 border border-white/20">
                                    <User className="w-2.5 h-2.5 text-purple-400" />
                                  </div>
                                  <span className="text-sm font-bold text-white tracking-wide">{PROFILE.name}</span>
                               </div>

                               {/* Tags/Details - CONTRAST FIX: Changed text-gray-300 to text-white/90 or text-white/80 */}
                               <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-[10px] text-white/80">
                                    <MapPin className="w-3 h-3 text-gray-300 shrink-0" />
                                    <span>{PROFILE.role}</span>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 text-[10px] text-white/80">
                                    <Clock className="w-3 h-3 text-gray-300 shrink-0" />
                                    <span>旅居日本 <span className="text-purple-300 font-bold">{PROFILE.yearsInJapan}</span></span>
                                  </div>

                                   <div className="flex items-center gap-2 text-[10px] text-white/80">
                                    <MessageSquareText className="w-3 h-3 text-gray-300 shrink-0" />
                                    <span className="truncate">公众号: <span className="text-white underline decoration-purple-500/50">{PROFILE.officialAccount}</span></span>
                                  </div>
                               </div>
                               
                               <div className="w-8 h-px bg-white/20 my-1"></div>

                               <p className="text-[10px] text-white/90 leading-relaxed font-medium italic opacity-90">
                                 "{PROFILE.bio}"
                               </p>
                            </div>

                            {/* Footer Section - CONTRAST FIX: Increased brightness */}
                            <div>
                                <p className="text-white/60 text-[9px] font-mono mb-2 uppercase tracking-widest opacity-80">
                                {SITE_META.domainName}
                                </p>
                                <div className="flex items-center gap-2 text-purple-200/80 text-[9px] font-mono tracking-[0.2em] uppercase">
                                    <div className="w-6 h-px bg-purple-300/60"></div>
                                    <span>Scroll</span>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                    </div>

                    {/* Scrolling Track - Added will-change-transform for performance */}
                    <motion.div style={{ x }} className="flex gap-8 md:gap-12 pr-24 items-center z-10 h-full will-change-transform">
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                    <div className="w-[5vw] shrink-0" /> 
                    </motion.div>
                </div>
            </div>

            {/* Desktop Scrollbar - Reduced Width */}
            <motion.div 
                style={{ opacity: scrollBarOpacity }}
                className="absolute left-0 right-0 bottom-[10%] flex justify-center z-20 pointer-events-none"
            >
                <div className="h-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-1 flex items-center relative w-[120px] shadow-lg pointer-events-auto">
                    <motion.div 
                        style={{ left: indicatorLeft }}
                        className="absolute top-1 bottom-1 w-[19%] bg-white/20 border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)] rounded-full z-0 backdrop-blur-sm"
                    />
                </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

// Sub-component for individual cards (Desktop Version)
const ProjectCard: React.FC<{ project: typeof PROJECTS[0] }> = ({ project }) => {
  return (
    <motion.a 
      href={project.url || '#'}
      target={project.url ? "_blank" : undefined}
      rel={project.url ? "noopener noreferrer" : undefined}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="block relative group h-full aspect-square w-auto flex-shrink-0 rounded-[2.5rem] bg-white/5 backdrop-blur-lg border border-white/10 overflow-hidden hover:border-white/30 hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer"
    >
      {/* Image Part - 70% height */}
      <div className="h-[70%] w-full overflow-hidden relative">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
      </div>
      
      {/* Content Part - 30% height */}
      <div className="h-[30%] px-6 md:px-8 flex items-center justify-between relative z-10 bg-white/5 border-t border-white/10 backdrop-blur-xl">
        <div className="flex flex-col justify-center max-w-[85%]">
            <span className="text-xs font-mono text-purple-300 mb-1 tracking-wider opacity-80">{project.category}</span>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1 leading-tight tracking-tight">{project.title}</h3>
            {/* <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{project.description}</p> */}
        </div>
        <div className="w-10 h-10 shrink-0 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
            <ArrowRight className="text-white opacity-50 group-hover:opacity-100 group-hover:text-purple-300 transition-all duration-300" size={20} />
        </div>
      </div>
    </motion.a>
  );
};

export default ProjectGallery;