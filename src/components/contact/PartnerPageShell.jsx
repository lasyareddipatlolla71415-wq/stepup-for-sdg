import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import { FiChevronRight } from 'react-icons/fi';

const THEMES = {
  corporate: {
    bgImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=75',
    overlay: 'bg-gradient-to-br from-[#071B4A]/92 via-[#0A5BFF]/80 to-[#071B4A]/92',
    glowColor: 'bg-[#0A5BFF]/20',
    borderColor: 'border-blue-100/60',
    categoryLabel: 'Corporate CSR',
    heroTitle: 'Corporate CSR Partnership',
    heroSubtitle: 'Fund transparent, measurable education initiatives and create lasting social impact.',
  },
  schools: {
    bgImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=75',
    overlay: 'bg-gradient-to-br from-[#083344]/90 via-[#0284C7]/75 to-[#0F172A]/90',
    glowColor: 'bg-cyan-500/20',
    borderColor: 'border-cyan-100/60',
    categoryLabel: 'Schools',
    heroTitle: 'Join StepUp Education Network',
    heroSubtitle: 'Access digital learning tools, teacher training, and educational support.',
  },
  ngos: {
    bgImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=75',
    overlay: 'bg-gradient-to-br from-[#064E3B]/90 via-[#0D9488]/75 to-[#071B4A]/90',
    glowColor: 'bg-emerald-500/20',
    borderColor: 'border-emerald-100/60',
    categoryLabel: 'NGOs',
    heroTitle: 'Partner as an NGO',
    heroSubtitle: 'Collaborate, share resources, and scale rural school support.',
  },
  volunteers: {
    bgImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=75',
    overlay: 'bg-gradient-to-br from-[#1E3A8A]/90 via-[#0284C7]/75 to-[#065F46]/90',
    glowColor: 'bg-blue-500/20',
    borderColor: 'border-blue-100/60',
    categoryLabel: 'Volunteers',
    heroTitle: 'Join as a Volunteer',
    heroSubtitle: 'Empower students, teach skills, and make a real difference in communities.',
  },
};

const PartnerPageShell = ({ themeKey = 'corporate', children }) => {
  const theme = THEMES[themeKey] || THEMES.corporate;

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 font-poppins flex flex-col">
      {/* Navbar: fixed at ~80px tall, reserved space is added below via pt-20 on .page-content */}
      <header className="site-navbar">
        <Navbar />
      </header>

      {/* Main Page Content: starts below the navbar, which now participates in layout flow */}
      <main className="page-content relative flex-1 flex flex-col justify-start">

        {/* Hero & Form Background Container (starts after the navbar's reserved space) */}
        <section className="hero relative pb-10 flex-1 flex flex-col justify-start">

          {/* Full-Screen High-Res Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: `url("${theme.bgImage}")` }}
          />

          {/* Premium Overlay */}
          <div className={`absolute inset-0 ${theme.overlay} z-0`} />
          <div className="absolute inset-0 bg-white/15 z-[5] pointer-events-none" />

          {/* Decorative Floating Ambient Elements */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] ${theme.glowColor} rounded-full blur-[100px]`} />
          </div>

          {/* Foreground Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 lg:px-8 w-full">
          
          {/* Top Bar: Breadcrumb & Back Button — sits fully below the navbar with clear spacing */}
          <div className="page-navigation relative z-20 flex flex-wrap items-center justify-between gap-3 mt-6 mb-4">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link 
                href="/work-with-us"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md backdrop-blur-md transition hover:bg-white/20"
              >
                <span>Back to Partnership Options</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-1.5 text-xs text-white/80 font-medium bg-black/25 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10"
            >
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <FiChevronRight className="text-white/40" />
              <Link href="/work-with-us" className="hover:text-white transition-colors">Work With Us</Link>
              <FiChevronRight className="text-white/40" />
              <span className="text-white font-semibold">{theme.categoryLabel}</span>
            </motion.div>
          </div>

          {/* Hero Banner Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-center mb-6 max-w-2xl mx-auto"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2 drop-shadow-md">
              {theme.heroTitle}
            </h1>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal max-w-xl mx-auto">
              {theme.heroSubtitle}
            </p>
          </motion.div>

          {/* Compact Glassmorphism Form Card Wrapper */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`w-full max-w-[960px] mx-auto rounded-[24px] bg-white/95 backdrop-blur-xl p-5 sm:p-7 md:p-8 shadow-[0_15px_45px_rgba(0,0,0,0.25)] border ${theme.borderColor} relative z-20`}
          >
            {children}
          </motion.div>

        </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PartnerPageShell;
