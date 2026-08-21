import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { impactSnapshot } from '../../data/indiaImpactData';

export default function ImpactSnapshot() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white/95 backdrop-blur-xl p-6 rounded-[24px] border border-white shadow-2xl w-full max-w-[270px]"
    >
      <h4 className="font-extrabold text-base text-[#071B4A] mb-5 font-poppins">
        Impact Snapshot
      </h4>

      <div className="space-y-4 font-poppins">
        {impactSnapshot.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">{item.icon}</span>
              <span className={`text-xs font-semibold ${item.color}`}>
                {item.label}
              </span>
            </div>
            <span className="text-sm font-extrabold text-[#071B4A]">
              <CountUp
                end={item.rawValue}
                duration={2.5}
                separator=","
                enableScrollSpy
                scrollSpyOnce
              />
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
