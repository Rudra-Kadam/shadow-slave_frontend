import React, { useEffect, useRef } from 'react';
import { RealmMode } from '../types/chat';

interface ComposerEmberParticlesProps {
  active: boolean;
  realmMode?: RealmMode;
}

interface Ember {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  colorType: 'primary' | 'secondary' | 'spark';
  wobbleSpeed: number;
  wobbleAmount: number;
  angle: number;
}

export const ComposerEmberParticles: React.FC<ComposerEmberParticlesProps> = ({
  active,
  realmMode = 'dream',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let embers: Ember[] = [];
    let isRunning = true;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      // Add extra margin for rising embers
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const isWaking = realmMode === 'waking';

    // Color definitions
    const dreamColors = {
      primary: '167, 139, 250', // Spell Violet
      secondary: '199, 67, 82',  // Crimson
      spark: '233, 213, 255',     // Pale Ethereal Lilac
    };

    const wakingColors = {
      primary: '56, 189, 248',  // Celestial Azure
      secondary: '245, 158, 11', // Solar Gold
      spark: '254, 240, 138',    // Bright Sunlit Spark
    };

    const colors = isWaking ? wakingColors : dreamColors;

    const spawnEmber = (width: number, height: number): Ember => {
      // Spawn preferentially around the border and top edge of the composer
      const isTopEdge = Math.random() > 0.35;
      const x = isTopEdge
        ? Math.random() * (width - 40) + 20
        : Math.random() > 0.5
        ? Math.random() * 25 + 10
        : width - (Math.random() * 25 + 10);

      const y = isTopEdge
        ? height - (Math.random() * 30 + 10)
        : Math.random() * (height - 20) + 10;

      const colorTypeRand = Math.random();
      const colorType =
        colorTypeRand > 0.65 ? 'primary' : colorTypeRand > 0.25 ? 'secondary' : 'spark';

      return {
        x,
        y,
        radius: Math.random() * 2.2 + 0.8,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(Math.random() * 1.4 + 0.6), // float upwards
        alpha: Math.random() * 0.55 + 0.45,
        decay: Math.random() * 0.015 + 0.008,
        colorType,
        wobbleSpeed: Math.random() * 0.06 + 0.02,
        wobbleAmount: Math.random() * 0.9 + 0.3,
        angle: Math.random() * Math.PI * 2,
      };
    };

    let lastSpawn = 0;

    const render = (time: number) => {
      if (!canvas || !ctx) return;
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, width, height);

      // Spawn new embers if active
      if (active && time - lastSpawn > 65) {
        lastSpawn = time;
        if (embers.length < 45) {
          embers.push(spawnEmber(width, height));
          if (Math.random() > 0.5) {
            embers.push(spawnEmber(width, height));
          }
        }
      }

      // Update and draw embers
      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.angle += e.wobbleSpeed;
        e.x += e.vx + Math.sin(e.angle) * e.wobbleAmount;
        e.y += e.vy;
        e.alpha -= e.decay;

        if (e.alpha <= 0 || e.y < -15) {
          embers.splice(i, 1);
          continue;
        }

        const rgb = colors[e.colorType];

        // Soft outer glow / wisp aura
        ctx.beginPath();
        const glowRadius = e.radius * 3.8;
        const grad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, glowRadius);
        grad.addColorStop(0, `rgba(${rgb}, ${e.alpha * 0.85})`);
        grad.addColorStop(0.4, `rgba(${rgb}, ${e.alpha * 0.35})`);
        grad.addColorStop(1, `rgba(${rgb}, 0)`);

        ctx.fillStyle = grad;
        ctx.arc(e.x, e.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Sharp luminous core
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${Math.min(1, e.alpha * 1.3)})`;
        ctx.fill();
      }

      // Continue animating until all embers fade out
      if (active || embers.length > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        isRunning = false;
      }
    };

    if (active) {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, realmMode]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute -inset-x-6 -inset-y-8 w-[calc(100%+48px)] h-[calc(100%+64px)] pointer-events-none select-none z-10 transition-opacity duration-500 ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    />
  );
};
