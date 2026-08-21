import React from 'react';
import { motion } from 'framer-motion';

const floatingParticles = [
  { left: '12%', top: '25%', size: 'w-2 h-2', color: 'bg-[#8E73C8]', delay: 0 },
  { left: '32%', top: '65%', size: 'w-1.5 h-1.5', color: 'bg-[#A98CE5]', delay: 0.8 },
  { left: '52%', top: '30%', size: 'w-2.5 h-2.5', color: 'bg-[#6F52B5]', delay: 1.4 },
  { left: '72%', top: '75%', size: 'w-2 h-2', color: 'bg-[#C8A2FF]', delay: 0.4 },
  { left: '88%', top: '35%', size: 'w-1.5 h-1.5', color: 'bg-[#8E73C8]', delay: 1.1 },
];

export default function FlowingLavenderDivider() {
  const curvePath = 'M 0 75 C 360 135, 720 15, 1080 120 C 1260 150, 1380 40, 1440 75';

  return (
    <div className="relative w-full h-[150px] overflow-hidden bg-gradient-to-b from-[#F8F8FC] via-[#F3F0FA] to-[#F8FBFF] flex items-center justify-center pointer-events-none select-none z-20">
      
      {/* Soft Radial Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[130px] bg-gradient-to-r from-[#8E73C8]/15 via-[#A98CE5]/25 to-[#6F52B5]/15 rounded-full blur-[80px] pointer-events-none" />

      {/* Floating Sparkle Particles */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {floatingParticles.map((p, idx) => (
          <motion.div
            key={idx}
            className={`absolute ${p.size} rounded-full ${p.color} opacity-70 shadow-[0_0_10px_rgba(142,115,200,0.7)]`}
            style={{ left: p.left, top: p.top }}
            animate={{
              y: [0, -14, 0],
              opacity: [0.35, 0.9, 0.35],
              scale: [0.8, 1.25, 0.8],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Curved SVG Line with Glow Path */}
      <div className="relative w-full h-full">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="lavenderLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8E73C8" stopOpacity="0.1" />
              <stop offset="20%" stopColor="#8E73C8" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#A98CE5" stopOpacity="1" />
              <stop offset="80%" stopColor="#8E73C8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#6F52B5" stopOpacity="0.1" />
            </linearGradient>

            <filter id="lineGlowFilter" x="-10%" y="-50%" width="120%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#8E73C8" floodOpacity="0.75" />
            </filter>
          </defs>

          {/* Main Curved Line */}
          <path
            d={curvePath}
            stroke="url(#lavenderLineGrad)"
            strokeWidth="2.5"
            filter="url(#lineGlowFilter)"
            fill="none"
          />
        </svg>

        {/* Traveling Glowing Light Dot Along SVG Path */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          }}
        >
          <motion.div
            className="w-4 h-4 rounded-full bg-white shadow-[0_0_22px_8px_rgba(169,140,229,0.95),0_0_10px_3px_rgba(111,82,181,1)]"
            style={{
              offsetPath: `path("${curvePath}")`,
            }}
            animate={{
              offsetDistance: ['0%', '100%'],
            }}
            transition={{
              duration: 6.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
    </div>
  );
}
