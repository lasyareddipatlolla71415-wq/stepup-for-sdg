import React, { useState, useCallback } from 'react';
import IndiaSvgMap from './IndiaSvgMap';
import StateTooltip from './StateTooltip';
import SectionDivider from '../common/SectionDivider';
import { stateData } from '../../data/stateData';

export default function IndiaMapSection() {
  const [hoveredState, setHoveredState] = useState(null);
  const [selectedState, setSelectedState] = useState('Maharashtra');
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const onStateHover = useCallback((stateName, event) => {
    setHoveredState(stateName);
    if (event) {
      setTooltipPos({
        x: event.clientX,
        y: event.clientY,
      });
    }
  }, []);

  const onStateClick = useCallback((stateName) => {
    setSelectedState(stateName);
  }, []);

  const activeStateName = hoveredState;
  const activeStateData = activeStateName ? stateData[activeStateName] : null;

  return (
    <section id="impact" className="relative w-full pt-6 md:pt-8 pb-0 bg-[#F8F8FC] overflow-hidden font-poppins flex flex-col items-center justify-center scroll-mt-24 md:scroll-mt-28">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#8E73C8]/15 to-[#A98CE5]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center text-center">
        
        {/* Section Header */}
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

        {/* Perfectly Centered interactive map container */}
        <div className="relative w-full max-w-[1060px] mx-auto flex items-center justify-center mt-0 p-0">
          <div className="relative w-full flex items-center justify-center pb-12 md:pb-16">
            <IndiaSvgMap
              hoveredState={hoveredState}
              selectedState={selectedState}
              onStateHover={onStateHover}
              onStateLeave={() => setHoveredState(null)}
              onStateClick={onStateClick}
            />

            <StateTooltip
              activeState={activeStateName}
              data={activeStateData}
              position={tooltipPos}
            />

            <div className="pointer-events-none absolute right-10 bottom-8 hidden max-w-[340px] items-start gap-2 rounded-[10px] bg-white/55 px-3 py-2 text-left backdrop-blur-[4px] md:flex">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F3ECFF] text-[#8B73C6]">
                <span className="text-[10px] leading-none font-semibold">i</span>
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#374151]">
                  MAP DISCLAIMER
                </p>
                <p className="text-[12px] leading-[1.5] text-[#4B5563] font-normal max-w-[290px]">
                  Map visualization powered by React Simple Maps using geographic data for illustrative purposes. Boundaries shown are indicative and do not represent official territorial boundaries.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1060px] mx-auto mt-2 px-1 flex justify-end md:hidden">
          <div className="pointer-events-none flex w-full max-w-[340px] items-start gap-2 rounded-[10px] bg-white/45 px-3 py-2 text-left backdrop-blur-[4px]">
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F3ECFF] text-[#8B73C6]">
              <span className="text-[10px] leading-none font-semibold">i</span>
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#374151]">
                MAP DISCLAIMER
              </p>
              <p className="text-[12px] leading-[1.5] text-[#4B5563] font-normal max-w-[290px]">
                Map visualization powered by React Simple Maps using geographic data for illustrative purposes. Boundaries shown are indicative and do not represent official territorial boundaries.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Clean Static Purple Gradient Line Section Divider */}
      <SectionDivider />

    </section>
  );
}
