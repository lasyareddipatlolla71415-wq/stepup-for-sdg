import React, { useState } from 'react';
import India from '@react-map/india';

const IndiaSvgMap = React.memo(function IndiaSvgMap({
  selectedState = 'Maharashtra',
  onStateClick,
}) {
  const [hovered, setHovered] = useState(null);

  const cityColors = {};
  if (hovered) cityColors[hovered] = '#A98CE5';
  if (selectedState) cityColors[selectedState] = '#8B73C6';

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
