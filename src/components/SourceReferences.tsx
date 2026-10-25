import React, { useState } from 'react';
import { Source, RealmMode } from '../types/chat';
import { ChevronDown, ChevronRight, Scroll, Sparkles } from 'lucide-react';

interface SourceReferencesProps {
  sources?: Source[];
  realmMode?: RealmMode;
}

export const SourceReferences: React.FC<SourceReferencesProps> = ({
  sources,
  realmMode = 'dream',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!sources || sources.length === 0) {
    return null;
  }

  const isWaking = realmMode === 'waking';

  return (
    <div
      className={`mt-4 pt-3 border-t text-xs transition-colors duration-700 ${
        isWaking ? 'border-[#1E2D4A]/70' : 'border-[#20283A]/70'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 hover:text-white transition-colors cursor-pointer py-1 font-cinzel tracking-[0.16em] uppercase text-[11px] ${
          isWaking ? 'text-[#38BDF8]' : 'text-[#A78BFA]'
        }`}
        aria-expanded={isOpen}
      >
        <Sparkles
          className={`w-3.5 h-3.5 transition-colors duration-700 ${
            isWaking ? 'text-[#38BDF8]' : 'text-[#A78BFA]'
          }`}
        />
        <span>MEMORIES UNEARTHED ({sources.length})</span>
        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF]" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
        )}
      </button>

      {isOpen && (
        <div className="mt-2.5 space-y-2.5 transition-all">
          {sources.map((src, idx) => (
            <div
              key={idx}
              className={`p-3 border rounded-none space-y-1 relative group transition-colors duration-700 ${
                isWaking
                  ? 'bg-[#131E33]/70 border-[#1E2D4A] hover:border-[#38BDF8]/40'
                  : 'bg-[#101624]/60 border-[#20283A] hover:border-[#A78BFA]/30'
              }`}
            >
              <div className="flex items-center gap-2 text-[11px] font-medium text-[#E5E7EB]">
                <Scroll
                  className={`w-3 h-3 shrink-0 transition-colors duration-700 ${
                    isWaking ? 'text-[#38BDF8]' : 'text-[#A78BFA]'
                  }`}
                />
                <span
                  className={`font-semibold transition-colors duration-700 ${
                    isWaking ? 'text-[#38BDF8]' : 'text-[#A78BFA]'
                  }`}
                >
                  {src.title || 'Unknown Fragment'}
                </span>
                {src.chapter && (
                  <>
                    <span className="text-[#9CA3AF]/60">·</span>
                    <span className="text-[#9CA3AF] italic">{src.chapter}</span>
                  </>
                )}
              </div>

              {src.text && (
                <p
                  className={`text-[12px] text-[#9CA3AF] leading-relaxed pl-5 border-l mt-1.5 italic font-sans transition-colors duration-700 ${
                    isWaking ? 'border-[#1E2D4A]' : 'border-[#20283A]'
                  }`}
                >
                  "{src.text}"
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
