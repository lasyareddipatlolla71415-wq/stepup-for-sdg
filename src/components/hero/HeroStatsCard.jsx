import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { FiUsers, FiHome, FiFolder, FiGlobe } from 'react-icons/fi';

const HeroStatsCard = () => {
  const stats = [
    {
      icon: FiUsers,
      number: 1,
      suffix: 'M+',
      label: 'Students Empowered',
      subtitle: 'Across India',
      color: 'text-[#00A3FF]',
      borderColor: 'bg-[#00A3FF]',
      iconBg: 'bg-cyan-50 text-[#00A3FF] border-cyan-100',
      lineColor: 'bg-[#00A3FF]',
    },
    {
      icon: FiHome,
      number: 5000,
      suffix: '+',
      label: 'Schools Supported',
      subtitle: 'Across India',
      color: 'text-[#10B981]',
      borderColor: 'bg-[#10B981]',
      iconBg: 'bg-emerald-50 text-[#10B981] border-emerald-100',
      lineColor: 'bg-[#10B981]',
    },
    {
      icon: FiFolder,
      number: 850,
      suffix: '+',
      label: 'Projects Completed',
      subtitle: 'Across India',
      color: 'text-[#F59E0B]',
      borderColor: 'bg-[#F59E0B]',
      iconBg: 'bg-amber-50 text-[#F59E0B] border-amber-100',
      lineColor: 'bg-[#F59E0B]',
    },
    {
      icon: FiGlobe,
      number: 25,
      suffix: '+',
      label: 'Countries Impact',
      subtitle: 'Worldwide',
      color: 'text-[#8B5CF6]',
      borderColor: 'bg-[#8B5CF6]',
      iconBg: 'bg-purple-50 text-[#8B5CF6] border-purple-100',
      lineColor: 'bg-[#8B5CF6]',
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-poppins">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card bg-white/95 backdrop-blur-xl rounded-[24px] p-6 sm:p-7 relative overflow-hidden border border-white/80 shadow-soft hover:shadow-glass-hover hover:scale-[1.03] transition-all duration-300 flex flex-col items-center justify-between text-center min-h-[260px] group"
          >
            {/* Top Border Color Accent */}
            <div className={`absolute top-0 left-6 right-6 h-[4px] rounded-b-full ${stat.borderColor}`} />

            {/* Circular Icon with Soft Glow */}
            <div className={`w-14 h-14 rounded-full border ${stat.iconBg} flex items-center justify-center text-2xl shadow-sm mb-4 transition-transform duration-300 group-hover:scale-110`}>
              <Icon />
            </div>

            {/* Animated Counter Value */}
            <div className={`text-3xl sm:text-4xl font-extrabold ${stat.color} tracking-tight leading-none mb-2`}>
              <CountUp
                end={stat.number}
                duration={2.2}
                separator=","
                enableScrollSpy
                scrollSpyOnce
              />
              <span>{stat.suffix}</span>
            </div>

            {/* Title Label */}
            <div className="text-sm font-bold text-[#071B4A] mb-3">
              {stat.label}
            </div>

            {/* Accent Line Under Title */}
            <div className={`w-8 h-[2px] rounded-full ${stat.lineColor} opacity-70 mb-3`} />

            {/* Subtitle */}
            <div className="text-xs font-medium text-gray-400">
              {stat.subtitle}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default HeroStatsCard;
