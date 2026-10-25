import React, { useEffect, useRef, useState } from 'react';
import { IMAGES } from '../assets/images';

interface DreamRealmTransitionProps {
  onComplete: () => void;
}

interface VortexParticle {
  x: number;
  y: number;
  distance: number;
  angle: number;
  speed: number;
  radius: number;
  alpha: number;
  color: string;
}

export const DreamRealmTransition: React.FC<DreamRealmTransitionProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<'stirring' | 'converging' | 'opening'>('stirring');

  useEffect(() => {
    // Stage 1: Shadows stir & vortex begins (0ms - 850ms)
    const t1 = setTimeout(() => {
      setPhase('converging');
    }, 850);

    // Stage 2: Portal unveils into chat (1800ms)
    const t2 = setTimeout(() => {
      setPhase('opening');
    }, 1800);

    // Stage 3: Smooth complete handoff (2250ms)
    const t3 = setTimeout(() => {
      onComplete();
    }, 2250);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  // Logarithmic converging particle vortex canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);

    // Create 90 converging particles
    const particleCount = window.innerWidth < 768 ? 55 : 100;
    const particles: VortexParticle[] = Array.from({ length: particleCount }, () => {
      const distance = Math.random() * maxRadius * 0.95 + 60;
      const angle = Math.random() * Math.PI * 2;
      return {
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        distance,
        angle,
        speed: (Math.random() * 0.015 + 0.008) * (Math.random() > 0.5 ? 1 : 1),
        radius: Math.random() * 2.2 + 0.8,
        alpha: Math.random() * 0.6 + 0.3,
        color:
          Math.random() > 0.4
            ? '167, 139, 250' // Spell Violet
            : Math.random() > 0.5
            ? '199, 67, 82'   // Crimson
            : '229, 231, 235', // Pale Silver
      };
    });

    const render = () => {
      // Trail effect: slight dark wash creates silky motion blur
      ctx.fillStyle = 'rgba(8, 10, 15, 0.22)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Spiral inward toward portal center
        p.angle += p.speed * 1.5;
        p.distance -= 2.2;

        // Reset if reached singularity core
        if (p.distance <= 15) {
          p.distance = maxRadius * (Math.random() * 0.4 + 0.6);
          p.angle = Math.random() * Math.PI * 2;
          p.alpha = Math.random() * 0.65 + 0.35;
        }

        p.x = cx + Math.cos(p.angle) * p.distance;
        p.y = cy + Math.sin(p.angle) * p.distance;

        // Glow intensity increases as particles approach center
        const proximityBonus = Math.max(0, 1 - p.distance / (maxRadius * 0.6));
        const currentAlpha = Math.min(1, p.alpha + proximityBonus * 0.4);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
        ctx.shadowColor = `rgba(${p.color}, 0.8)`;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ease-out ${
        phase === 'opening'
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundColor: 'rgba(8, 10, 15, 0.94)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* 1. Vortex Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* 2. Soft expanding aura ripples */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 rounded-full border border-[#A78BFA]/20 animate-soft-ripple pointer-events-none" />
        <div
          className="w-96 h-96 rounded-full border border-[#C74352]/20 animate-soft-ripple pointer-events-none"
          style={{ animationDelay: '0.9s' }}
        />
      </div>

      {/* 3. Central Convergence Core */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4">
        {/* Intricate concentric rotating arcane rings */}
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center mb-8">
          {/* Deep ambient portal glow */}
          <div
            className={`absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(167,139,250,0.45)_0%,_rgba(199,67,82,0.25)_45%,_transparent_75%)] blur-2xl transition-all duration-1000 ${
              phase === 'converging' ? 'scale-125 opacity-100' : 'scale-90 opacity-60'
            }`}
          />

          {/* Outer Rune Ring - Clockwise */}
          <div className="absolute inset-0 animate-spin-slow opacity-60 pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-full h-full text-[#A78BFA]">
              <circle
                cx="100"
                cy="100"
                r="92"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="6 4"
                fill="none"
              />
              <circle
                cx="100"
                cy="100"
                r="84"
                stroke="#C74352"
                strokeWidth="0.8"
                strokeDasharray="2 12"
                fill="none"
              />
              {/* Arcane celestial ticks */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <line
                  key={deg}
                  x1="100"
                  y1="6"
                  x2="100"
                  y2="14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  transform={`rotate(${deg} 100 100)`}
                />
              ))}
            </svg>
          </div>

          {/* Middle Ring - Counter Clockwise */}
          <div className="absolute inset-4 animate-spin-reverse-slow opacity-75 pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-full h-full text-[#C74352]">
              <polygon
                points="100,10 125,75 190,100 125,125 100,190 75,125 10,100 75,75"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                strokeOpacity="0.5"
              />
              <circle
                cx="100"
                cy="100"
                r="64"
                stroke="#A78BFA"
                strokeWidth="1.2"
                strokeDasharray="14 6"
                fill="none"
              />
            </svg>
          </div>

          {/* Central Sigil Emblem */}
          <div
            className={`relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center p-2 transition-transform duration-1000 ease-out ${
              phase === 'converging'
                ? 'scale-110 filter drop-shadow-[0_0_24px_rgba(167,139,250,0.8)]'
                : 'scale-95'
            }`}
          >
            <img
              src={IMAGES.sigilSpell}
              alt="Nightmare Spell Singularity"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain filter drop-shadow-[0_0_16px_rgba(167,139,250,0.6)] animate-pulse"
            />
          </div>
        </div>

        {/* Narrative Typography Transition with Smooth Easing */}
        <div className="space-y-3 max-w-lg">
          <h2
            className={`font-cinzel text-xl sm:text-3xl font-bold uppercase text-[#E5E7EB] drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)] transition-all duration-700 ease-out ${
              phase === 'stirring'
                ? 'opacity-80 tracking-[0.22em] translate-y-1'
                : 'opacity-100 tracking-[0.32em] translate-y-0 text-white'
            }`}
          >
            The shadows stir...
          </h2>

          <p
            className={`text-xs sm:text-sm tracking-[0.24em] font-light font-cinzel transition-all duration-700 delay-150 ease-out ${
              phase === 'converging'
                ? 'opacity-100 text-[#A78BFA] translate-y-0'
                : 'opacity-40 text-[#9CA3AF] translate-y-1'
            }`}
          >
            Memories converge. The Dream Realm opens.
          </p>

          {/* Subtle Weaver's fate thread indicator */}
          <div className="pt-2 flex items-center justify-center gap-2 text-[#A78BFA]/60 font-mono text-xs">
            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#A78BFA]/50" />
            <span className="animate-pulse">✦</span>
            <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#A78BFA]/50" />
          </div>
        </div>
      </div>

      {/* Deep vignette scrims */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(8,10,15,0.8)_85%,_rgba(8,10,15,0.98)_100%)]" />
    </div>
  );
};
