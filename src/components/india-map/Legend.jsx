import React from 'react';
import { motion } from 'framer-motion';

export default function Legend() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-600 glass-card max-w-2xl mx-auto px-6 py-3.5 rounded-full shadow-soft font-poppins"
    >
      <span className="flex items-center gap-1.5 font-medium text-gray-500">
        <span className="text-sm">🖱️</span> Hover over a state to see live impact
      </span>

      <div className="h-4 w-[1px] bg-gray-200 hidden sm:block" />

      <div className="flex items-center gap-5 flex-wrap font-semibold">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#C8B5FF] shadow-sm" />
          <span>Active States</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#F5A623] shadow-sm" />
          <span>High Impact</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#3B82F6] shadow-sm" />
          <span>Growing Impact</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#22C55E] shadow-sm" />
          <span>Community Focus</span>
        </div>
      </div>
    </motion.div>
  );
}
