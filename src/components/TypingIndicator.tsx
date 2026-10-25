import React from 'react';
import { EmblemSigil } from './EmblemSigil';
import { RealmMode } from '../types/chat';

interface TypingIndicatorProps {
  realmMode?: RealmMode;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ realmMode = 'dream' }) => {
  const isWaking = realmMode === 'waking';

  return (
    <div className="flex items-start gap-3.5 py-4 px-2 max-w-3xl animate-fade-in">
      <EmblemSigil size="sm" useImage={false} state="retrieving" realmMode={realmMode} />
      <div className="space-y-1.5">
        <div
          className={`flex items-center gap-2 text-xs font-cinzel tracking-[0.18em] uppercase transition-colors duration-700 ${
            isWaking ? 'text-[#38BDF8]' : 'text-[#A78BFA]'
          }`}
        >
          <span>
            {isWaking
              ? 'Querying the Waking Archive...'
              : 'The Spell searches its memories...'}
          </span>
          <span className="flex items-center gap-1">
            <span
              className={`w-1.5 h-1.5 rounded-full animate-ping ${
                isWaking ? 'bg-[#38BDF8]' : 'bg-[#A78BFA]'
              }`}
            />
            <span
              className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                isWaking ? 'bg-[#F59E0B]' : 'bg-[#C74352]'
              }`}
            />
          </span>
        </div>
        <p className="text-xs text-[#9CA3AF]/60 italic font-sans">
          {isWaking
            ? 'Channeling data across waking terminals and ancient scrolls...'
            : 'Unweaving the tapestry of fate in the Dream Realm...'}
        </p>
      </div>
    </div>
  );
};
