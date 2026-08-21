import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ColorAccentLine from '../common/ColorAccentLine';

import classroomImg from '../../assets/images/image1.png';
import environmentImg from '../../assets/images/image5.png';
import waterHandsImg from '../../assets/images/image6.png';
import presentationImg from '../../assets/images/image7.png';
import childrenSlatesImg from '../../assets/images/image3.png';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.12, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  })
};

export default function GallerySection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 15;
    const y = (clientY / innerHeight - 0.5) * 15;
    setMousePos({ x, y });
  };

  return (
    <section 
      id="gallery" 
      onMouseMove={handleMouseMove}
      className="relative py-12 md:py-16 bg-gradient-to-b from-brand-bg via-[#F0F6FF]/70 to-brand-bg overflow-hidden font-poppins"
    >
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-gradient-to-br from-[#38BDF8]/10 via-[#22C55E]/10 to-[#0A5BFF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={1}
          className="text-center mb-10 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0A5BFF] tracking-widest uppercase mb-3">
            <span className="w-6 h-[2px] bg-[#0A5BFF] rounded-full"></span>
            <span>OUR IMPACT IN ACTION</span>
            <span className="w-6 h-[2px] bg-[#0A5BFF] rounded-full"></span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-[#071B4A] tracking-tight mb-4">
            Transformative Journeys & Community Impact
          </h2>

          <div className="flex justify-center">
            <ColorAccentLine className="max-w-[180px]" />
          </div>
        </motion.div>

        {/* Animated Photo Collage Container */}
        <div className="relative max-w-5xl mx-auto min-h-[500px] md:min-h-[580px] select-none py-2">

          {/* Desktop/Tablet Layered Grid Collage */}
          <div className="hidden sm:block relative w-full h-[520px] md:h-[580px]">
            
            {/* Card 1: Top Left - Classroom */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={2}
              style={{
                x: mousePos.x * 0.8,
                y: mousePos.y * 0.8,
              }}
              whileHover={{ scale: 1.03, zIndex: 30 }}
              className="absolute top-[0%] left-[2%] w-[48%] h-[52%] rounded-[28px] p-1.5 bg-white shadow-xl border border-white/80 overflow-hidden cursor-pointer group transition-all duration-300 z-10"
            >
              <div className="w-full h-full rounded-[22px] overflow-hidden relative">
                <img 
                  src={classroomImg.src}
                  alt="Classroom Education" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-white flex items-center justify-center text-sm z-20">
                🎓
              </div>
            </motion.div>

            {/* Card 2: Top Right - Environment Cleanup */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={3}
              style={{
                x: mousePos.x * -0.6,
                y: mousePos.y * -0.6,
              }}
              whileHover={{ scale: 1.03, zIndex: 30 }}
              className="absolute top-[0%] right-[2%] w-[46%] h-[48%] rounded-[28px] p-1.5 bg-white shadow-xl border border-white/80 overflow-hidden cursor-pointer group transition-all duration-300 z-10"
            >
              <div className="w-full h-full rounded-[22px] overflow-hidden relative">
                <img 
                  src={environmentImg.src}
                  alt="Environmental Action" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

            {/* Card 3: Middle Left - Water Project */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={4}
              style={{
                x: mousePos.x * -0.8,
                y: mousePos.y * 0.8,
              }}
              whileHover={{ scale: 1.03, zIndex: 30 }}
              className="absolute bottom-[4%] left-[0%] w-[44%] h-[48%] rounded-[28px] p-1.5 bg-white shadow-xl border border-white/80 overflow-hidden cursor-pointer group transition-all duration-300 z-10"
            >
              <div className="w-full h-full rounded-[22px] overflow-hidden relative">
                <img 
                  src={waterHandsImg.src}
                  alt="Clean Water Initiative" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -top-2 -left-2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-white flex items-center justify-center text-sm z-20">
                💧
              </div>
            </motion.div>

            {/* Card 4: Middle Right - Presentation */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={5}
              style={{
                x: mousePos.x * 0.6,
                y: mousePos.y * -0.8,
              }}
              whileHover={{ scale: 1.03, zIndex: 30 }}
              className="absolute bottom-[8%] right-[0%] w-[48%] h-[46%] rounded-[28px] p-1.5 bg-white shadow-xl border border-white/80 overflow-hidden cursor-pointer group transition-all duration-300 z-10"
            >
              <div className="w-full h-full rounded-[22px] overflow-hidden relative">
                <img 
                  src={presentationImg.src}
                  alt="School Workshop" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute top-[40%] -right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-white flex items-center justify-center text-sm z-20">
                🌱
              </div>
            </motion.div>

            {/* Card 5: Focal Bottom Center - Overlapping Children Image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={6}
              style={{
                x: mousePos.x * 1.2,
                y: mousePos.y * 1.2,
              }}
              whileHover={{ scale: 1.04, zIndex: 40 }}
              className="absolute bottom-[0%] left-[22%] w-[56%] h-[48%] rounded-[30px] p-2 bg-white shadow-2xl border-2 border-white overflow-hidden cursor-pointer group transition-all duration-300 z-20"
            >
              <div className="w-full h-full rounded-[24px] overflow-hidden relative">
                <img 
                  src={childrenSlatesImg.src}
                  alt="Children Empowered" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-white flex items-center justify-center text-base z-30">
                🧡
              </div>
            </motion.div>

            {/* Additional Floating Ambient Badges */}
            <div className="absolute bottom-[2%] left-[16%] w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-white flex items-center justify-center text-xs pointer-events-none z-30">
              ☀️
            </div>

          </div>

          {/* Mobile Clean Stacked Grid Composition */}
          <div className="block sm:hidden space-y-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
              className="rounded-2xl p-1.5 bg-white shadow-lg border border-white overflow-hidden"
            >
              <img src={childrenSlatesImg.src} alt="Children Empowered" className="w-full h-48 object-cover rounded-xl" />
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={2}
                className="rounded-2xl p-1.5 bg-white shadow-md border border-white overflow-hidden"
              >
                <img src={classroomImg.src} alt="Classroom" className="w-full h-36 object-cover rounded-xl" />
              </motion.div>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={3}
                className="rounded-2xl p-1.5 bg-white shadow-md border border-white overflow-hidden"
              >
                <img src={environmentImg.src} alt="Environment" className="w-full h-36 object-cover rounded-xl" />
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={4}
                className="rounded-2xl p-1.5 bg-white shadow-md border border-white overflow-hidden"
              >
                <img src={waterHandsImg.src} alt="Clean Water" className="w-full h-36 object-cover rounded-xl" />
              </motion.div>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={5}
                className="rounded-2xl p-1.5 bg-white shadow-md border border-white overflow-hidden"
              >
                <img src={presentationImg.src} alt="Workshop" className="w-full h-36 object-cover rounded-xl" />
              </motion.div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
