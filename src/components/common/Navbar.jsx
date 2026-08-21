"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../../utils/constants';
import logoImg from '../../assets/images/image8.png';

const ROUTES = {
  Home: '/',
  About: '/about',
  'Our Work': '/projects',
  Impact: '/impact',
  'SDG Goals': '/sdg',
  Partners: '/partners',
  Contact: '/contact',
};

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isFormPage = pathname.startsWith('/work-with-us/') || pathname.startsWith('/partner/');
  const navBackgroundClass = isFormPage
    ? 'bg-[#F8FBFF]/78 backdrop-blur-[20px] border-b border-[#BFD9D8]/40 shadow-[0_10px_35px_rgba(20,75,100,0.06)]'
    : (scrolled ? 'bg-[#F8FBFF]/78 backdrop-blur-xl shadow-glass py-4' : 'bg-[#F8FBFF]/72 backdrop-blur-xl py-3');
  const navHeightClass = isFormPage ? 'h-20' : 'h-[72px]';

  return (
    <nav className={`site-navbar sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackgroundClass}`}>
      <div className={`max-w-7xl mx-auto px-6 md:px-8 lg:px-10 flex justify-between items-center ${navHeightClass}`}>
        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center cursor-pointer group h-full">
          <img src={logoImg.src} alt="StepUp For SDG" className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 mr-3" />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const href = ROUTES[link] || '/';
            const isActive = link === 'Home' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link key={link} href={href} onClick={() => setMobileMenuOpen(false)} className={`relative text-sm font-semibold transition-colors duration-300 group ${isActive ? 'text-[#0A5BFF]' : 'text-[#071B4A] hover:text-[#0A5BFF]'}`}>
                {link}
                {isActive && <motion.div layoutId="rahini-navbar-underline" className="absolute left-0 right-0 -bottom-1.5 h-[2px] bg-[#0A5BFF] rounded-full" />}
                {!isActive && <div className="absolute left-0 right-0 -bottom-1.5 h-[2px] bg-[#0A5BFF] rounded-full opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-300 origin-left" />}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-5">
          <button type="button" className="flex items-center gap-1 text-sm font-medium text-[#071B4A] hover:text-[#0A5BFF] transition-colors">
            <span>English</span>
          </button>
          <Link href="/work-with-us" className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#0A5BFF] to-[#42A5FF] text-white rounded-full font-semibold text-sm shadow-pill hover:shadow-glass-hover hover:-translate-y-0.5 transition-all duration-300">
            Work With Us
          </Link>
        </div>

        <button type="button" className="lg:hidden text-2xl text-[#071B4A] p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden bg-[#F8FBFF]/94 backdrop-blur-md border-t border-[#BFD9D8]/40 overflow-hidden shadow-sm absolute top-full left-0 w-full" style={{ zIndex: 60 }}>
            <div className="flex flex-col py-4 px-6 gap-4">
              {NAV_LINKS.map((link) => {
                const href = ROUTES[link] || '/';
                const isActive = link === 'Home' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
                return <Link key={link} href={href} onClick={() => setMobileMenuOpen(false)} className={`text-lg font-medium ${isActive ? 'text-[#0A5BFF]' : 'text-gray-700'}`}>{link}</Link>;
              })}
              <div className="w-full h-[1px] bg-gray-100 my-2" />
              <button type="button" className="flex items-center gap-2 text-[#071B4A] font-medium">English</button>
              <Link href="/work-with-us" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#0A5BFF] to-[#42A5FF] text-white rounded-full font-semibold mt-2 text-center">Work With Us</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
