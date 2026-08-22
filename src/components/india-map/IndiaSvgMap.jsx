'use client';
import React, { useState, useEffect, useRef } from 'react';
import India from '@react-map/india';

// Exact state names used as path IDs by @react-map/india
const STATE_CODES = [
  'Jammu and Kashmir','West Bengal','Uttarakhand','Uttar Pradesh','Tripura',
  'Tamil Nadu','Telangana','Sikkim','Rajasthan','Puducherry','Punjab','Odisha',
  'Nagaland','Mizoram','Madhya Pradesh','Manipur','Meghalaya','Maharashtra',
  'Lakshadweep','Kerala','Karnataka','Ladakh','Jharkhand','Haryana',
  'Himachal Pradesh','Gujarat','Goa','Dadra and Nagar Haveli','Delhi',
  'Daman and Diu','Chhattisgarh','Chandigarh','Bihar','Assam',
  'Arunachal Pradesh','Andhra Pradesh','Andaman and Nicobar Islands',
];

const IndiaSvgMap = React.memo(function IndiaSvgMap({
  selectedState = 'Maharashtra',
  onStateClick,
  onStateHover,
  onStateLeave,
}) {
  const [hovered, setHovered] = useState(null);
  const instanceIdRef = useRef(null);

  const cityColors = {};
  if (hovered) cityColors[hovered] = '#A98CE5';
  if (selectedState) cityColors[selectedState] = '#8B73C6';

  useEffect(() => {
    // @react-map/india uses id="${stateCode}-${instanceId}" on each path.
    // Find the instanceId by locating any known path.
    const findInstanceId = () => {
      for (const code of STATE_CODES) {
        const els = document.querySelectorAll(`[id^="${code}-"]`);
        if (els.length > 0) {
          const id = els[0].getAttribute('id');
          return id.slice(code.length + 1); // everything after "StateName-"
        }
      }
      return null;
    };

    const attach = () => {
      const iid = findInstanceId();
      if (!iid) return false;
      instanceIdRef.current = iid;

      STATE_CODES.forEach((code) => {
        const el = document.getElementById(`${code}-${iid}`);
        if (!el) return;

        el.addEventListener('mouseenter', (e) => {
          setHovered(code);
          onStateHover?.(code, e);
          el.style.filter = 'brightness(1.4) drop-shadow(0 0 8px rgba(142,115,200,0.9))';
        });
        el.addEventListener('mouseleave', () => {
          setHovered(null);
          onStateLeave?.();
          el.style.filter = '';
        });
      });
      return true;
    };

    // Retry until SVG is rendered
    let attempts = 0;
    const interval = setInterval(() => {
      if (attach() || attempts++ > 20) clearInterval(interval);
    }, 150);

    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="india-map-container">
      <India
        type="select-single"
        size={600}
        mapColor="#8B73C6"
        strokeColor="#FFFFFF"
        strokeWidth={1.2}
        hoverColor="#A98CE5"
        selectColor="#6d4fc2"
        hints={false}
        cityColors={cityColors}
        onSelect={(state) => onStateClick?.(state)}
      />
      <style>{`
        .india-map-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin: 0 auto;
        }
        .india-map-container svg path {
          cursor: pointer;
          transition: filter 0.15s ease;
        }
        @media (max-width: 1024px) {
          .india-map-container svg { width: 82% !important; }
        }
        @media (max-width: 768px) {
          .india-map-container svg { width: 92% !important; }
        }
      `}</style>
    </div>
  );
});

export default IndiaSvgMap;
