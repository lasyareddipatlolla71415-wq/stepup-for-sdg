import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiHeart, FiGlobe } from 'react-icons/fi';
import HeroCollage from './HeroCollage';
import HeroStatsCard from './HeroStatsCard';
import ColorAccentLine from '../common/ColorAccentLine';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.12, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  })
};

const floatingLeaves = [
  { top: '12%', left: '4%', delay: 0, rotate: 15 },
  { top: '25%', right: '6%', delay: 1.2, rotate: -20 },
  { top: '55%', left: '2%', delay: 0.8, rotate: 45 },
  { bottom: '15%', right: '12%', delay: 1.8, rotate: -10 },
];

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[72vh] pt-6 pb-10 overflow-hidden bg-gradient-to-b from-[#F8FBFF] via-[#F0FDF4]/40 to-[#F8FBFF] flex flex-col justify-center font-poppins scroll-mt-24 md:scroll-mt-28">
      
      {/* Ambient Background Lights & Floating Leaves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#22C55E]/10 to-[#0A5BFF]/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-gradient-to-br from-[#38BDF8]/15 to-[#22C55E]/10 rounded-full blur-[130px]" />

        {/* Animated Floating Leaves */}
        {floatingLeaves.map((leaf, idx) => (
          <motion.div
            key={idx}
            className="absolute text-green-500/30"
            style={{ top: leaf.top, left: leaf.left, right: leaf.right, bottom: leaf.bottom }}
            animate={{
              y: [0, -18, 0],
              rotate: [leaf.rotate, leaf.rotate + 15, leaf.rotate],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: leaf.delay,
              ease: 'easeInOut',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C12 2 4 6 4 14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14C20 6 12 2 12 2Z" fill="currentColor" />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Main 2-Column Grid */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-10">
          
          {/* Left Column (45%) */}
          <div className="w-full lg:w-[48%] flex flex-col items-start text-left pt-2">
            
            {/* SDG Color Strip */}
            <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp} className="mb-5 flex flex-col items-start gap-4">
              <ColorAccentLine className="max-w-[220px]" />
            </motion.div>

            {/* Main Heading */}
            <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp} className="mb-4">
              <h1 className="text-[48px] sm:text-[62px] lg:text-[72px] font-extrabold leading-[1.08] tracking-tight text-[#071B4A]">
                StepUp For
              </h1>
              <h1 className="text-[48px] sm:text-[62px] lg:text-[72px] font-extrabold leading-[1.08] tracking-tight sdg-color-cycle">
                SDG
              </h1>
              <div className="mt-2">
                <ColorAccentLine className="max-w-[220px]" />
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.p custom={3} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp} className="text-base sm:text-lg text-[#5F6472] max-w-[540px] mb-8 leading-relaxed font-normal">
              Empowering students through the Sustainable Development Goals by fostering education, innovation, collaboration, and community-driven impact for a sustainable future.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div custom={4} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
              <Link
                href="/work-with-us"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#16A34A] to-[#0D9488] text-white rounded-full font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                <span>Become a Partner</span>
              </Link>
            </motion.div>

          </div>

          {/* Right Column (52%) - Asymmetrical Floating SDG Collage */}
          <div className="w-full lg:w-[52%]">
            <motion.div custom={5} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp}>
              <HeroCollage />
            </motion.div>
          </div>

        </div>

        {/* Full-width Stats Bar */}
        <motion.div custom={6} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp} className="w-full mt-14 lg:mt-18 relative z-20">
          <HeroStatsCard />
        </motion.div>

      </div>

      {/* Bottom Soft SVG Wave Decor */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-60">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="#F0F6FF" />
        </svg>
      </div>

    </section>
  );
};

export default HeroSection;
