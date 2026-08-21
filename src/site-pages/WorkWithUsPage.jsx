"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  HiOutlineOfficeBuilding, 
  HiOutlineAcademicCap, 
  HiOutlineHeart, 
  HiOutlineUsers 
} from 'react-icons/hi';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
  })
};

const PARTNERSHIP_CARDS = [
  {
    id: 'corporate',
    icon: HiOutlineOfficeBuilding,
    title: 'Corporate CSR Partners',
    description: 'Direct your CSR investments into transparent, measurable, outcome-driven education programs.',
    link: '/work-with-us/corporate'
  },
  {
    id: 'schools',
    icon: HiOutlineAcademicCap,
    title: 'Schools / Universities / Colleges',
    description: 'Get access to digital tools, infrastructure support and quality learning programs.',
    link: '/work-with-us/schools'
  },
  {
    id: 'ngos',
    icon: HiOutlineHeart,
    title: 'NGOs',
    description: 'Co-create programs on the ground and amplify your social impact with scalable systems.',
    link: '/work-with-us/ngos'
  },
  {
    id: 'volunteers',
    icon: HiOutlineUsers,
    title: 'Volunteers',
    description: 'Lend your skills, time and energy to build a better future for students worldwide.',
    link: '/work-with-us/volunteers'
  }
];

export default function WorkWithUsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FBFF] overflow-x-hidden font-poppins relative flex flex-col justify-between">
      {/* Navbar */}
      <Navbar />

      {/* Hero & Content Wrapper */}
      <main className="flex-1">
        {/* Light Hero Section */}
        <section className="relative pt-6 sm:pt-8 md:pt-10 pb-16 md:pb-20 bg-gradient-to-b from-[#FFFFFF] via-[#F7FAFF] to-[#EEF6FF] overflow-hidden">
          
          {/* Subtle Ambient Background Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* Soft Blue Blurred Spheres */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#0A5BFF]/10 via-[#42A5FF]/10 to-[#38BDF8]/10 rounded-full blur-[140px]" />
            <div className="absolute top-10 right-10 w-72 h-72 bg-[#0A5BFF]/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-5 left-10 w-80 h-80 bg-[#42A5FF]/8 rounded-full blur-[120px]" />
          </div>

          {/* Center-Aligned Hero Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="flex justify-start mb-6 sm:mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0A5BFF]/20 bg-white text-[#071B4A] text-sm font-semibold shadow-sm transition duration-300 hover:border-[#0A5BFF] hover:bg-[#EFF6FF] hover:text-[#0A5BFF]"
              >
                <span aria-hidden="true">←</span>
                Back to Home
              </Link>
            </div>
            
            {/* Small Badge */}
            <motion.div 
              custom={1}
              initial="hidden" 
              animate="visible" 
              variants={fadeUp}
              className="inline-flex items-center justify-center mb-5"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-[#0A5BFF]/20 shadow-sm text-xs font-bold tracking-widest text-[#0A5BFF] uppercase backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#0A5BFF] animate-pulse" />
                <span>JOIN THE MOVEMENT</span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              custom={2}
              initial="hidden" 
              animate="visible" 
              variants={fadeUp}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#071B4A] tracking-tight mb-4 leading-tight"
            >
              Partner With{' '}
              <span className="text-[#071B4A]">StepUp For </span>
              <span className="sdg-color-cycle inline-block">SDG</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              custom={3}
              initial="hidden" 
              animate="visible" 
              variants={fadeUp}
              className="text-base sm:text-lg md:text-xl text-[#5F6472] max-w-2xl mx-auto leading-relaxed font-normal"
            >
              Whether you bring funding, classrooms, expertise or time — there's a place for you in the mission to transform education.
            </motion.p>
          </div>
        </section>

        {/* Partnership Cards Grid Section */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-32 -mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {PARTNERSHIP_CARDS.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={card.id}
                  custom={index + 4}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                >
                  <Link
                    href={card.link}
                    className="group relative flex flex-col justify-between h-full bg-white rounded-[24px] p-8 sm:p-10 border border-blue-100/80 shadow-[0_10px_30px_rgba(7,27,74,0.05)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(10,91,255,0.14)] hover:border-blue-200"
                  >
                    <div>
                      {/* Icon Background */}
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A5BFF] to-[#42A5FF] flex items-center justify-center text-white text-2xl shadow-md mb-6 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-[#071B4A] mb-3 group-hover:text-[#0A5BFF] transition-colors">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-[#5F6472] leading-relaxed mb-8 font-normal">
                        {card.description}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A5BFF] group-hover:text-[#071B4A] transition-colors">
                      <span>Get Started</span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
