import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className={`w-full py-10 md:py-16 px-4 md:px-8 ${className || ''}`}>
      <div className="max-w-4xl mx-auto relative group">
        {/* Background Ambient Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-[2.5rem] blur-xl opacity-20 dark:opacity-40 transition duration-1000 group-hover:opacity-30 dark:group-hover:opacity-60 pointer-events-none"></div>
        
        <div 
          className="relative rounded-[2.5rem] flex flex-col justify-center items-center shadow-2xl bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-white/60 dark:border-white/10 p-8 md:p-14 overflow-hidden transition-all duration-300 min-h-[400px]"
        >
          {/* Subtle Top Inner Highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent pointer-events-none" />

          {/* Heading */}
          <div className="mb-8 text-center z-10 w-full flex flex-col items-center">
             <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
               What Our Customers Say
             </h2>
             <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 w-full flex flex-col items-center text-center gap-6">

            <div className="text-blue-500/10 dark:text-blue-400/10 mb-[-2.5rem] pointer-events-none">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>

            <div className="relative w-full min-h-[160px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full"
                >
                  <motion.p className="text-xl md:text-2xl lg:text-3xl text-neutral-700 dark:text-neutral-200 leading-snug font-medium italic mb-8 mx-auto max-w-2xl px-2">
                    {testimonials[active].quote.split(" ").map((word, index) => (
                      <motion.span
                        key={index}
                        initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut", delay: 0.015 * index }}
                        className="inline-block"
                      >
                        {word}&nbsp;
                      </motion.span>
                    ))}
                  </motion.p>
                  
                  <div className="flex flex-col items-center gap-2 mt-4">
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400 tracking-wide">
                      {testimonials[active].name}
                    </h3>
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                      {testimonials[active].designation}
                    </span>
                    
                    <div className="flex items-center gap-1.5 mt-3">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="22" height="22" viewBox="0 0 24 24" fill={i < (testimonials[active].rating || 5) ? "#f59e0b" : "transparent"} stroke={i < (testimonials[active].rating || 5) ? "#f59e0b" : "#d4d4d8"} className="dark:stroke-neutral-700" strokeWidth="2">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-8 mt-8 z-20">
              <button
                onClick={handlePrev}
                className="h-12 w-12 rounded-full bg-white dark:bg-neutral-800/50 backdrop-blur-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 flex items-center justify-center transition-all shadow-[0_5px_15px_rgba(0,0,0,0.08)] dark:shadow-[0_5px_15px_rgba(0,0,0,0.3)] border border-neutral-200 dark:border-neutral-700 hover:scale-110 active:scale-95 group/btn"
              >
                <ArrowLeft className="h-5 w-5 group-hover/btn:-translate-x-0.5 transition-transform" />
              </button>
              
              <div className="flex gap-3">
                {testimonials.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActive(idx)}
                    className={`h-2.5 rounded-full transition-all duration-500 ease-out ${isActive(idx) ? 'w-12 bg-gradient-to-r from-blue-600 to-purple-600 shadow-md' : 'w-2.5 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600 hover:scale-110'}`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="h-12 w-12 rounded-full bg-white dark:bg-neutral-800/50 backdrop-blur-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 flex items-center justify-center transition-all shadow-[0_5px_15px_rgba(0,0,0,0.08)] dark:shadow-[0_5px_15px_rgba(0,0,0,0.3)] border border-neutral-200 dark:border-neutral-700 hover:scale-110 active:scale-95 group/btn"
              >
                <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
