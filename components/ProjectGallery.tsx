import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { PROJECTS, PROFILE, SITE_META, SEIGAIHA_PATTERN } from '../constants';
import { ArrowRight, MapPin, Clock, MessageSquare, User, ChevronRight } from 'lucide-react';

interface ProjectGalleryProps { }

const ProjectGallery: React.FC<ProjectGalleryProps> = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const { scrollXProgress: mobileScrollX } = useScroll({
    container: mobileContainerRef
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 600,
    damping: 50,
    mass: 0.2,
    restDelta: 0.001
  });

  const x = useTransform(smoothProgress, [0, 1], ["0%", "-65%"], { clamp: true });
  const myWorkOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0], { clamp: true });
  const indicatorLeft = useTransform(smoothProgress, [0, 1], ["0.5%", "80.5%"], { clamp: true });
  const scrollBarOpacity = useTransform(smoothProgress, [0.95, 1], [1, 0], { clamp: true });
  const mobileThumbLeft = useTransform(mobileScrollX, [0, 1], ["0.5%", "80.5%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0, // We use custom delays for strict 1s cadence
        delayChildren: 0
      }
    }
  };

  const desktopCardVariants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)", y: 0, x: 0, rotate: 0 },
    visible: (i: number) => ({
      opacity: 1,
      backdropFilter: "blur(4px)",
      y: i === 0 ? [0, -15, 0] : 0,
      x: i === 0 ? [0, 3, -3, 0] : 0,
      rotate: i === 0 ? [0.5, -0.5, 0.5] : 0,
      transition: {
        opacity: { duration: 1.0, ease: "easeOut", delay: 1.0 + i },
        backdropFilter: { duration: 1.0, ease: "easeOut", delay: 1.0 + i },
        y: i === 0 ? { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.0 } : {},
        x: i === 0 ? { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.0 } : {},
        rotate: i === 0 ? { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2.0 } : {},
      }
    })
  };

  // Mobile optimization: Remove expensive backdrop-filter animation
  const mobileCardVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        duration: 1.0,
        ease: "easeOut",
        delay: 1.0 + i,
      }
    })
  };

  return (
    <section ref={targetRef} id="projects" className="relative h-auto md:h-[250vh] md:min-h-screen bg-transparent">
      {/* MOBILE LAYOUT */}
      <div className="md:hidden pt-28 px-6 flex flex-col">
        <motion.div
          ref={mobileContainerRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex overflow-x-auto snap-x snap-mandatory px-6 gap-3 w-full hide-scrollbar items-center"
        >
          {/* Profile / Intro Card */}
          <motion.div
            variants={mobileCardVariants}
            custom={0}
            className="snap-center shrink-0 w-[85vw] max-w-[320px] h-[520px] relative rounded-[2rem] overflow-hidden bg-black/20 backdrop-blur-md border border-white/10 shadow-2xl flex flex-col justify-between p-8"
          >
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
              style={{
                backgroundImage: SEIGAIHA_PATTERN,
                backgroundSize: '80px 40px'
              }}
            />

            <div className="relative z-10 flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="px-3 py-1.5 rounded-full bg-white/20 border border-white/20 text-xs font-mono text-indigo-100 tracking-widest uppercase">
                  Selected Works
                </div>
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              </div>

              {/* Title */}
              <div className="mb-8">
                <h2 className="text-5xl font-black text-white tracking-tighter leading-[0.9]">
                  <span className="block laser-text opacity-90">我的</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 animate-gradient-text">作品</span>
                </h2>
              </div>

              {/* Passport Info */}
              <div className="flex flex-col gap-5 mt-auto mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <User className="w-5 h-5 text-indigo-200" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/50 uppercase tracking-wider font-mono">Name</span>
                    <span className="text-base font-bold text-white laser-text">{PROFILE.name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <MapPin className="w-5 h-5 text-indigo-200" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/50 uppercase tracking-wider font-mono">Location</span>
                    <span className="text-sm font-medium text-white laser-text">{PROFILE.role}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <Clock className="w-5 h-5 text-indigo-200" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/50 uppercase tracking-wider font-mono">Experience</span>
                    <span className="text-sm font-medium text-white laser-text">旅居日本 <span className="text-indigo-200 font-bold">{PROFILE.yearsInJapan}</span></span>
                  </div>
                </div>
              </div>

              {/* Footer Action */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-white/60 tracking-[0.2em] uppercase">向右滑动探索</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30"
                >
                  <ArrowRight size={18} className="text-indigo-200" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {PROJECTS.map((project, idx) => (
            <motion.a
              key={project.id}
              variants={mobileCardVariants}
              custom={idx + 1}
              href={project.url || '#'}
              className="snap-center shrink-0 w-[85vw] max-w-[320px] h-[520px] relative group overflow-hidden rounded-[2rem] bg-black/20 backdrop-blur-md border border-white/10 shadow-2xl flex flex-col"
            >
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0 transition-opacity group-hover:opacity-[0.04]"
                style={{
                  backgroundImage: SEIGAIHA_PATTERN,
                  backgroundSize: '80px 40px'
                }}
              />
              <div className="h-[70%] w-full overflow-hidden relative">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              </div>
              <div className="h-[30%] p-6 flex items-center justify-between bg-black/20 border-t border-white/10 relative overflow-hidden transition-colors group-active:bg-white/10">
                <div className="relative z-10 flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-white leading-tight laser-text">{project.title}</h3>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-mono text-indigo-300 tracking-wider uppercase leading-none laser-text">{project.category}</span>
                    <p className="text-xs font-mono text-white/60 tracking-wider uppercase leading-none laser-text">{project.description}</p>
                  </div>
                </div>
                <div className="relative z-10 w-10 h-10 shrink-0 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                  <ArrowRight className="text-indigo-200" size={20} />
                </div>
              </div>
            </motion.a>
          ))}
          <div className="snap-center shrink-0 w-2" />
        </motion.div>
        <div className="flex justify-center w-full mt-6">
          <div className="h-8 bg-black/20 backdrop-blur-md border border-white/10 rounded-full px-1 flex items-center relative w-[120px]">
            <motion.div style={{ left: mobileThumbLeft }} className="absolute top-1 bottom-1 w-[19%] bg-white/20 border border-white/20 rounded-full" />
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden md:block sticky top-0 h-screen overflow-hidden">
        <div className="relative z-10 w-full h-full flex flex-col pt-20 pb-8">
          <div className="flex-1 flex flex-col justify-center items-center w-full min-h-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="flex flex-row items-center w-full pl-8 md:pl-24 h-[420px]"
            >
              <motion.div
                variants={desktopCardVariants}
                custom={0}
                className="shrink-0 w-[220px] mr-8 md:mr-12 h-full"
              >
                <motion.div
                  variants={desktopCardVariants}
                  custom={0}
                  style={{ opacity: myWorkOpacity }}
                  className="relative w-full h-full bg-gradient-to-br from-black/20 to-black/10 border border-white/10 rounded-[2rem] shadow-2xl p-6 flex flex-col justify-between group cursor-default overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0 transition-opacity group-hover:opacity-[0.04]"
                    style={{
                      backgroundImage: SEIGAIHA_PATTERN,
                      backgroundSize: '80px 40px'
                    }}
                  />
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Decorative Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-indigo-200 tracking-widest uppercase backdrop-blur-sm">
                        Selected Works
                      </div>
                      <div className="w-2 h-2 rounded-full bg-indigo-400/50 animate-pulse" />
                    </div>

                    {/* Main Title */}
                    <div className="mb-auto relative">
                      <h2 className="text-5xl font-black text-white tracking-tighter leading-[0.9]">
                        <span className="block laser-text opacity-90">我的</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 animate-gradient-text">作品</span>
                      </h2>
                      <div className="absolute -left-6 top-1/2 -px-4 w-1 h-12 bg-indigo-500" />
                    </div>

                    {/* Profile & Info - Passport Style */}
                    <div className="flex flex-col gap-6 relative">
                      {/* Info Grid */}
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center gap-3 group/item">
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover/item:border-indigo-500/30 transition-colors">
                            <User className="w-4 h-4 text-indigo-300" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Name</span>
                            <span className="text-sm font-bold text-white laser-text">{PROFILE.name}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 group/item">
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover/item:border-indigo-500/30 transition-colors">
                            <MapPin className="w-4 h-4 text-indigo-300" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Location</span>
                            <span className="text-xs font-medium text-white/80 laser-text">{PROFILE.role}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 group/item">
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover/item:border-indigo-500/30 transition-colors">
                            <Clock className="w-4 h-4 text-indigo-300" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Experience</span>
                            <span className="text-xs font-medium text-white/80 laser-text text-nowrap">旅居日本 <span className="text-indigo-300 font-bold">{PROFILE.yearsInJapan}</span></span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between group/btn cursor-pointer">
                      <span className="text-[10px] font-mono text-white/40 tracking-[0.2em] uppercase group-hover/btn:text-white/60 transition-colors">向右滑动探索</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 group-hover/btn:bg-indigo-500/20 group-hover/btn:border-indigo-500/40 transition-colors"
                      >
                        <ArrowRight size={14} className="text-indigo-300" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div style={{ x }} className="flex gap-8 md:gap-12 pr-24 items-center h-full">
                {PROJECTS.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} variants={desktopCardVariants} index={idx + 1} />
                ))}
                <div className="w-[5vw] shrink-0" />
              </motion.div>
            </motion.div>
          </div>
          <motion.div style={{ opacity: scrollBarOpacity }} className="flex justify-center pb-4 pt-12">
            <div className="h-8 bg-black/20 backdrop-blur-md border border-white/10 rounded-full px-1 flex items-center relative w-[120px]">
              <motion.div style={{ left: indicatorLeft }} className="absolute top-1 bottom-1 w-[19%] bg-white/20 border border-white/20 rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: typeof PROJECTS[0]; variants: any; index: number }> = ({ project, variants, index }) => {
  return (
    <motion.a
      href={project.url || '#'}
      variants={variants}
      custom={index}
      className="block relative group h-full aspect-square w-auto flex-shrink-0 rounded-[2.5rem] bg-black/20 backdrop-blur-md border border-white/10 overflow-hidden hover:border-white/30 hover:shadow-2xl transition-all"
    >
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0 transition-opacity group-hover:opacity-[0.04]"
        style={{
          backgroundImage: SEIGAIHA_PATTERN,
          backgroundSize: '80px 40px'
        }}
      />
      <div className="h-[70%] w-full overflow-hidden relative">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
      </div>
      <div className="h-[30%] px-8 flex items-center justify-between bg-black/20 border-t border-white/10">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl md:text-2xl font-bold text-white leading-tight laser-text">{project.title}</h3>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono text-white/60 uppercase laser-text">{project.category}</span>
            <p className="text-xs font-mono text-white/60 line-clamp-1 laser-text">{project.description}</p>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
          <ArrowRight className="text-white opacity-50 group-hover:opacity-100" size={20} />
        </div>
      </div>
    </motion.a>
  );
};

export default ProjectGallery;