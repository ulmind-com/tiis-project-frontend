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

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className={`w-full py-12 md:py-20 ${className || ''}`}>
      <div 
        className="relative rounded-[2.5rem] flex flex-col lg:flex-row items-center gap-12 lg:gap-20 shadow-[0_25px_50px_-12px_rgba(37,99,235,0.4)]" 
        style={{ 
          background: 'linear-gradient(135deg, #1d4ed8 0%, #0d9488 100%)', 
          minHeight: '650px',
          padding: 'clamp(2.5rem, 5vw, 5rem) clamp(2.5rem, 5vw, 5rem)'
        }}
      >
        {/* Left Column - Content */}
        <div className="flex-1 w-full text-white flex flex-col gap-10">

          {/* Heading + Arrows */}
          <div className="flex justify-between items-start">
            <h2 className="text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.1] tracking-tight">
              What Our<br/>Customers<br/>Say
            </h2>
            
            {/* Desktop Nav Arrows */}
            <div className="hidden lg:flex gap-3 mt-4">
              <button
                onClick={handlePrev}
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/10 backdrop-blur-sm shadow-sm"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNext}
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/10 backdrop-blur-sm shadow-sm"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quote + Name + Rating */}
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col gap-8"
          >
            <motion.p className="text-[17px] md:text-lg text-white/90 leading-relaxed font-normal max-h-[220px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.3) transparent' }}>
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
            
            <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-white/10">
              <h3 className="text-lg md:text-xl font-bold tracking-wide">
                {testimonials[active].name} <span className="text-white/60 font-normal text-[15px] md:text-base ml-1">/ {testimonials[active].designation}</span>
              </h3>
              
              <div className="bg-[#1e293b] rounded-xl px-4 py-2.5 flex items-center gap-3 border border-indigo-500/10 shadow-lg">
                 <div className="flex gap-1 text-[#22c55e]">
                    {[...Array(5)].map((_, i) => (
                       <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i < (testimonials[active].rating || 5) ? "currentColor" : "transparent"} stroke="currentColor" strokeWidth="2">
                         <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                       </svg>
                    ))}
                 </div>
                 <div className="text-white text-sm font-bold leading-tight pl-3 border-l border-white/10">
                    {testimonials[active].rating || 5} score
                 </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Column - Image Animation */}
        <div className="w-full lg:w-[400px] shrink-0 relative flex justify-center mt-12 lg:mt-0 mb-8 lg:mb-0">
          <div className="relative h-[400px] w-full max-w-[400px] md:h-[450px] rounded-[2rem] bg-[#1e293b] shadow-2xl">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src + index}
                  initial={{ opacity: 0, scale: 0.9, z: -100, rotate: randomRotateY() }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 99 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.9, z: 100, rotate: randomRotateY() }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    draggable={false}
                    className="h-full w-full rounded-[2rem] object-cover object-center border-4 border-[#1e293b]/50"
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Decorative Badges */}
            <div className="absolute -top-6 -right-6 md:-top-8 md:-right-8 w-16 h-16 md:w-20 md:h-20 bg-[#a3e635] rounded-2xl flex items-center justify-center shadow-[0_15px_30px_-5px_rgba(163,230,53,0.4)] z-[100] transform rotate-[8deg] hover:rotate-0 transition-transform cursor-default">
               <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" className="text-black"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            </div>
            
            <div className="absolute -bottom-5 right-2 md:-bottom-6 md:-right-2 bg-[#a3e635] text-black font-extrabold px-6 py-2 md:px-8 md:py-3 rounded-xl shadow-[0_15px_30px_-5px_rgba(163,230,53,0.4)] z-[100] transform rotate-[-4deg] hover:rotate-0 transition-transform cursor-default text-lg md:text-xl">
               "Very Satisfied"
            </div>
          </div>

          {/* Mobile Nav Arrows */}
          <div className="flex lg:hidden gap-4 justify-center absolute -bottom-20 left-0 right-0">
            <button onClick={handlePrev} className="h-10 w-10 rounded-full bg-white/20 text-white flex items-center justify-center">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button onClick={handleNext} className="h-10 w-10 rounded-full bg-white/20 text-white flex items-center justify-center">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-5 md:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
           {testimonials.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActive(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${isActive(idx) ? 'w-8 bg-[#a3e635]' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
           ))}
        </div>
      </div>
    </div>
  );
};
