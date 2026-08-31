import React from 'react';

interface BloodDripTextProps {
  text: string;
  highlightText?: string;
  className?: string;
  highlightClassName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  intensity?: 'mild' | 'heavy';
}

export const BloodDripText: React.FC<BloodDripTextProps> = ({
  text,
  highlightText,
  className = '',
  highlightClassName = 'text-red-500',
  size = 'lg',
  intensity = 'heavy',
}) => {
  // Generate random drip positions for realistic effect
  const drips = [
    { left: '8%', height: '38px', delay: '0s', duration: '3.2s', width: '3.5px' },
    { left: '19%', height: '52px', delay: '1.4s', duration: '2.8s', width: '4px' },
    { left: '32%', height: '28px', delay: '0.7s', duration: '3.6s', width: '3px' },
    { left: '46%', height: '60px', delay: '2.1s', duration: '3.1s', width: '4.5px' },
    { left: '59%', height: '42px', delay: '0.3s', duration: '2.9s', width: '3.8px' },
    { left: '73%', height: '56px', delay: '1.8s', duration: '3.4s', width: '4.2px' },
    { left: '87%', height: '34px', delay: '1.1s', duration: '3.0s', width: '3.2px' },
  ];

  return (
    <div className={`relative inline-block select-none group ${className}`}>
      {/* Background blood glow */}
      <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-red-600/30 via-rose-600/20 to-red-900/30 blur-md opacity-70 pointer-events-none group-hover:opacity-100 transition-opacity" />

      {/* Main Text Content */}
      <span className="relative z-10 font-extrabold tracking-tight drop-shadow-[0_4px_10px_rgba(220,38,38,0.4)]">
        {text}{' '}
        {highlightText && (
          <span className={`relative inline-block ${highlightClassName} drop-shadow-[0_0_15px_rgba(239,68,68,0.7)]`}>
            {highlightText}
          </span>
        )}
      </span>

      {/* Blood Drip SVG / Droplet Layer at the bottom of the text */}
      <div className="absolute -bottom-3 left-0 right-0 h-10 pointer-events-none overflow-visible z-20">
        {drips.map((drip, idx) => (
          <div
            key={idx}
            className="absolute top-0 flex flex-col items-center"
            style={{
              left: drip.left,
              animation: `blood-drip-flow ${drip.duration} ease-in-out infinite ${drip.delay}`,
            }}
          >
            {/* Hanging Drip Thread */}
            <div
              className="bg-gradient-to-b from-red-700 via-red-600 to-rose-500 rounded-b-full shadow-[0_0_8px_#ef4444]"
              style={{
                width: drip.width,
                height: intensity === 'heavy' ? drip.height : '20px',
                animation: `blood-stretch ${drip.duration} ease-in-out infinite ${drip.delay}`,
              }}
            />
            {/* Falling Droplet */}
            <div
              className="w-2.5 h-3 rounded-full bg-gradient-to-b from-red-500 to-red-800 shadow-[0_0_10px_#dc2626]"
              style={{
                marginTop: '-2px',
                animation: `blood-drop-fall ${drip.duration} cubic-bezier(0.4, 0, 0.2, 1) infinite ${drip.delay}`,
              }}
            />
          </div>
        ))}

        {/* Small blood wave along text bottom */}
        <svg
          viewBox="0 0 500 20"
          className="w-full h-3 text-red-600/80 -mt-1 drop-shadow-[0_2px_4px_rgba(185,28,28,0.8)]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 Q25,8 50,2 Q80,12 110,4 Q140,16 170,3 Q210,14 240,2 Q280,15 320,4 Q360,16 400,2 Q450,14 500,0 L500,0 L0,0 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
};
