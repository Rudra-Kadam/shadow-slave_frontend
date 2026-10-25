import React from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { RealmMode } from '../types/chat';

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
  disabled?: boolean;
  realmMode?: RealmMode;
}

const QUESTIONS = [
  'Who is Sunny?',
  'Explain the Nightmare Spell',
  'How do Aspect Abilities work?',
  'Explore the Dream Realm',
];

export const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({
  onSelect,
  disabled,
  realmMode = 'dream',
}) => {
  const isWaking = realmMode === 'waking';

  return (
    <div className="pt-2 pb-4">
      <div className="flex items-center gap-2 mb-2.5 text-[11px] font-cinzel tracking-[0.2em] uppercase text-[#9CA3AF]">
        <Sparkles
          className={`w-3 h-3 transition-colors duration-700 ${
            isWaking ? 'text-[#38BDF8]' : 'text-[#A78BFA]'
          }`}
        />
        <span>Inquire of the Spell:</span>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-2.5">
        {QUESTIONS.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => onSelect(question)}
            disabled={disabled}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm border transition-all duration-500 cursor-pointer rounded-none outline-none focus-visible:ring-1 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${
              isWaking
                ? 'bg-[#131E33]/90 hover:bg-[#1E2D4A] text-[#F1F5F9] border-[#1E2D4A] hover:border-[#38BDF8]/60 focus-visible:ring-[#38BDF8]'
                : 'bg-[#101624]/80 hover:bg-[#20283A] text-[#E5E7EB] border-[#20283A] hover:border-[#A78BFA]/50 focus-visible:ring-[#A78BFA]'
            }`}
          >
            <Compass
              className={`w-3.5 h-3.5 shrink-0 transition-colors duration-700 ${
                isWaking ? 'text-[#38BDF8]' : 'text-[#A78BFA]/80'
              }`}
            />
            <span className="whitespace-nowrap">{question}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
