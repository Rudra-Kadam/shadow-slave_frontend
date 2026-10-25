import React, { useState } from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface EnterDreamRealmButtonProps {
  onClick: () => void;
  isActivating?: boolean;
}

export const EnterDreamRealmButton: React.FC<EnterDreamRealmButtonProps> = ({
  onClick,
  isActivating = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* 1. Large Arcane Runic Seal Circle Behind Button */}
      <div
        className={`absolute pointer-events-none select-none transition-all duration-1000 ease-out flex items-center justify-center ${
          isActivating
            ? 'w-[140vw] h-[140vw] sm:w-[120vw] sm:h-[120vw] scale-150 opacity-100 rotate-90 z-30'
            : isHovered
            ? 'w-80 h-80 sm:w-96 sm:h-96 scale-105 opacity-85 rotate-12 z-0'
            : 'w-72 h-72 sm:w-80 sm:h-80 scale-100 opacity-40 rotate-0 z-0'
        }`}
        aria-hidden="true"
      >
        {/* Soft Radial Backlight Glow */}
        <div
          className={`absolute inset-0 rounded-full blur-2xl transition-all duration-700 ${
            isActivating
              ? 'bg-[radial-gradient(circle,_rgba(167,139,250,0.6)_0%,_rgba(199,67,82,0.4)_45%,_transparent_75%)] scale-125'
              : isHovered
              ? 'bg-[radial-gradient(circle,_rgba(167,139,250,0.35)_0%,_rgba(199,67,82,0.18)_50%,_transparent_70%)] animate-pulse'
              : 'bg-[radial-gradient(circle,_rgba(167,139,250,0.15)_0%,_transparent_65%)]'
          }`}
        />

        {/* Outer Counter-Rotating Runic Dial */}
        <div
          className={`absolute inset-0 w-full h-full transition-transform duration-1000 ${
            isActivating
              ? 'animate-spin-reverse-slow duration-500'
              : isHovered
              ? 'animate-spin-reverse-slow'
              : 'animate-spin-reverse-slow opacity-60'
          }`}
          style={{ animationDuration: isActivating ? '4s' : isHovered ? '20s' : '40s' }}
        >
          <svg viewBox="0 0 300 300" className="w-full h-full text-[#A78BFA]">
            {/* Outer Ring with Cardinal Ticks */}
            <circle
              cx="150"
              cy="150"
              r="142"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              fill="none"
              strokeOpacity={isHovered || isActivating ? '0.9' : '0.5'}
            />
            <circle
              cx="150"
              cy="150"
              r="134"
              stroke="#C74352"
              strokeWidth="0.8"
              fill="none"
              strokeOpacity="0.6"
            />

            {/* 12 Rune Notches & Celestial Coordinate Markers */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <g key={deg} transform={`rotate(${deg} 150 150)`}>
                <line
                  x1="150"
                  y1="8"
                  x2="150"
                  y2="20"
                  stroke="currentColor"
                  strokeWidth={deg % 90 === 0 ? '2' : '1'}
                />
                <circle cx="150" cy="24" r="1.5" fill="#C74352" />
              </g>
            ))}
          </svg>
        </div>

        {/* Inner Clockwise Runic Glyphs & Octagram Seal */}
        <div
          className={`absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] transition-transform duration-1000 ${
            isActivating ? 'animate-spin-slow' : 'animate-spin-slow'
          }`}
          style={{ animationDuration: isActivating ? '3s' : isHovered ? '16s' : '32s' }}
        >
          <svg viewBox="0 0 260 260" className="w-full h-full text-[#A78BFA]">
            {/* Intersecting Octagram Seal */}
            <polygon
              points="130,10 165,95 250,130 165,165 130,250 95,165 10,130 95,95"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              strokeOpacity={isHovered || isActivating ? '0.75' : '0.35'}
            />
            <polygon
              points="130,25 205,55 235,130 205,205 130,235 55,205 25,130 55,55"
              stroke="#C74352"
              strokeWidth="0.8"
              fill="none"
              strokeOpacity="0.5"
            />

            {/* Concentric Runic Glyph Ring */}
            <circle
              cx="130"
              cy="130"
              r="84"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="8 4"
              fill="none"
              strokeOpacity="0.6"
            />

            {/* Ancient Arcane Glyphs (Weaver's Spell characters) */}
            <text
              fill="currentColor"
              fontSize="9"
              fontFamily="monospace"
              letterSpacing="7"
              className="transition-colors duration-500"
              style={{
                fill: isActivating ? '#FFFFFF' : isHovered ? '#A78BFA' : 'rgba(167, 139, 250, 0.6)',
              }}
            >
              <textPath href="#runeCirclePath" startOffset="0%">
                ᚛ ᚜ ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛋ ᛏ ᛒ ᛖ ᛗ ᛚ ᛜ ᛞ ᛟ ✦ ✦ ✦
              </textPath>
            </text>

            <defs>
              <path
                id="runeCirclePath"
                d="M 130, 130 m -72, 0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0"
              />
            </defs>
          </svg>
        </div>

        {/* Activation Shockwave Rings */}
        {isActivating && (
          <>
            <div className="absolute inset-0 rounded-full border-2 border-[#A78BFA] animate-ping opacity-75" />
            <div
              className="absolute inset-6 rounded-full border border-[#C74352] animate-ping opacity-90"
              style={{ animationDuration: '1.2s' }}
            />
          </>
        )}
      </div>

      {/* 2. Gateway Action Button (Magical Seal Activation) */}
      <div className="relative z-10 inline-flex items-center justify-center group">
        {/* Subtle Button Perimeter Aura */}
        <div
          className={`absolute -inset-1.5 rounded-sm blur-md transition-all duration-700 pointer-events-none ${
            isActivating
              ? 'bg-gradient-to-r from-[#C74352] via-[#A78BFA] to-[#C74352] opacity-100 scale-110 shadow-[0_0_35px_rgba(167,139,250,0.8)]'
              : isHovered
              ? 'bg-gradient-to-r from-[#A78BFA]/50 via-[#A78BFA]/25 to-[#C74352]/40 opacity-80 scale-102 shadow-[0_0_20px_rgba(167,139,250,0.4)]'
              : 'bg-[#A78BFA]/10 opacity-30'
          }`}
        />

        <button
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          disabled={isActivating}
          aria-label="Enter the Dream Realm"
          className={`relative z-10 flex items-center justify-center gap-3.5 px-8 py-4 sm:px-10 sm:py-4.5 bg-[#080A0F]/90 backdrop-blur-md rounded-none border transition-all duration-500 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080A0F] active:scale-[0.98] ${
            isActivating
              ? 'border-[#A78BFA] text-white shadow-[0_0_40px_rgba(167,139,250,0.85)] bg-[#101624]/95'
              : isHovered
              ? 'border-[#A78BFA] text-white shadow-[0_0_26px_rgba(167,139,250,0.45)]'
              : 'border-[#20283A] hover:border-[#A78BFA]/70 text-[#E5E7EB]'
          }`}
        >
          {/* Ancient Corner Brackets */}
          <span
            className={`absolute top-0 left-0 w-2.5 h-2.5 border-t border-l transition-colors duration-500 ${
              isHovered || isActivating ? 'border-[#A78BFA]' : 'border-[#A78BFA]/60'
            }`}
          />
          <span
            className={`absolute top-0 right-0 w-2.5 h-2.5 border-t border-r transition-colors duration-500 ${
              isHovered || isActivating ? 'border-[#A78BFA]' : 'border-[#A78BFA]/60'
            }`}
          />
          <span
            className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l transition-colors duration-500 ${
              isHovered || isActivating ? 'border-[#A78BFA]' : 'border-[#A78BFA]/60'
            }`}
          />
          <span
            className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r transition-colors duration-500 ${
              isHovered || isActivating ? 'border-[#A78BFA]' : 'border-[#A78BFA]/60'
            }`}
          />

          {/* Magical Seal Activation Icon */}
          <span
            className={`relative flex items-center justify-center transition-all duration-500 ${
              isActivating
                ? 'rotate-90 scale-125 text-[#C74352]'
                : isHovered
                ? 'rotate-45 scale-110 text-[#A78BFA]'
                : 'text-[#A78BFA]/80'
            }`}
          >
            {isActivating ? (
              <Sparkles className="w-4 h-4 animate-spin text-[#C74352]" />
            ) : (
              <Compass className="w-4 h-4" />
            )}
          </span>

          {/* Label */}
          <span
            className={`font-cinzel tracking-[0.24em] text-xs sm:text-sm font-semibold uppercase whitespace-nowrap transition-all duration-300 ${
              isActivating ? 'text-white tracking-[0.28em]' : ''
            }`}
          >
            ENTER THE DREAM REALM
          </span>

          {/* Trailing Arcane Rune */}
          <span
            className={`text-xs tracking-widest font-mono transition-colors duration-500 ${
              isActivating
                ? 'text-[#C74352] animate-ping'
                : isHovered
                ? 'text-[#A78BFA]'
                : 'text-[#A78BFA]/50'
            }`}
          >
            ✦
          </span>
        </button>
      </div>
    </div>
  );
};
