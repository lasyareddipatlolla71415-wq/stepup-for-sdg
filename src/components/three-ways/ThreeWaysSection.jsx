import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import ColorAccentLine from '../common/ColorAccentLine';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const ThreeWaysSection = () => {
  return (
    <section id="our-work" className="py-12 bg-gradient-to-b from-brand-bg via-[#F0F6FF] to-white overflow-hidden relative font-poppins scroll-mt-24 md:scroll-mt-28">
      <div id="about" className="scroll-mt-24" />
      <div id="about-us" className="scroll-mt-24" />
      <div id="work-with-us" className="scroll-mt-24" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-8 h-[1px] bg-brand-blue/30"></span>
            <span className="section-subtitle text-xs tracking-widest font-bold text-[#0A5BFF] uppercase">PARTNERSHIP OPTIONS</span>
            <span className="w-8 h-[1px] bg-brand-blue/30"></span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#071B4A] mt-2 mb-4 tracking-tight">
            <span className="font-bold">Choose your path </span>
            <span className="font-light">to make an impact</span>
          </h2>
          
          <div className="max-w-[180px] mx-auto">
            <ColorAccentLine />
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          {/* Card 1: Corporate CSR */}
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden hover:-translate-y-2 transition-all duration-300 bg-white shadow-soft flex flex-col justify-between border border-gray-100"
          >
            <div className="absolute top-0 left-6 right-6 h-[4px] rounded-b-full bg-[#E5233B]"></div>
            
            <div>
              <div className="flex justify-center my-4">
                <svg className="w-24 h-24" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="60" cy="42" r="16" stroke="#E5233B" strokeWidth="2.5" />
                  <line x1="60" y1="18" x2="60" y2="10" stroke="#E5233B" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="77" y1="25" x2="83" y2="19" stroke="#E5233B" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="86" y1="42" x2="94" y2="42" stroke="#E5233B" strokeWidth="2.5" strokeLinecap="round" />
                  <rect x="24" y="60" width="24" height="42" rx="2" fill="white" stroke="#E5233B" strokeWidth="2.5" />
                  <rect x="29" y="66" width="6" height="5" rx="1" fill="#E5233B" />
                  <rect x="37" y="66" width="6" height="5" rx="1" fill="#E5233B" />
                  <rect x="52" y="48" width="28" height="54" rx="2" fill="white" stroke="#E5233B" strokeWidth="2.5" />
                  <rect x="58" y="55" width="6" height="6" rx="1" fill="#E5233B" />
                  <rect x="68" y="55" width="6" height="6" rx="1" fill="#E5233B" />
                  <line x1="16" y1="102" x2="108" y2="102" stroke="#E5233B" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-[#071B4A] text-center mb-3">Corporate CSR</h3>
              <p className="text-xs text-[#5F6472] text-center leading-relaxed mb-6">
                Fund transparent, measurable education programs and create lasting social impact.
              </p>
            </div>

            <div className="flex justify-center pt-2">
              <Link 
                href="/work-with-us/corporate"
                className="flex items-center gap-2 font-semibold text-[#E5233B] hover:gap-3 transition-all duration-300 text-sm"
              >
                <span>Corporate Form</span>
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Schools / Universities / Colleges */}
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden hover:-translate-y-2 transition-all duration-300 bg-white shadow-soft flex flex-col justify-between border border-gray-100"
          >
            <div className="absolute top-0 left-6 right-6 h-[4px] rounded-b-full bg-[#FF9800]"></div>
            
            <div>
              <div className="flex justify-center my-4">
                <svg className="w-24 h-24" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="60" cy="40" r="16" stroke="#FF9800" strokeWidth="2.5" />
                  <path d="M60 38 L90 48 L60 58 L30 48 Z" fill="white" stroke="#FF9800" strokeWidth="2.5" strokeLinejoin="round" />
                  <rect x="28" y="62" width="64" height="40" rx="2" fill="white" stroke="#FF9800" strokeWidth="2.5" />
                  <rect x="53" y="80" width="14" height="22" rx="1" fill="white" stroke="#FF9800" strokeWidth="2.5" />
                  <line x1="18" y1="102" x2="102" y2="102" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-[#071B4A] text-center mb-3">Schools & Colleges</h3>
              <p className="text-xs text-[#5F6472] text-center leading-relaxed mb-6">
                Access digital learning tools, teacher training, STEM labs, and infrastructure.
              </p>
            </div>

            <div className="flex justify-center pt-2">
              <Link 
                href="/work-with-us/schools"
                className="flex items-center gap-2 font-semibold text-[#FF9800] hover:gap-3 transition-all duration-300 text-sm"
              >
                <span>School Form</span>
              </Link>
            </div>
          </motion.div>

          {/* Card 3: NGOs */}
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden hover:-translate-y-2 transition-all duration-300 bg-white shadow-soft flex flex-col justify-between border border-gray-100"
          >
            <div className="absolute top-0 left-6 right-6 h-[4px] rounded-b-full bg-[#22C55E]"></div>
            
            <div>
              <div className="flex justify-center my-4">
                <svg className="w-24 h-24" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="60" cy="34" r="6" stroke="#22C55E" strokeWidth="2" fill="white" />
                  <path 
                    d="M60 62 C 54 54, 44 56, 44 64 C 44 73, 60 84, 60 84 C 60 84, 76 73, 76 64 C 76 56, 66 54, 60 62 Z" 
                    fill="none" 
                    stroke="#22C55E" 
                    strokeWidth="2.5" 
                    strokeLinejoin="round" 
                  />
                  <path d="M22 75 Q 32 68, 48 76 Q 58 84, 60 96" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M98 75 Q 88 68, 72 76 Q 62 84, 60 96" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-[#071B4A] text-center mb-3">NGO Partnership</h3>
              <p className="text-xs text-[#5F6472] text-center leading-relaxed mb-6">
                Collaborate on the ground to scale education & rural community upliftment.
              </p>
            </div>

            <div className="flex justify-center pt-2">
              <Link 
                href="/work-with-us/ngos"
                className="flex items-center gap-2 font-semibold text-[#22C55E] hover:gap-3 transition-all duration-300 text-sm"
              >
                <span>NGO Form</span>
              </Link>
            </div>
          </motion.div>

          {/* Card 4: Volunteers */}
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden hover:-translate-y-2 transition-all duration-300 bg-white shadow-soft flex flex-col justify-between border border-gray-100"
          >
            <div className="absolute top-0 left-6 right-6 h-[4px] rounded-b-full bg-[#3B82F6]"></div>
            
            <div>
              <div className="flex justify-center my-4">
                <svg className="w-24 h-24" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="60" cy="38" r="10" stroke="#3B82F6" strokeWidth="2.5" fill="white" />
                  <path d="M38 78 C 38 62, 82 62, 82 78 V 92 H 38 Z" fill="white" stroke="#3B82F6" strokeWidth="2.5" strokeLinejoin="round" />
                  <path d="M48 48 L 30 36 M 72 48 L 90 36" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="20" y1="96" x2="100" y2="96" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-[#071B4A] text-center mb-3">Volunteers</h3>
              <p className="text-xs text-[#5F6472] text-center leading-relaxed mb-6">
                Teach students, share your skills, and make a real difference in young lives.
              </p>
            </div>

            <div className="flex justify-center pt-2">
              <Link 
                href="/work-with-us/volunteers"
                className="flex items-center gap-2 font-semibold text-[#3B82F6] hover:gap-3 transition-all duration-300 text-sm"
              >
                <span>Volunteer Form</span>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ThreeWaysSection;
