'use client';
import React, { useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IndiaSvgMap from './IndiaSvgMap';
import SectionDivider from '../common/SectionDivider';
import { stateData } from '../../data/stateData';

export default function IndiaMapSection() {
  const [hoveredState, setHoveredState] = useState(null);
  const [selectedState, setSelectedState] = useState('Maharashtra');
  const [boxPos, setBoxPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const onStateHover = useCallback((stateName, e) => {
    setHoveredState(stateName);
    if (e && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setBoxPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, []);

  const onStateMove = useCallback((e) => {
    if (!hoveredState || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setBoxPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, [hoveredState]);

  const onStateLeave = useCallback(() => {
    setHoveredState(null);
  }, []);

  const onStateClick = useCallback((stateName) => {
    setSelectedState(stateName);
  }, []);

  const activeData = hoveredState ? stateData[hoveredState] : null;

  // Keep box inside container
  const BOX_W = 220;
  const BOX_H = 180;
  const OFFSET = 16;

  const getBoxStyle = () => {
    if (!containerRef.current) return { left: 0, top: 0 };
    const { width, height } = containerRef.current.getBoundingClientRect();
    let left = boxPos.x + OFFSET;
    let top = boxPos.y + OFFSET;
    if (left + BOX_W > width - 8) left = boxPos.x - BOX_W - OFFSET;
    if (top + BOX_H > height - 8) top = boxPos.y - BOX_H - OFFSET;
    return { left: Math.max(4, left), top: Math.max(4, top) };
  };

  return (
    <section id="impact" className="relative w-full pt-6 md:pt-8 pb-0 bg-[#F8F8FC] overflow-hidden font-poppins flex flex-col items-center justify-center scroll-mt-24 md:scroll-mt-28">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#8E73C8]/15 to-[#A98CE5]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center text-center">

        {/* Header */}
        <div className="w-full text-center mb-3 md:mb-4 flex flex-col items-center justify-center">
          <div className="inline-flex items-center justify-center gap-2 text-[10px] sm:text-xs font-bold text-[#6F52B5] tracking-[0.2em] uppercase mb-1">
            <span className="w-7 h-[2px] bg-[#6F52B5] rounded-full"></span>
            <span>OUR LIVE IMPACT MAP</span>
            <span className="w-7 h-[2px] bg-[#6F52B5] rounded-full"></span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[38px] font-extrabold text-[#071B4A] tracking-tight mb-1 mt-0 text-center">
            Real Impact. Real Change.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#64748B] max-w-lg mx-auto text-center">
            Explore how we're creating sustainable impact across India
          </p>
        </div>

        {/* Map container */}
        <div className="relative w-full max-w-[1060px] mx-auto flex items-center justify-center mt-0 p-0">
          <div
            ref={containerRef}
            className="relative w-full flex items-center justify-center pb-12 md:pb-16"
            onMouseMove={onStateMove}
          >
            <IndiaSvgMap
              hoveredState={hoveredState}
              selectedState={selectedState}
              onStateHover={onStateHover}
              onStateLeave={onStateLeave}
              onStateClick={onStateClick}
            />

            {/* Floating info box near cursor */}
            <AnimatePresence>
              {hoveredState && activeData && (
                <motion.div
                  key={hoveredState}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    ...getBoxStyle(),
                    width: BOX_W,
                    zIndex: 50,
                    pointerEvents: 'none',
                  }}
                >
                  <div style={{
                    background: 'rgba(255,255,255,0.97)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    borderRadius: '14px',
                    border: '1px solid rgba(142,115,200,0.35)',
                    boxShadow: '0 12px 32px -4px rgba(111,82,181,0.25), 0 2px 8px rgba(15,23,42,0.08)',
                    padding: '12px 14px',
                  }}>
                    {/* State name */}
                    <div className="flex items-center gap-2 pb-2 mb-2 border-b border-slate-100">
                      <span className="w-2 h-2 rounded-full bg-[#8E73C8] flex-shrink-0" style={{ boxShadow: '0 0 6px rgba(142,115,200,0.7)' }} />
                      <span className="text-sm font-extrabold text-[#6F52B5] truncate leading-tight">
                        {activeData.displayName || hoveredState}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-col gap-1 text-[11px]">
                      {[
                        { icon: '👨‍🎓', label: 'Students Impacted', value: activeData.students },
                        { icon: '🌳', label: 'Trees Planted',      value: activeData.trees },
                        { icon: '💧', label: 'Water Projects',     value: activeData.waterProjects },
                        { icon: '🏫', label: 'Schools Supported',  value: activeData.schools },
                        { icon: '🎯', label: 'SDG Events',         value: activeData.sdgEvents },
                      ].map(({ icon, label, value }) => (
                        <div key={label} className="flex justify-between items-center">
                          <span className="text-slate-500 flex items-center gap-1">{icon} {label}</span>
                          <span className="font-bold text-[#071B4A] ml-2">{value?.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Disclaimer */}
            <div className="pointer-events-none absolute right-10 bottom-8 hidden max-w-[340px] items-start gap-2 rounded-[10px] bg-white/55 px-3 py-2 text-left backdrop-blur-[4px] md:flex">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F3ECFF] text-[#8B73C6]">
                <span className="text-[10px] leading-none font-semibold">i</span>
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#374151]">MAP DISCLAIMER</p>
                <p className="text-[12px] leading-[1.5] text-[#4B5563] font-normal max-w-[290px]">
                  Map visualization powered by React Simple Maps using geographic data for illustrative purposes. Boundaries shown are indicative and do not represent official territorial boundaries.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile disclaimer */}
        <div className="w-full max-w-[1060px] mx-auto mt-2 px-1 flex justify-end md:hidden">
          <div className="pointer-events-none flex w-full max-w-[340px] items-start gap-2 rounded-[10px] bg-white/45 px-3 py-2 text-left backdrop-blur-[4px]">
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F3ECFF] text-[#8B73C6]">
              <span className="text-[10px] leading-none font-semibold">i</span>
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#374151]">MAP DISCLAIMER</p>
              <p className="text-[12px] leading-[1.5] text-[#4B5563] font-normal max-w-[290px]">
                Map visualization powered by React Simple Maps using geographic data for illustrative purposes. Boundaries shown are indicative and do not represent official territorial boundaries.
              </p>
            </div>
          </div>
        </div>

      </div>

      <SectionDivider />
    </section>
  );
}
