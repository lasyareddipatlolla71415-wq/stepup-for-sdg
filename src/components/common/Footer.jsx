import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import logoImg from '../../assets/images/image8.png';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  })
};

const QUICK_LINKS = [
  { label: 'Home', target: '/#home' },
  { label: 'About', target: '/#about' },
  { label: 'Impact', target: '/#impact' },
  { label: 'Our Work', target: '/#our-work' },
  { label: 'SDG Goals', target: '/#sdg-goals' },
  { label: 'Partners', target: '/#partners' },
  { label: 'Contact', target: '/#contact' },
];

const SERVE_LINKS = [
  { label: 'Companies', path: '/work-with-us/corporate' },
  { label: 'Schools', path: '/work-with-us/schools' },
  { label: 'NGOs', path: '/work-with-us/ngos' },
  { label: 'Volunteers', path: '/work-with-us/volunteers' },
  { label: 'Universities', path: '/work-with-us/schools' },
  { label: 'Colleges', path: '/work-with-us/schools' },
];

const Footer = () => {
  return (
    <footer id="contact" className="bg-[rgba(240,247,255,0.9)] relative font-poppins">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        custom={1}
        className="max-w-7xl mx-auto px-6 py-6 relative z-10"
      >
        <div className="flex items-center justify-between gap-6">
          {/* Left: Logo + Text */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <Link href="/">
                <img src={logoImg.src} alt="StepUp For SDG" className="h-12 w-12 object-contain" />
              </Link>
            </div>

            <div>
              <div className="text-sm font-semibold text-[#071B4A]">StepUp For SDG</div>
              <div className="text-xs text-[#374151]">Empowering students for a sustainable tomorrow.</div>
            </div>
          </div>

          {/* Center: Contact / Policies / Newsletter */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-[#0B254B]">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#0B254B]" fill="none" stroke="#0B254B" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8.5V6a2 2 0 012-2h3.5M21 8.5V6a2 2 0 00-2-2h-3.5M3 8.5v8a2 2 0 002 2h14a2 2 0 002-2v-8M7 21v-8"/></svg>
              <span>Contact</span>
            </div>

            <div className="h-6 border-l border-slate-200" />

            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#0B254B]" fill="none" stroke="#0B254B" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c2.21 0 4-1.79 4-4S14.21 3 12 3 8 4.79 8 7s1.79 4 4 4zM6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/></svg>
              <span>Our Policies</span>
            </div>

            <div className="h-6 border-l border-slate-200" />

            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#0B254B]" fill="none" stroke="#0B254B" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"/></svg>
              <span>Newsletter</span>
            </div>
          </nav>

          {/* Right: Social Icons */}
          <div className="flex items-center gap-3">
            <a href="#" aria-label="LinkedIn" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-[#0B59FF]">
              <FaLinkedinIn />
            </a>
            <a href="#" aria-label="Instagram" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-[#0B59FF]">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Thin divider */}
        <div className="mt-6 border-t border-slate-200" />

        {/* Bottom copyright */}
        <div className="mt-4 text-center text-sm text-[#374151]">
          © 2026 <span className="text-[#0B59FF] font-semibold">Pavdhan Technologies</span>. All rights reserved.
        </div>

      </motion.div>
    </footer>
  );
};

export default Footer;
