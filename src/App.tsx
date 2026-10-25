/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AppStage, RealmMode } from './types/chat';
import { DreamRealmBackground } from './components/DreamRealmBackground';
import { LandingPage } from './components/LandingPage';
import { DreamRealmTransition } from './components/DreamRealmTransition';
import { ChatLayout } from './components/ChatLayout';

export default function App() {
  const [stage, setStage] = useState<AppStage>('landing');
  const [isActivatingCta, setIsActivatingCta] = useState(false);
  const [realmMode, setRealmMode] = useState<RealmMode>('dream');

  const handleStartTransition = () => {
    setIsActivatingCta(true);
    // Magical seal activates: runes flare and runic circle expands into full-screen portal
    setTimeout(() => {
      setStage('transitioning');
      setIsActivatingCta(false);
    }, 600);
  };

  const handleTransitionComplete = () => {
    setStage('chat');
  };

  const handleExitToLanding = () => {
    setStage('landing');
  };

  const handleToggleRealmMode = () => {
    setRealmMode((prev) => (prev === 'dream' ? 'waking' : 'dream'));
  };

  return (
    <div
      className={`relative min-h-screen font-sans transition-colors duration-700 ${
        realmMode === 'waking'
          ? 'bg-[#0B1120] text-[#F1F5F9] selection:bg-[#38BDF8]/30 selection:text-white'
          : 'bg-[#080A0F] text-[#E5E7EB] selection:bg-[#A78BFA]/30 selection:text-white'
      }`}
    >
      {/* Persistent Atmospheric Background */}
      <DreamRealmBackground
        intensity={stage === 'landing' ? 'full' : 'subdued'}
        activeArtwork={stage === 'landing' ? 'ruins' : 'citadel'}
        realmMode={realmMode}
      />

      {/* Stage 1: Cinematic Landing Page (retained during transition for zero jarring flicker) */}
      {stage !== 'chat' && (
        <div
          className={`transition-all duration-1000 ease-out ${
            stage === 'transitioning'
              ? 'opacity-25 filter blur-[3px] scale-[0.98] pointer-events-none'
              : 'opacity-100 filter blur-0 scale-100'
          }`}
        >
          <LandingPage
            onEnter={handleStartTransition}
            isActivating={isActivatingCta}
          />
        </div>
      )}

      {/* Stage 2: Animated Transition "Enter the Dream Realm" with logarithmic vortex */}
      {stage === 'transitioning' && (
        <DreamRealmTransition onComplete={handleTransitionComplete} />
      )}

      {/* Stage 3: Immersive Nightmare Spell Conversational Interface */}
      {stage === 'chat' && (
        <div className="animate-fade-in-up">
          <ChatLayout
            onExitToLanding={handleExitToLanding}
            realmMode={realmMode}
            onToggleRealmMode={handleToggleRealmMode}
          />
        </div>
      )}
    </div>
  );
}
