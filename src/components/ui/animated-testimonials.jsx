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
    <div className={`max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-20 ${className || ''}`}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src + index}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                    style={{ border: '1px solid var(--border-color)' }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold" style={{ color: 'var(--color-text-heading)' }}>
              {testimonials[active].name}
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {testimonials[active].designation}
            </p>
            <motion.p className="text-lg mt-8" style={{ color: 'var(--color-text-main)' }}>
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              style={{ backgroundColor: 'var(--color-bg-light)', border: '1px solid var(--border-color)' }}
              className="h-10 w-10 rounded-full flex items-center justify-center group/button transition-colors hover:bg-black/10 dark:hover:bg-white/10 shadow-sm"
            >
              <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover/button:-rotate-12" style={{ color: 'var(--color-text-main)' }} />
            </button>
            <button
              onClick={handleNext}
              style={{ backgroundColor: 'var(--color-bg-light)', border: '1px solid var(--border-color)' }}
              className="h-10 w-10 rounded-full flex items-center justify-center group/button transition-colors hover:bg-black/10 dark:hover:bg-white/10 shadow-sm"
            >
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/button:rotate-12" style={{ color: 'var(--color-text-main)' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
