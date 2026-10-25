import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Sparkles } from 'lucide-react';
import { RealmMode } from '../types/chat';
import { ComposerEmberParticles } from './ComposerEmberParticles';

interface ChatComposerProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  realmMode?: RealmMode;
}

export const ChatComposer: React.FC<ChatComposerProps> = ({
  onSendMessage,
  isLoading,
  realmMode = 'dream',
}) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const isWaking = realmMode === 'waking';

  // Auto-grow textarea height
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
  }, [input]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    onSendMessage(input.trim());
    setInput('');

    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isSendDisabled = !input.trim() || isLoading;

  return (
    <div className="relative w-full max-w-4xl mx-auto px-3 sm:px-4 pb-4 pt-2">
      {/* Magical Ember & Wisp Particle Effect Generator */}
      <ComposerEmberParticles active={isLoading} realmMode={realmMode} />

      <form
        onSubmit={handleSubmit}
        className={`relative z-20 backdrop-blur-md transition-all duration-700 border ${
          isLoading
            ? isWaking
              ? 'bg-[#131E33]/98 border-[#38BDF8]/60 shadow-[0_0_24px_rgba(56,189,248,0.22)]'
              : 'bg-[#101624]/98 border-[#A78BFA]/60 shadow-[0_0_24px_rgba(167,139,250,0.22)]'
            : isWaking
            ? 'bg-[#131E33]/95 border-[#1E2D4A] hover:border-[#38BDF8]/40 focus-within:border-[#38BDF8]/70 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
            : 'bg-[#101624]/95 border-[#20283A] hover:border-[#A78BFA]/40 focus-within:border-[#A78BFA]/70 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
        }`}
      >
        {/* Subtle accent bar at top edge */}
        <div
          className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent to-transparent transition-colors duration-700 ${
            isLoading
              ? isWaking
                ? 'via-[#38BDF8] animate-pulse'
                : 'via-[#A78BFA] animate-pulse'
              : isWaking
              ? 'via-[#38BDF8]/60'
              : 'via-[#A78BFA]/50'
          }`}
        />

        <div className="flex items-end gap-2 p-3 sm:p-4">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isWaking
                ? 'Query the waking archives on Shadow Slave...'
                : 'Ask about Shadow Slave...'
            }
            disabled={isLoading}
            className={`flex-1 bg-transparent placeholder-[#9CA3AF]/60 text-sm sm:text-base resize-none outline-none leading-relaxed min-h-[28px] max-h-[180px] font-sans transition-colors duration-700 ${
              isWaking
                ? 'text-[#F1F5F9] selection:bg-[#38BDF8]/30'
                : 'text-[#E5E7EB] selection:bg-[#A78BFA]/30'
            }`}
            aria-label="Message to Nightmare Spell"
          />

          <button
            type="submit"
            disabled={isSendDisabled}
            className={`p-2.5 sm:px-4 sm:py-2.5 flex items-center justify-center gap-1.5 font-cinzel text-xs tracking-wider transition-all duration-500 cursor-pointer rounded-none outline-none focus-visible:ring-1 shrink-0 ${
              isSendDisabled
                ? 'opacity-30 cursor-not-allowed text-[#9CA3AF]'
                : isWaking
                ? 'bg-[#38BDF8]/10 hover:bg-[#38BDF8]/20 text-[#38BDF8] hover:text-white border border-[#38BDF8]/40 shadow-[0_0_12px_rgba(56,189,248,0.25)] focus-visible:ring-[#38BDF8]'
                : 'bg-[#A78BFA]/10 hover:bg-[#A78BFA]/20 text-[#A78BFA] hover:text-white border border-[#A78BFA]/40 shadow-[0_0_12px_rgba(167,139,250,0.25)] focus-visible:ring-[#A78BFA]'
            }`}
            aria-label="Send query"
          >
            {isLoading ? (
              <Sparkles
                className={`w-4 h-4 animate-spin ${
                  isWaking ? 'text-[#F59E0B]' : 'text-[#C74352]'
                }`}
              />
            ) : (
              <>
                <span className="hidden sm:inline uppercase text-[11px] font-semibold">
                  {isWaking ? 'Transmit' : 'Commune'}
                </span>
                <SendHorizontal className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Input Footer Indicator */}
        <div className="flex items-center justify-between px-4 pb-2 pt-0 text-[10px] text-[#9CA3AF]/60 font-mono">
          <span className="hidden sm:inline">Press Enter to send · Shift+Enter for new line</span>
          <span
            className={`italic sm:ml-auto transition-colors duration-700 ${
              isLoading
                ? isWaking
                  ? 'text-[#38BDF8] font-medium'
                  : 'text-[#A78BFA] font-medium'
                : isWaking
                ? 'text-[#38BDF8]/80'
                : 'text-[#A78BFA]/70'
            }`}
          >
            {isLoading
              ? isWaking
                ? 'Searching records... [Essence Manifesting]'
                : 'Consulting the Spell... [Shadows Weaving]'
              : isWaking
              ? 'Waking Archive Terminal Protocol'
              : 'Nightmare Spell RAG Protocol'}
          </span>
        </div>
      </form>
    </div>
  );
};
