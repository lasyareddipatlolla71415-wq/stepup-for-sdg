import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { partnerLogos } from '../../utils/partnerData';
import ColorAccentLine from '../common/ColorAccentLine';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.08, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  })
};

export default function PartnersMarquee() {
  const scrollRef = useRef(null);
  /* Triple the logos for a seamless infinite loop */
  const logos = [...partnerLogos, ...partnerLogos, ...partnerLogos];

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="partners" className="partners-section relative py-5 md:py-6 bg-gradient-to-b from-brand-bg via-[#EFF6FF]/60 to-[#EBF3FF] overflow-hidden font-poppins scroll-mt-24 md:scroll-mt-28">

      {/* Background Soft Glow Ambient Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#0A5BFF]/5 via-[#22C55E]/5 to-[#42A5FF]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        custom={1}
        className="text-center mb-4 md:mb-5 px-6 relative z-10"
      >
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0A5BFF] tracking-widest uppercase mb-2">
          <span className="w-6 h-[2px] bg-[#0A5BFF] rounded-full"></span>
          <span>OUR PARTNERS</span>
          <span className="w-6 h-[2px] bg-[#0A5BFF] rounded-full"></span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#071B4A] tracking-tight mb-2 mt-0">
          Trusted by Leading Organizations
        </h2>

        <div className="flex justify-center mt-2">
          <ColorAccentLine className="max-w-[180px]" />
        </div>
      </motion.div>

      {/* Marquee container */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        custom={2}
        className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-10 z-10"
      >

        {/* Left fade + arrow button */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[#EBF3FF] via-[#EBF3FF]/80 to-transparent pointer-events-none" />
        <button
          onClick={() => handleScroll('left')}
          aria-label="Previous logos"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                     bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-center text-[#071B4A]
                     hover:text-[#0A5BFF] hover:scale-110 active:scale-95 z-20 transition-all duration-200 border border-white"
        >
          
        </button>

        {/* Scrolling track */}
        <div ref={scrollRef} className="overflow-hidden mx-10 sm:mx-14 group py-2">
          <div
            className="flex items-center gap-8 md:gap-10 animate-marquee
                       group-hover:[animation-play-state:paused]"
            style={{ width: 'max-content' }}
          >
            {logos.map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="flex-shrink-0 flex items-center justify-center h-[68px] w-[170px] sm:w-[190px] px-5 py-3
                           bg-white/90 backdrop-blur-md rounded-2xl border border-white/90 shadow-soft
                           hover:shadow-glass-hover hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  title={partner.name}
                  loading="lazy"
                  className="h-9 w-auto max-w-[125px] object-contain filter drop-shadow-sm"
                  onError={(e) => {
                    /* Fallback: hide broken image, show styled text badge */
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'inline-block';
                    }
                  }}
                />
                <span
                  className="hidden text-base font-bold text-[#071B4A] whitespace-nowrap"
                >
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right fade + arrow button */}
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[#EBF3FF] via-[#EBF3FF]/80 to-transparent pointer-events-none" />
        <button
          onClick={() => handleScroll('right')}
          aria-label="Next logos"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                     bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-center text-[#071B4A]
                     hover:text-[#0A5BFF] hover:scale-110 active:scale-95 z-20 transition-all duration-200 border border-white"
        >
          
        </button>
      </motion.div>
    </section>
  );
}
