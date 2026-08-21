import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const StateTooltip = React.memo(function StateTooltip({ activeState, data, position }) {
  if (!activeState || !data) return null;

  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const popupWidth = 260;
  const popupHeight = 230;

  const shouldPlaceLeft = position.x > viewportWidth / 2;
  const left = shouldPlaceLeft
    ? clamp(position.x - popupWidth - 18, 16, viewportWidth - popupWidth - 16)
    : clamp(position.x + 18, 16, viewportWidth - popupWidth - 16);
  const top = clamp(position.y + 18, 16, viewportHeight - popupHeight - 16);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeState}
        initial={{ opacity: 0, scale: 0.94, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 6 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          left,
          top,
          width: popupWidth,
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '18px',
            border: '1px solid rgba(142, 115, 200, 0.3)',
            boxShadow: '0 16px 36px -6px rgba(111, 82, 181, 0.22), 0 4px 12px -2px rgba(15, 23, 42, 0.08)',
            padding: '16px 18px',
            fontFamily: 'Poppins, system-ui, sans-serif',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5 mb-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8E73C8] shadow-[0_0_8px_rgba(142,115,200,0.6)] flex-shrink-0" />
            <h3 className="text-base font-extrabold text-[#6F52B5] tracking-tight leading-tight m-0 truncate">
              {data.displayName || activeState}
            </h3>
          </div>

          {/* Stats List */}
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between items-center text-slate-600 font-medium">
              <span className="flex items-center gap-1.5">👨‍🎓 Students Impacted</span>
              <span className="font-bold text-[#071B4A]">{data.students?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 font-medium">
              <span className="flex items-center gap-1.5">🌳 Trees Planted</span>
              <span className="font-bold text-[#071B4A]">{data.trees?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 font-medium">
              <span className="flex items-center gap-1.5">💧 Water Projects</span>
              <span className="font-bold text-[#071B4A]">{data.waterProjects?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 font-medium">
              <span className="flex items-center gap-1.5">🏫 Schools Supported</span>
              <span className="font-bold text-[#071B4A]">{data.schools?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 font-medium">
              <span className="flex items-center gap-1.5">🎯 SDG Events</span>
              <span className="font-bold text-[#071B4A]">{data.sdgEvents?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

export default StateTooltip;
