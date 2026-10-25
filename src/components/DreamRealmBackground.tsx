import React, { useEffect, useRef } from 'react';
import { IMAGES } from '../assets/images';
import { RealmMode } from '../types/chat';

interface DreamRealmBackgroundProps {
  intensity?: 'full' | 'subdued';
  activeArtwork?: 'ruins' | 'citadel';
  realmMode?: RealmMode;
}

interface AshParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  type: 'ash' | 'ember' | 'wisp';
  color: string;
  rotation: number;
  rotationSpeed: number;
  swayOffset: number;
  swaySpeed: number;
}

export const DreamRealmBackground: React.FC<DreamRealmBackgroundProps> = ({
  intensity = 'full',
  activeArtwork = 'ruins',
  realmMode = 'dream',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const parallaxRef = useRef<{
    targetX: number;
    targetY: number;
    currentX: number;
    currentY: number;
    mouseX: number;
    mouseY: number;
    isHovering: boolean;
  }>({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    mouseX: -9999,
    mouseY: -9999,
    isHovering: false,
  });

  // Parallax and interactive cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;

      parallaxRef.current.targetX = normX;
      parallaxRef.current.targetY = normY;
      parallaxRef.current.mouseX = e.clientX;
      parallaxRef.current.mouseY = e.clientY;
      parallaxRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      parallaxRef.current.targetX = 0;
      parallaxRef.current.targetY = 0;
      parallaxRef.current.mouseX = -9999;
      parallaxRef.current.mouseY = -9999;
      parallaxRef.current.isHovering = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Living canvas: Floating Ash + Glowing Embers reacting subtly to cursor
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

    const isWaking = realmMode === 'waking';
    const emberPrimary = isWaking ? '56, 189, 248' : '167, 139, 250'; // Azure vs Violet
    const emberSecondary = isWaking ? '245, 158, 11' : '199, 67, 82'; // Gold vs Crimson

    const totalParticles = window.innerWidth < 768 ? 45 : 90;
    const particles: AshParticle[] = Array.from({ length: totalParticles }, () => {
      const typeRand = Math.random();
      const type: 'ash' | 'ember' | 'wisp' =
        typeRand > 0.45 ? 'ash' : typeRand > 0.15 ? 'ember' : 'wisp';

      let color = '156, 163, 175'; // default ash
      let size = Math.random() * 2.4 + 1.0;
      let alpha = Math.random() * 0.45 + 0.15;
      let vy = Math.random() * 0.35 + 0.15; // ash falls gently

      if (type === 'ember') {
        color = Math.random() > 0.4 ? emberPrimary : emberSecondary;
        size = Math.random() * 2.0 + 0.8;
        alpha = Math.random() * 0.6 + 0.25;
        vy = -(Math.random() * 0.5 + 0.2); // embers rise
      } else if (type === 'wisp') {
        color = emberPrimary;
        size = Math.random() * 3.5 + 1.5;
        alpha = Math.random() * 0.3 + 0.1;
        vy = -(Math.random() * 0.3 + 0.1);
      }

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy,
        size,
        alpha,
        type,
        color,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        swayOffset: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.008,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth parallax interpolation
      const p = parallaxRef.current;
      p.currentX += (p.targetX - p.currentX) * 0.04;
      p.currentY += (p.targetY - p.currentY) * 0.04;

      const mouseX = p.mouseX;
      const mouseY = p.mouseY;

      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];

        // Organic swaying motion
        pt.swayOffset += pt.swaySpeed;
        const swayForce = Math.sin(pt.swayOffset) * 0.25;

        // Subtle cursor interaction: particles deflect gently when cursor approaches
        if (p.isHovering) {
          const dx = pt.x - mouseX;
          const dy = pt.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxRepelDist = 125;

          if (dist < maxRepelDist && dist > 1) {
            const repelStrength = (1 - dist / maxRepelDist) * 1.6;
            pt.vx += (dx / dist) * repelStrength * 0.35;
            pt.vy += (dy / dist) * repelStrength * 0.35;
          }
        }

        // Apply velocities with soft damping
        pt.vx *= 0.96;
        pt.x += pt.vx + swayForce;
        pt.y += pt.vy;
        pt.rotation += pt.rotationSpeed;

        // Wrap around boundaries
        if (pt.y < -20) {
          pt.y = height + 15;
          pt.x = Math.random() * width;
        } else if (pt.y > height + 20) {
          pt.y = -15;
          pt.x = Math.random() * width;
        }

        if (pt.x < -20) pt.x = width + 15;
        if (pt.x > width + 20) pt.x = -15;

        ctx.save();
        ctx.translate(pt.x, pt.y);
        ctx.rotate(pt.rotation);

        if (pt.type === 'ash') {
          // Floating irregular ash flake
          ctx.beginPath();
          ctx.ellipse(0, 0, pt.size * 1.3, pt.size * 0.8, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${pt.color}, ${pt.alpha})`;
          ctx.fill();
        } else {
          // Glowing Ember or Ethereal Wisp with soft radial blur halo
          const glow = pt.size * 2.8;
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, glow);
          grad.addColorStop(0, `rgba(${pt.color}, ${pt.alpha})`);
          grad.addColorStop(0.4, `rgba(${pt.color}, ${pt.alpha * 0.4})`);
          grad.addColorStop(1, `rgba(${pt.color}, 0)`);

          ctx.beginPath();
          ctx.arc(0, 0, glow, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          // Core point
          ctx.beginPath();
          ctx.arc(0, 0, pt.size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, pt.alpha * 1.5)})`;
          ctx.fill();
        }

        ctx.restore();
      }

      // Update DOM parallax transform for background layers
      const bgImg = document.getElementById('living-landscape-img');
      const fogMid = document.getElementById('living-fog-mid');
      const fogFront = document.getElementById('living-fog-front');

      if (bgImg) {
        bgImg.style.transform = `translate3d(${p.currentX * -14}px, ${p.currentY * -10}px, 0) scale(1.06)`;
      }
      if (fogMid) {
        fogMid.style.transform = `translate3d(${p.currentX * 12}px, ${p.currentY * 8}px, 0)`;
      }
      if (fogFront) {
        fogFront.style.transform = `translate3d(${p.currentX * 22}px, ${p.currentY * 14}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [realmMode]);

  const imageSrc = activeArtwork === 'citadel' ? IMAGES.dreamCitadel : IMAGES.heroRuins;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none select-none z-0 overflow-hidden transition-colors duration-700 ${
        realmMode === 'waking' ? 'bg-[#0B1120]' : 'bg-[#080A0F]'
      }`}
    >
      {/* 1. Distant Ruined Landscape with Smooth Parallax Drift */}
      <div className="absolute -inset-8 overflow-hidden">
        <img
          id="living-landscape-img"
          src={imageSrc}
          alt="Dream Realm Ruins"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center will-change-transform transition-opacity duration-1000 ${
            intensity === 'subdued'
              ? realmMode === 'waking'
                ? 'opacity-35 filter brightness-110 contrast-105'
                : 'opacity-25 filter blur-[1px]'
              : 'opacity-80'
          }`}
        />
      </div>

      {/* 2. Layered Gradients & Atmospheric Lighting */}
      {/* 2A. Crimson horizon lighting & distant sunset flare */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          realmMode === 'waking'
            ? 'bg-[radial-gradient(ellipse_at_50%_15%,_rgba(245,158,11,0.24)_0%,_transparent_65%)]'
            : 'bg-[radial-gradient(ellipse_at_50%_15%,_rgba(199,67,82,0.22)_0%,_transparent_65%)]'
        }`}
      />

      {/* 2B. Spell Violet Corner Aura */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          realmMode === 'waking'
            ? 'bg-[radial-gradient(ellipse_at_bottom_right,_rgba(56,189,248,0.22)_0%,_transparent_55%)]'
            : 'bg-[radial-gradient(ellipse_at_bottom_right,_rgba(167,139,250,0.18)_0%,_transparent_55%)]'
        }`}
      />

      {/* 2C. Dark Gradients Behind Text (Guarantees WCAG AA legibility) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F] via-[#080A0F]/70 to-[#101624]/50 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(8,10,15,0.7)_0%,_rgba(8,10,15,0.2)_60%,_transparent_100%)] pointer-events-none" />

      {/* 3. Layered Fog Planes (Multi-plane Parallax) */}
      {/* 3A. Midground Fog Drift */}
      <div
        id="living-fog-mid"
        className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_30%_65%,_rgba(32,40,58,0.9),_transparent_65%)] animate-mist will-change-transform pointer-events-none"
      />

      {/* 3B. Foreground Ethereal Mist */}
      <div
        id="living-fog-front"
        className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_70%_75%,_rgba(16,22,36,0.95),_transparent_70%)] animate-mist will-change-transform pointer-events-none"
        style={{ animationDuration: '35s' }}
      />

      {/* 4. Interactive Floating Ash & Embers Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* 5. Perimeter Dark Scrim */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(8,10,15,0.65)_85%,_rgba(8,10,15,0.95)_100%)]" />
    </div>
  );
};
