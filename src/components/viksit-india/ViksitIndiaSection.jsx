import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiHeart } from 'react-icons/fi';
import ColorAccentLine from '../common/ColorAccentLine';
import plantInHandsImg from '../../assets/images/plant_in_hands.jpg';

const DEFAULT_STATS = {
  studentsEmpowered: 25000,
  institutionsConnected: 300,
  ngoPartners: 150,
  corporatePartners: 40,
  communitiesImpacted: 500,
}

const leaves = [
  { top: '10%', left: '5%', delay: 0 },
  { top: '40%', right: '10%', delay: 1 },
  { bottom: '20%', left: '15%', delay: 2 },
  { top: '20%', left: '45%', delay: 1.5 },
  { bottom: '30%', right: '5%', delay: 0.5 },
  { top: '60%', left: '55%', delay: 2.5 },
];

const LeafIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 4 6 4 14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14C20 6 12 2 12 2Z" fill="currentColor" />
  </svg>
);

const ViksitIndiaSection = () => {
  const [siteStats, setSiteStats] = useState(DEFAULT_STATS)

  useEffect(() => {
    import('@/app/lib/adminStore').then(({ getSiteStats }) => {
      setSiteStats(getSiteStats())
    })
  }, [])
  return (
    <section id="sdg-goals" className="py-10 overflow-hidden bg-gradient-to-b from-brand-bg via-[#F0F8F0] to-brand-bg relative font-poppins scroll-mt-24 md:scroll-mt-28">
      {/* Floating Leaves */}
      {leaves.map((leaf, index) => (
        <motion.div
          key={index}
          className="absolute text-green-500 opacity-30 pointer-events-none"
          style={{ top: leaf.top, left: leaf.left, right: leaf.right, bottom: leaf.bottom }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: leaf.delay,
            ease: 'easeInOut',
          }}
        >
          <LeafIcon />
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Column */}
          <div className="w-full lg:w-1/2 flex flex-col items-start gap-6">
            <div className="inline-flex px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold tracking-wider uppercase items-center gap-2">
              United for Tomorrow
            </div>
            
            <h2 className="text-brand-navy text-5xl md:text-6xl font-extrabold leading-tight">
              Viksit Bharath <br/>
              <span className="bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent">2047 Vision</span>
            </h2>
            
            <div className="max-w-[240px] w-full">
              <ColorAccentLine />
            </div>
            
            <p className="text-base text-gray-600 leading-relaxed max-w-lg">
              Join us in transforming Bharath into a developed nation by 2047 through holistic development and empowerment.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <Link href="/work-with-us" className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">
                Become a Partner
              </Link>
              <Link href="/contact" className="flex items-center gap-2 bg-white border border-green-200 text-green-700 px-6 py-3 rounded-full font-semibold shadow-sm hover:shadow-md transition-all">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Column - Circular SDG display */}
          <div className="w-full lg:w-1/2 flex justify-center mt-10 lg:mt-0">
            <div className="relative w-full aspect-square max-w-[520px] mx-auto">
              {/* Outer dashed circle */}
              <div className="absolute inset-8 rounded-full border-2 border-dashed border-green-200/50 animate-spin-slow" style={{ animationDuration: '60s' }}></div>
              
              {/* Curved Text */}
              <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none z-10">
                <path id="curve" d="M 250 50 A 200 200 0 1 1 249.9 50" fill="transparent" />
                <text className="text-[11px] fill-green-500/60 font-semibold tracking-[0.35em] uppercase">
                  <textPath href="#curve" startOffset="5%">Empowering Students</textPath>
                  <textPath href="#curve" startOffset="38%">Building Communities</textPath>
                  <textPath href="#curve" startOffset="72%">Creating Sustainable Impact</textPath>
                </text>
              </svg>

              {/* Central Image */}
              <div className="absolute inset-[20%] rounded-full overflow-hidden shadow-glass border-4 border-white z-20">
                <div className="absolute inset-0 bg-gradient-to-tr from-green-900/10 to-transparent z-10"></div>
                <img 
                  src={plantInHandsImg.src} 
                  alt="Hands gently holding a small green plant sapling with fresh soil" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Satellites */}
              {[
                { 
                  icon: '', 
                  title: 'Quality Education', 
                  top: '5%', 
                  left: '12%', 
                  bg: 'bg-yellow-50', 
                  color: 'text-yellow-600', 
                  img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=500&q=80' 
                },
                { 
                  icon: '', 
                  title: 'Life on Land', 
                  top: '10%', 
                  right: '0%', 
                  bg: 'bg-green-50', 
                  color: 'text-green-600', 
                  img: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=500&q=80' 
                },
                { 
                  icon: '', 
                  title: 'Clean Water &\nSanitation', 
                  top: '48%', 
                  left: '-2%', 
                  bg: 'bg-cyan-50', 
                  color: 'text-cyan-600', 
                  img: 'https://images.unsplash.com/photo-1538300342682-cf57afb97285?auto=format&fit=crop&w=500&q=80' 
                },
                { 
                  icon: '', 
                  title: 'Partnerships\nfor Goals', 
                  bottom: '20%', 
                  right: '0%', 
                  bg: 'bg-purple-50', 
                  color: 'text-purple-600', 
                  img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=500&q=80' 
                },
                { 
                  icon: '', 
                  title: 'Sustainable\nCommunities', 
                  bottom: '0%', 
                  left: '32%', 
                  bg: 'bg-orange-50', 
                  color: 'text-orange-600', 
                  img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=500&q=80' 
                }
              ].map((sat, i) => (
                <motion.div
                  key={i}
                  className="absolute z-30 flex items-center gap-2 group"
                  style={{ top: sat.top, left: sat.left, right: sat.right, bottom: sat.bottom }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
                >
                  <div className="glass-card bg-white/95 backdrop-blur-md rounded-2xl shadow-glass border-2 border-white w-[110px] h-[78px] overflow-hidden relative transition-transform duration-300 group-hover:scale-105">
                    <img 
                      src={sat.img} 
                      alt={sat.title} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  <div className="flex flex-col items-start">
                    <div className={`w-8 h-8 rounded-full ${sat.bg} ${sat.color} flex items-center justify-center text-sm shadow-soft border border-white`}>
                      {sat.icon}
                    </div>
                    <span className="text-[10px] font-bold leading-tight text-brand-navy whitespace-pre-line mt-1 bg-white/80 backdrop-blur-xs px-1.5 py-0.5 rounded shadow-xs">
                      {sat.title}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-8">
          <div className="glass-card bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl p-5 shadow-xl relative z-20">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-gray-200/60">
              
              <div className="flex items-center gap-4 lg:px-4 first:pl-0 pt-4 lg:pt-0 first:pt-0">
                <div className="font-bold text-gray-800 text-sm md:text-base leading-tight">{siteStats.studentsEmpowered.toLocaleString()}+ Students Empowered</div>
              </div>

              <div className="flex items-center gap-4 lg:px-4 pt-4 lg:pt-0 md:pt-0">
                <div className="font-bold text-gray-800 text-sm md:text-base leading-tight">{siteStats.institutionsConnected}+ Institutions Connected</div>
              </div>

              <div className="flex items-center gap-4 lg:px-4 pt-4 lg:pt-0">
                <div className="font-bold text-gray-800 text-sm md:text-base leading-tight">{siteStats.ngoPartners}+ NGO Partners</div>
              </div>

              <div className="flex items-center gap-4 lg:px-4 pt-4 lg:pt-0 md:pt-0">
                <div className="font-bold text-gray-800 text-sm md:text-base leading-tight">{siteStats.corporatePartners}+ Corporate Partners</div>
              </div>

              <div className="flex items-center gap-4 lg:px-4 pt-4 lg:pt-0">
                <div className="font-bold text-gray-800 text-sm md:text-base leading-tight">{siteStats.communitiesImpacted}+ Communities Impacted</div>
              </div>

            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-6 text-center">
          <p className="font-script text-2xl md:text-3xl text-green-700/80 italic">
            Together, we build a <span className="text-green-600 not-italic font-bold underline decoration-green-400 decoration-wavy underline-offset-4">better</span> tomorrow!
          </p>
        </div>

      </div>
    </section>
  );
};

export default ViksitIndiaSection;
