import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const TestimonialStack = ({ testimonials, visibleBehind = 2, isDark = false, autoplay = true }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartRef = useRef(0);
  const cardRefs = useRef([]);
  const autoplayRef = useRef(null);
  const totalCards = testimonials.length;

  const navigate = useCallback((newIndex) => {
    setActiveIndex((newIndex + totalCards) % totalCards);
  }, [totalCards]);

  const startAutoplay = useCallback(() => {
    if (!autoplay || totalCards <= 1) return;
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      navigate(activeIndex + 1);
    }, 5000);
  }, [autoplay, totalCards, activeIndex, navigate]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  const handleDragStart = (e, index) => {
    if (index !== activeIndex) return;
    setIsDragging(true);
    stopAutoplay();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    dragStartRef.current = clientX;
    if (cardRefs.current[activeIndex]) {
      cardRefs.current[activeIndex].classList.add('is-dragging');
    }
  };

  const handleDragMove = useCallback((e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setDragOffset(clientX - dragStartRef.current);
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    if (cardRefs.current[activeIndex]) {
      cardRefs.current[activeIndex].classList.remove('is-dragging');
    }
    if (Math.abs(dragOffset) > 50) {
      navigate(activeIndex + (dragOffset < 0 ? 1 : -1));
    }
    setIsDragging(false);
    setDragOffset(0);
    startAutoplay();
  }, [isDragging, dragOffset, activeIndex, navigate, startAutoplay]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);
  
  if (!testimonials || !testimonials.length) return null;

  return (
    <div 
      className="relative pb-16 w-full max-w-5xl mx-auto flex items-center justify-center" 
      style={{ minHeight: '580px' }}
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      
      {/* Navigation Arrows */}
      <button 
        onClick={() => navigate(activeIndex - 1)}
        className={`hidden md:flex absolute left-0 z-50 w-12 h-12 items-center justify-center rounded-xl backdrop-blur-md transition-all border shadow-lg ${isDark ? 'bg-black/60 hover:bg-black/80 text-white border-white/10' : 'bg-white/80 hover:bg-white text-neutral-900 border-neutral-200/50'}`}
        style={{ transform: 'translateX(-50%)' }}
      >
        <ChevronLeft size={24} />
      </button>

      <div className="relative w-full max-w-3xl h-[460px] md:h-[500px]">
        {testimonials.map((testimonial, index) => {
          const isActive = index === activeIndex;
          const displayOrder = (index - activeIndex + totalCards) % totalCards;

          const style = {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            transition: isDragging && isActive ? 'none' : 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
          };

          if (displayOrder === 0) {
            style.transform = `translateX(${dragOffset}px)`;
            style.opacity = 1;
            style.zIndex = totalCards;
          } else if (displayOrder <= visibleBehind) {
            const scale = 1 - 0.05 * displayOrder;
            const translateY = -2.5 * displayOrder;
            style.transform = `scale(${scale}) translateY(${translateY}rem)`;
            style.opacity = 1 - 0.2 * displayOrder;
            style.zIndex = totalCards - displayOrder;
          } else {
            style.transform = 'scale(0.8) translateY(-5rem)';
            style.opacity = 0;
            style.zIndex = 0;
            style.pointerEvents = 'none';
          }

          const tagClasses = (type) => {
            if (isDark) {
              return type === 'featured' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/20' : 'bg-white/10 text-neutral-300 border border-white/10';
            } else {
              return type === 'featured' ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20' : 'bg-white/60 text-neutral-600 border border-neutral-200/50';
            }
          };
            
          return (
            <div
              ref={el => cardRefs.current[index] = el}
              key={testimonial.id || index}
              className={`rounded-[2.5rem] cursor-grab active:cursor-grabbing border overflow-hidden relative backdrop-blur-2xl transition-shadow duration-300 ${
                isDark 
                  ? 'border-white/10 bg-[#111116]/80 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9),_0_0_40px_rgba(255,255,255,0.03)]' 
                  : 'border-white/80 bg-white/85 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25),_0_0_30px_rgba(0,0,0,0.08)]'
              }`}
              style={style}
              onMouseDown={(e) => handleDragStart(e, index)}
              onTouchStart={(e) => handleDragStart(e, index)}
            >
              <div className="p-8 px-8 md:p-10 md:px-14 flex flex-col h-full justify-between relative z-10 w-full text-center">
                <div className="flex flex-col items-center flex-grow justify-center">
                  <div className="flex flex-col items-center gap-4 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md" style={{ background: testimonial.avatarGradient || 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
                      {testimonial.initials}
                    </div>
                    <div>
                      <h3 className={`font-semibold text-xl tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>{testimonial.name}</h3>
                      <p className={`text-sm font-medium mt-0.5 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="relative w-full">
                    <blockquote className={`leading-relaxed text-lg md:text-xl xl:text-[22px] font-medium mx-auto max-w-2xl ${isDark ? 'text-neutral-200' : 'text-neutral-700'}`}>"{testimonial.quote}"</blockquote>
                  </div>
                </div>
                
                <div className={`flex flex-col md:flex-row items-center justify-between border-t border-opacity-50 pt-5 gap-4 mt-6 ${isDark ? 'border-neutral-700/50' : 'border-neutral-200'}`}>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {testimonial.tags && testimonial.tags.map((tag, i) => (
                      <span key={i} className={['text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md', tagClasses(tag.type)].join(' ')}>
                        {tag.text}
                      </span>
                    ))}
                  </div>
                  <div className={`flex items-center gap-2 text-sm font-bold ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                    <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-full">
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                       {testimonial.rating || 5}.0 Rating
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button 
        onClick={() => navigate(activeIndex + 1)}
        className={`hidden md:flex absolute right-0 z-50 w-12 h-12 items-center justify-center rounded-xl backdrop-blur-md transition-all border shadow-lg ${isDark ? 'bg-black/60 hover:bg-black/80 text-white border-white/10' : 'bg-white/80 hover:bg-white text-neutral-900 border-neutral-200/50'}`}
        style={{ transform: 'translateX(50%)' }}
      >
        <ChevronRight size={24} />
      </button>
      
      <div className="flex gap-2.5 justify-center absolute bottom-0 left-0 right-0 z-50">
        {testimonials.map((_, index) => (
          <button 
            key={index} 
            aria-label={`Go to testimonial ${index + 1}`} 
            onClick={() => navigate(index)} 
            className={`h-2.5 rounded-full transition-all duration-300 ease-out border ${
              activeIndex === index 
                ? 'w-10 bg-blue-500 shadow-md border-transparent' 
                : `w-2.5 ${isDark ? 'bg-neutral-600 hover:bg-neutral-500 border-white/10' : 'bg-neutral-300 hover:bg-neutral-400 border-white/40'}`
            }`} 
          />
        ))}
      </div>
    </div>
  );
};

