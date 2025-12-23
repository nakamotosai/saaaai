import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { PROJECTS, PROFILE, SITE_META } from '../constants';
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
  const mobileThumbLeft = useTransform(mobileScrollX, [0, 1], ["0%", "70%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
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
            variants={cardVariants}
            className="snap-center shrink-0 w-[260px] h-[420px] relative rounded-[1.5rem] overflow-hidden backdrop-blur-md bg-white/10 border border-white/10 shadow-xl flex flex-col justify-between p-6"
          >
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' width='120' height='60' viewBox='0 0 120 60'%3E%3Cpath fill='%23ffffff' d='M13.005 31.426a55 55 0 0 1 93.99 0 60 60 0 0 0-9.89 3.114 45 45 0 0 0-74.21 0 60 60 0 0 0-9.89-3.114zm14.499 5.249a40 40 0 0 1 64.992 0 60 60 0 0 0-8.496 5.325 30 30 0 0 0-48 0 60 60 0 0 0-8.496-5.325zm12.371 8.493a25 25 0 0 1 40.25 0 60 60 0 0 0-7.063 7.458 15 15 0 0 0-26.124 0 60 60 0 0 0-7.063-7.458zm10.477 12.202a10 10 0 0 1 19.296 0 60 60 0 0 0-1.897 3.133 60 60 0 0 0-15.502 0 60 60 0 0 0-1.897-3.133z'/%3E%3C/svg%3E")`,
                backgroundSize: '80px 40px'
              }}
            />
            <div className="relative z-10 flex flex-col gap-4">
              <h2 className="text-4xl xs:text-5xl font-extrabold text-white tracking-tight leading-none">
                <span className="laser-text">我的</span><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-cyan-400 animate-gradient-text px-1">作品</span>
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <div className="p-1.5 rounded-full bg-white/10 border border-white/20">
                  <User className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-xl font-bold text-white tracking-wide laser-text">{PROFILE.name}</span>
              </div>
            </div>
            <div className="relative z-10 flex flex-col gap-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                  <span className="truncate laser-text">{PROFILE.role}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <Clock className="w-3 h-3 text-gray-400 shrink-0" />
                  <span className="truncate laser-text">旅居日本 <span className="text-indigo-300 font-bold">{PROFILE.yearsInJapan}</span></span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <MessageSquare className="w-3 h-3 text-gray-400 shrink-0" />
                  <span className="truncate laser-text">公众号: <span className="text-white underline decoration-indigo-500/50">{PROFILE.officialAccount}</span></span>
                </div>
              </div>
              <div className="w-8 h-px bg-white/20 my-1" />
              <p className="text-xs text-white/90 leading-relaxed font-medium italic opacity-90 line-clamp-4 laser-text">
                "{PROFILE.bio}"
              </p>
              <div className="flex items-center gap-2 mt-2 text-white/40 text-[9px] font-mono tracking-widest uppercase laser-text">
                <div className="w-6 h-px bg-white/20" />
                <span>Scroll</span>
              </div>
            </div>
          </motion.div>

          {PROJECTS.map((project) => (
            <motion.a
              key={project.id}
              variants={cardVariants}
              href={project.url || '#'}
              className="snap-center shrink-0 w-[85vw] h-[420px] relative group overflow-hidden rounded-[1.5rem] backdrop-blur-md bg-white/10 border border-white/10 shadow-xl flex flex-col"
            >
              <div className="h-[65%] w-full overflow-hidden relative">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  <span className="text-[9px] font-mono text-indigo-300 tracking-wider uppercase laser-text">{project.category}</span>
                </div>
              </div>
              <div className="h-[35%] p-5 flex items-center justify-between bg-white/5 border-t border-white/10 relative overflow-hidden">
                <div className="relative z-10 flex flex-col justify-center max-w-[75%] gap-2">
                  <h3 className="text-lg font-bold text-white leading-tight laser-text">{project.title}</h3>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-mono text-white tracking-wider uppercase leading-none opacity-60 laser-text">{project.category}</span>
                    <p className="text-xs font-mono text-white tracking-wider uppercase leading-none line-clamp-1 opacity-60 laser-text">{project.description}</p>
                  </div>
                </div>
                <div className="relative z-10 w-10 h-10 shrink-0 rounded-full bg-white/10 flex items-center justify-center">
                  <ArrowRight className="text-white opacity-80" size={18} />
                </div>
              </div>
            </motion.a>
          ))}
          <div className="snap-center shrink-0 w-2" />
        </motion.div>
        <div className="flex justify-center w-full mt-6">
          <div className="h-1 bg-white/10 rounded-full w-24 overflow-hidden relative">
            <motion.div style={{ left: mobileThumbLeft }} className="absolute top-0 bottom-0 w-[30%] bg-white/40 rounded-full" />
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
              <motion.div className="shrink-0 w-[220px] mr-8 md:mr-12 h-full">
                <motion.div
                  variants={cardVariants}
                  style={{ opacity: myWorkOpacity }}
                  className="w-full h-full bg-gradient-to-br from-white/15 to-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] shadow-2xl p-6 flex flex-col justify-between group cursor-default"
                >
                  <div className="relative z-10 flex flex-col gap-6">
                    <h2 className="text-3xl font-extrabold text-white tracking-tight leading-none drop-shadow-lg">
                      <span className="laser-text">我的</span><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-cyan-400 animate-gradient-text px-1">作品</span>
                    </h2>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3 text-indigo-400" />
                        <span className="text-sm font-bold text-white laser-text">{PROFILE.name}</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-[10px] text-white/80">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="laser-text">{PROFILE.role}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-white/80">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="laser-text">旅居日本 <span className="font-bold">{PROFILE.yearsInJapan}</span></span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-white/80">
                          <MessageSquare className="w-3 h-3 text-gray-400" />
                          <span className="laser-text truncate">公众号: {PROFILE.officialAccount}</span>
                        </div>
                      </div>
                      <div className="w-8 h-px bg-white/20" />
                      <p className="text-[10px] text-white/90 leading-relaxed italic laser-text">"{PROFILE.bio}"</p>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <p className="text-white/40 text-[9px] font-mono mb-1 laser-text">{SITE_META.domainName}</p>
                    <div className="flex items-center gap-2 text-indigo-200/80 text-[9px] font-mono tracking-[0.2em] uppercase laser-text">
                      <div className="w-6 h-px bg-indigo-300/40" />
                      <span>Scroll</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div style={{ x }} className="flex gap-8 md:gap-12 pr-24 items-center h-full">
                {PROJECTS.map((project) => (
                  <ProjectCard key={project.id} project={project} variants={cardVariants} />
                ))}
                <div className="w-[5vw] shrink-0" />
              </motion.div>
            </motion.div>
          </div>
          <motion.div style={{ opacity: scrollBarOpacity }} className="flex justify-center pb-4 pt-12">
            <div className="h-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-1 flex items-center relative w-[120px]">
              <motion.div style={{ left: indicatorLeft }} className="absolute top-1 bottom-1 w-[19%] bg-white/20 border border-white/20 rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: typeof PROJECTS[0]; variants: any }> = ({ project, variants }) => {
  return (
    <motion.a
      href={project.url || '#'}
      variants={variants}
      className="block relative group h-full aspect-square w-auto flex-shrink-0 rounded-[2.5rem] bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden hover:border-white/30 hover:shadow-2xl transition-all"
    >
      <div className="h-[70%] w-full overflow-hidden relative">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
      </div>
      <div className="h-[30%] px-8 flex items-center justify-between bg-white/5 border-t border-white/10">
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