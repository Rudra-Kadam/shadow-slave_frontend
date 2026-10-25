import React from 'react';
import { IMAGES } from '../assets/images';
import { RealmMode } from '../types/chat';

export type SigilState = 'settled' | 'retrieving' | 'responding';

interface EmblemSigilProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  state?: SigilState;
  pulsing?: boolean; // backwards compatibility
  useImage?: boolean;
  realmMode?: RealmMode;
}

export const EmblemSigil: React.FC<EmblemSigilProps> = ({
  size = 'md',
  className = '',
  state = 'settled',
  pulsing = false,
  useImage = false,
  realmMode = 'dream',
}) => {
  // Map size keys to dimensions
  const sizeMap = {
    xs: 'w-5 h-5',
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-16 h-16 sm:w-20 sm:h-20',
    xl: 'w-24 h-24 md:w-32 md:h-32',
  };

  const isWaking = realmMode === 'waking';

  // Determine active state, honoring backward-compatible `pulsing` prop
  const activeState: SigilState = pulsing && state === 'settled' ? 'responding' : state;
  const isRetrieving = activeState === 'retrieving';
  const isResponding = activeState === 'responding';
  const isSettled = activeState === 'settled';

  // Realm-dependent colors
  const primaryColor = isWaking ? '#38BDF8' : '#A78BFA';
  const secondaryColor = isWaking ? '#F59E0B' : '#C74352';
  const glowRgb = isWaking ? '56, 189, 248' : '167, 139, 250';
  const pupilGlowRgb = isWaking ? '245, 158, 11' : '199, 67, 82';

  if (useImage) {
    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 ${sizeMap[size]} ${className}`}
      >
        {/* Luminous aura behind image that surges during retrieval or gently pulses during responding */}
        <div
          className={`absolute inset-0 rounded-full blur-md transition-all duration-700 pointer-events-none ${
            isRetrieving
              ? 'bg-[radial-gradient(circle,_rgba(' +
                glowRgb +
                ',0.7)_0%,_rgba(' +
                pupilGlowRgb +
                ',0.4)_50%,_transparent_75%)] scale-135 opacity-100 animate-pulse'
              : isResponding
              ? 'bg-[radial-gradient(circle,_rgba(' +
                glowRgb +
                ',0.4)_0%,_transparent_70%)] scale-110 opacity-75 animate-pulse'
              : 'bg-[radial-gradient(circle,_rgba(' +
                glowRgb +
                ',0.2)_0%,_transparent_65%)] scale-95 opacity-40'
          }`}
        />

        <img
          src={IMAGES.sigilSpell}
          alt="Nightmare Spell Emblem"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-contain filter transition-all duration-500 ${
            isRetrieving
              ? 'brightness-125 saturate-125 drop-shadow-[0_0_18px_rgba(' +
                glowRgb +
                ',0.85)] scale-105'
              : isResponding
              ? 'drop-shadow-[0_0_12px_rgba(' + glowRgb + ',0.6)] animate-pulse'
              : 'drop-shadow-[0_0_6px_rgba(' + glowRgb + ',0.35)] opacity-90'
          } ${isWaking ? 'hue-rotate-30' : ''}`}
        />

        {/* Shockwave ripple during active memory retrieval */}
        {isRetrieving && (
          <span
            className="absolute inset-0 rounded-full border border-current animate-ping opacity-75 pointer-events-none"
            style={{ borderColor: primaryColor }}
          />
        )}
      </div>
    );
  }

  // Bespoke Vector Magical Emblem of the Nightmare Spell
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${sizeMap[size]} ${className}`}
    >
      {/* Ambient Radial Backlight */}
      <div
        className={`absolute inset-0 rounded-full blur-sm transition-all duration-500 pointer-events-none ${
          isRetrieving
            ? 'bg-[radial-gradient(circle,_rgba(' +
              glowRgb +
              ',0.65)_0%,_rgba(' +
              pupilGlowRgb +
              ',0.35)_45%,_transparent_75%)] scale-130 opacity-100'
            : isResponding
            ? 'bg-[radial-gradient(circle,_rgba(' +
              glowRgb +
              ',0.35)_0%,_transparent_70%)] scale-105 opacity-70 animate-pulse'
            : 'bg-[radial-gradient(circle,_rgba(' +
              glowRgb +
              ',0.15)_0%,_transparent_60%)] scale-90 opacity-40'
        }`}
      />

      {/* Shockwave Rings during Retrieval */}
      {isRetrieving && (
        <span
          className="absolute -inset-1 rounded-full border animate-ping opacity-60 pointer-events-none"
          style={{ borderColor: primaryColor }}
        />
      )}

      {/* SVG Emblem Canvas with Concentric Counter-Rotating Runic Bands */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full transition-all duration-700 ${
          isRetrieving
            ? 'filter drop-shadow-[0_0_12px_rgba(' + glowRgb + ',0.9)] scale-105'
            : isResponding
            ? 'filter drop-shadow-[0_0_8px_rgba(' + glowRgb + ',0.6)] animate-pulse'
            : 'filter drop-shadow-[0_0_4px_rgba(' + glowRgb + ',0.35)]'
        }`}
        aria-hidden="true"
      >
        {/* Outer Astrolabe Rune Ring - Rotates slowly in settled state, accelerates in retrieval */}
        <g
          className={`origin-center transition-transform ${
            isRetrieving
              ? 'animate-spin-slow'
              : isResponding
              ? 'animate-spin-slow'
              : 'animate-spin-slow'
          }`}
          style={{
            animationDuration: isRetrieving ? '6s' : isResponding ? '18s' : '45s',
          }}
        >
          {/* Outer Dashed Orbit */}
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke={primaryColor}
            strokeWidth={isRetrieving ? '1.5' : '1.2'}
            strokeOpacity={isRetrieving ? '0.9' : isResponding ? '0.7' : '0.45'}
            strokeDasharray="4 2"
            className="transition-all duration-500"
          />

          {/* Secondary Runic Track */}
          <circle
            cx="50"
            cy="50"
            r="41"
            stroke={primaryColor}
            strokeWidth="0.8"
            strokeOpacity={isRetrieving ? '0.85' : '0.55'}
          />

          {/* 8 Cardinal & Ordinal Astrolabe Notches */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="50"
              y1="3"
              x2="50"
              y2={deg % 90 === 0 ? '9' : '7'}
              stroke={primaryColor}
              strokeWidth={deg % 90 === 0 ? '1.5' : '1'}
              strokeOpacity={isRetrieving ? '1' : '0.6'}
              transform={`rotate(${deg} 50 50)`}
            />
          ))}
        </g>

        {/* Middle Octagram Star & Diamond Web - Counter-Rotates */}
        <g
          className="origin-center"
          style={{
            animation: `spinReverseSlow ${
              isRetrieving ? '5s' : isResponding ? '15s' : '36s'
            } linear infinite`,
          }}
        >
          {/* Octagram Star */}
          <polygon
            points="50,9 60,39 91,50 60,61 50,91 40,61 9,50 40,39"
            stroke={primaryColor}
            strokeWidth={isRetrieving ? '1.4' : '1'}
            strokeOpacity={isRetrieving ? '0.95' : isResponding ? '0.75' : '0.6'}
            fill="none"
            className="transition-all duration-500"
          />

          {/* Inner Accent Octagram (Crimson / Solar Gold) */}
          <polygon
            points="50,17 58,42 83,50 58,58 50,83 42,58 17,50 42,42"
            stroke={secondaryColor}
            strokeWidth={isRetrieving ? '1.2' : '0.8'}
            strokeOpacity={isRetrieving ? '0.9' : '0.6'}
            fill="none"
            className="transition-all duration-500"
          />
        </g>

        {/* Central Sanctorum & Eye of Weaver (The Spell's Eye) */}
        <circle
          cx="50"
          cy="50"
          r="14"
          fill={isWaking ? '#0B1120' : '#080A0F'}
          stroke={primaryColor}
          strokeWidth={isRetrieving ? '1.8' : '1.3'}
          strokeOpacity={isRetrieving ? '1' : '0.8'}
          className="transition-all duration-500"
        />

        {/* Eye Contour */}
        <path
          d="M37 50 C43 41, 57 41, 63 50 C57 59, 43 59, 37 50 Z"
          fill="none"
          stroke={primaryColor}
          strokeWidth={isRetrieving ? '1.6' : '1.3'}
          strokeOpacity={isRetrieving ? '1' : '0.85'}
        />

        {/* Arcane Pupil / Eclipse Core */}
        <circle
          cx="50"
          cy="50"
          r={isRetrieving ? '5.5' : isResponding ? '4.8' : '4.2'}
          fill={secondaryColor}
          className={`transition-all duration-500 ${
            isRetrieving
              ? 'animate-ping'
              : isResponding
              ? 'animate-pulse'
              : ''
          }`}
          style={{
            filter: isRetrieving
              ? `drop-shadow(0 0 6px ${secondaryColor})`
              : 'none',
          }}
        />

        {/* White Glint of Consciousness */}
        <circle
          cx="50"
          cy="50"
          r={isRetrieving ? '2.2' : '1.5'}
          fill="#FFFFFF"
          className="transition-all duration-300"
        />
      </svg>
    </div>
  );
};
