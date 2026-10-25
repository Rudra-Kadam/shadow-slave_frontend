import React from 'react';
import { EmblemSigil } from './EmblemSigil';
import { EnterDreamRealmButton } from './EnterDreamRealmButton';
import { Eye, Shield, Flame, BookOpen } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
  isActivating?: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter, isActivating = false }) => {
  return (
    <div className="relative min-h-screen flex flex-col justify-between z-10 px-4 sm:px-8 py-6 select-none overflow-x-hidden">
      {/* Top Navigation */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between border-b border-[#20283A]/50 pb-5 pt-1">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <EmblemSigil size="sm" useImage={false} />
          <span className="font-cinzel-decorative tracking-[0.25em] text-sm sm:text-base font-bold text-[#E5E7EB] uppercase">
            NIGHTMARE SPELL
          </span>
        </div>

        {/* Quiet Editorial Lore Pillars */}
        <div className="hidden md:flex items-center gap-8 text-xs font-medium tracking-widest text-[#9CA3AF] uppercase">
          <span className="flex items-center gap-1.5 hover:text-[#E5E7EB] transition-colors cursor-default">
            <Eye className="w-3.5 h-3.5 text-[#A78BFA]" />
            Aspects & Flaws
          </span>
          <span className="flex items-center gap-1.5 hover:text-[#E5E7EB] transition-colors cursor-default">
            <Flame className="w-3.5 h-3.5 text-[#C74352]" />
            Soul Cores
          </span>
          <span className="flex items-center gap-1.5 hover:text-[#E5E7EB] transition-colors cursor-default">
            <Shield className="w-3.5 h-3.5 text-[#A78BFA]" />
            Daemons & Gods
          </span>
          <span className="flex items-center gap-1.5 hover:text-[#E5E7EB] transition-colors cursor-default">
            <BookOpen className="w-3.5 h-3.5 text-[#9CA3AF]" />
            Memories
          </span>
        </div>

        {/* Right Action */}
        <button
          onClick={onEnter}
          disabled={isActivating}
          className="text-xs font-cinzel tracking-[0.18em] uppercase text-[#A78BFA] hover:text-white px-3 py-1.5 border border-[#20283A] hover:border-[#A78BFA]/50 transition-all cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#A78BFA]"
        >
          Begin Communion
        </button>
      </header>

      {/* Main Title Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center max-w-5xl mx-auto py-10 sm:py-16 my-auto">
        {/* Small Label - Understated Entrance */}
        <div className="mb-3 sm:mb-4 animate-understated-1">
          <p className="text-xs sm:text-sm tracking-[0.38em] text-[#A78BFA]/85 font-medium uppercase font-cinzel">
            A SHADOW SLAVE COMPANION
          </p>
        </div>

        {/* Central Sigil Emblem - Understated Entrance */}
        <div className="mb-5 sm:mb-6 flex justify-center animate-understated-1">
          <div className="relative group">
            <div className="absolute -inset-4 bg-[radial-gradient(circle,_rgba(167,139,250,0.2)_0%,_transparent_70%)] blur-lg pointer-events-none" />
            <EmblemSigil size="lg" useImage={true} pulsing={true} />
          </div>
        </div>

        {/* Monumental Sculpted Dark-Fantasy Title */}
        <div className="relative mb-5 sm:mb-6 select-none w-full flex justify-center">
          {/* Subtle Ambient Eclipse Backlight behind letters */}
          <div className="absolute -inset-x-12 -inset-y-6 bg-[radial-gradient(ellipse_at_center,_rgba(167,139,250,0.25)_0%,_rgba(199,67,82,0.14)_45%,_transparent_75%)] blur-3xl pointer-events-none" />

          {/* Base Chiseled Title with Cinzel Decorative and Slow Blur-Fade */}
          <h1 className="animate-title-reveal title-shadow-slave text-5xl sm:text-7xl md:text-8xl lg:text-[7.25rem] font-black tracking-[0.12em] sm:tracking-[0.16em] uppercase leading-tight select-none">
            SHADOW SLAVE
          </h1>

          {/* Thin Silver Light Sweep Overlay */}
          <h1
            aria-hidden="true"
            className="animate-silver-sweep absolute inset-0 font-cinzel-decorative text-5xl sm:text-7xl md:text-8xl lg:text-[7.25rem] font-black tracking-[0.12em] sm:tracking-[0.16em] uppercase leading-tight pointer-events-none select-none text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(112deg, transparent 28%, rgba(229,231,235,0.06) 42%, rgba(255,255,255,0.98) 50%, rgba(229,231,235,0.06) 58%, transparent 72%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              animationDelay: '0.85s',
            }}
          >
            SHADOW SLAVE
          </h1>
        </div>

        {/* Weaver's Fate Thread Divider */}
        <div className="animate-understated-2 flex items-center justify-center gap-3 mb-5 sm:mb-6 text-[#A78BFA]/50 text-xs">
          <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#A78BFA]/40" />
          <span className="font-mono text-[10px] tracking-widest text-[#E5E7EB]/60">✦ ᚛ ᛇ ᚜ ✦</span>
          <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#A78BFA]/40" />
        </div>

        {/* Tagline - Understated, Muted Text */}
        <p className="animate-understated-2 text-sm sm:text-lg md:text-xl text-[#9CA3AF] font-light tracking-wide max-w-xl mb-6 sm:mb-8 font-sans px-4">
          Beyond the waking world, knowledge awaits.
        </p>

        {/* Primary CTA Gateway with Magical Seal - Understated Delayed Entrance */}
        <div className="animate-understated-3 relative py-6 sm:py-8 my-1 flex justify-center items-center">
          <EnterDreamRealmButton onClick={onEnter} isActivating={isActivating} />
        </div>

        {/* Supporting Text */}
        <p className="animate-understated-3 text-xs sm:text-sm text-[#9CA3AF]/60 tracking-wider font-light italic">
          Dare to seek what lies beyond the shadows.
        </p>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto border-t border-[#20283A]/40 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-[#9CA3AF]/70 gap-2">
        <span className="font-cinzel tracking-[0.25em] uppercase text-[#E5E7EB]/80">
          KNOWLEDGE LIES BEYOND THE VEIL
        </span>
        <span className="tracking-widest">
          Inspired by the universe created by Guiltythree
        </span>
      </footer>
    </div>
  );
};
