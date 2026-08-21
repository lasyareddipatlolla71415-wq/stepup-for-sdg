import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import childrenStudyImg from '../../assets/images/image3.png';
import classroomChildrenImg from '../../assets/images/classroom-children.jpg';
import communityEarthImg from '../../assets/images/community-earth.png';

export default function HeroCollage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animFrameId = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (animFrameId.current) return;
    
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    animFrameId.current = requestAnimationFrame(() => {
      const innerWidth = window.innerWidth;
      const innerHeight = window.innerHeight;
      const x = (clientX / innerWidth - 0.5) * 16;
      const y = (clientY / innerHeight - 0.5) * 16;
      setMousePos({ x, y });
      animFrameId.current = null;
    });
  }, []);

  const floatingCards = [
    {
      title: 'Quality Education',
      src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=400&q=75',
      className: 'top-[2%] left-[4%] w-[46%] h-[42%] -rotate-3 z-20',
      parallaxFactor: 1.2,
    },
    {
      title: 'Classroom Learning',
      src: classroomChildrenImg.src,
      className: 'top-[8%] right-[2%] w-[42%] h-[38%] rotate-4 z-30',
      parallaxFactor: -1.5,
    },
    {
      title: 'Clean Water & Sanitation',
      src: 'https://images.unsplash.com/photo-1538300342682-cf57afb97285?auto=format&fit=crop&w=400&q=75',
      className: 'top-[44%] left-[0%] w-[42%] h-[38%] -rotate-2 z-30',
      parallaxFactor: -1.0,
    },
    {
      title: 'Environmental Stewardship',
      src: communityEarthImg.src,
      className: 'top-[42%] right-[2%] w-[44%] h-[44%] rotate-3 z-40',
      parallaxFactor: 1.6,
    },
    {
      title: 'Children Education',
      src: childrenStudyImg.src,
      className: 'bottom-[1%] left-[26%] w-[46%] h-[36%] -rotate-3 z-20',
      parallaxFactor: -1.2,
    },
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full aspect-square max-w-[560px] mx-auto select-none py-4"
    >
      {/* Background Radial Glow & Soft Curved Ring */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#22C55E]/15 via-[#0A5BFF]/10 to-[#38BDF8]/10 blur-3xl rounded-full pointer-events-none"></div>
      
      {/* Dashed Orbit Spinner */}
      <div className="absolute inset-6 rounded-full border-dashed border-2 border-[#22C55E]/20 animate-[spin_40s_linear_infinite] pointer-events-none"></div>

      {/* Layered Image Cards */}
      {floatingCards.map((card, idx) => (
        <motion.div
          key={idx}
          className={`absolute ${card.className} p-[3px] bg-white rounded-[24px] shadow-glass border-2 border-white/80 hover:z-50 transition-all duration-300 group overflow-hidden cursor-pointer`}
          animate={{
            x: mousePos.x * card.parallaxFactor,
            y: mousePos.y * card.parallaxFactor,
          }}
          transition={{ type: 'spring', stiffness: 120, damping: 25 }}
          whileHover={{ scale: 1.05, rotate: 0 }}
        >
          <div className="w-full h-full relative overflow-hidden rounded-[20px]">
            <img
              src={card.src}
              alt={card.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </motion.div>
      ))}

      {/* Gentle Floating Glass Icons */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[6%] left-[46%] z-50 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-soft border border-white flex items-center justify-center text-lg pointer-events-none"
      >
        🎓
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute right-[-2%] top-[40%] z-50 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md shadow-soft border border-white flex items-center justify-center text-xl pointer-events-none"
      >
        🌱
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute left-[-2%] top-[38%] z-50 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-soft border border-white flex items-center justify-center text-lg pointer-events-none"
      >
        💧
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute right-[8%] bottom-[12%] z-50 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-soft border border-white flex items-center justify-center text-lg pointer-events-none"
      >
        🤝
      </motion.div>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute left-[16%] bottom-[4%] z-50 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-soft border border-white flex items-center justify-center text-base pointer-events-none"
      >
        ☀️
      </motion.div>
    </div>
  );
}
