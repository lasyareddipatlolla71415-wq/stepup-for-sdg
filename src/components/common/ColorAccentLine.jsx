import React from 'react';

const colors = [
  '#2B4F7E',
  '#0C66C9',
  '#05A9A9',
  '#05AD51',
  '#8AC73D',
  '#F4B404',
  '#F87D0A',
  '#F8655E',
  '#D03E88',
  '#846EF3',
];

const ColorAccentLine = ({ className = '' }) => {
  return (
    <div className={`color-accent-line flex items-center gap-1.5 ${className}`} aria-hidden="true">
      {colors.map((color) => (
        <span
          key={color}
          className="flex-1 min-w-0 h-[6px] rounded-[4px]"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default ColorAccentLine;
