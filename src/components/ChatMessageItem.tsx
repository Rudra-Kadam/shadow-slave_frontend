import React from 'react';
import { ChatMessage, RealmMode } from '../types/chat';
import { EmblemSigil } from './EmblemSigil';
import { SourceReferences } from './SourceReferences';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ChatMessageItemProps {
  message: ChatMessage;
  onRetry?: (messageId: string) => void;
  realmMode?: RealmMode;
  isResponding?: boolean;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  onRetry,
  realmMode = 'dream',
  isResponding = false,
}) => {
  const isAssistant = message.role === 'assistant';
  const isWaking = realmMode === 'waking';

  // Helper to render formatted text with basic bolding, bullets and italic emphasis
  const renderFormattedContent = (content: string) => {
    const paragraphs = content.split('\n\n');

    return paragraphs.map((para, pIdx) => {
      const lines = para.split('\n');

      return (
        <div key={pIdx} className="space-y-1">
          {lines.map((line, lIdx) => {
            // Check for bullet list item
            if (line.trim().startsWith('• ') || line.trim().startsWith('- ')) {
              const text = line.trim().replace(/^[•-]\s+/, '');
              return (
                <div key={lIdx} className="flex items-start gap-2 pl-2">
                  <span
                    className={`text-xs mt-1 shrink-0 transition-colors duration-700 ${
                      isWaking ? 'text-[#38BDF8]' : 'text-[#A78BFA]'
                    }`}
                  >
                    ✦
                  </span>
                  <div
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: formatInlineMarkdown(text),
                    }}
                  />
                </div>
              );
            }

            // Regular line
            return (
              <p
                key={lIdx}
                className="leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: formatInlineMarkdown(line),
                }}
              />
            );
          })}
        </div>
      );
    });
  };

  const formatInlineMarkdown = (text: string): string => {
    const accentClass = isWaking ? 'text-[#38BDF8]' : 'text-[#A78BFA]';
    const codeBg = isWaking ? 'bg-[#1E2D4A]/80' : 'bg-[#20283A]/80';

    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(
        /\*(.*?)\*/g,
        `<em class="${accentClass}/90 italic font-serif transition-colors duration-700">$1</em>`
      )
      .replace(
        /`([^`]+)`/g,
        `<code class="${codeBg} px-1.5 py-0.5 font-mono text-[11px] ${accentClass} transition-colors duration-700">$1</code>`
      );
  };

  if (!isAssistant) {
    // User Message
    return (
      <div className="flex justify-end py-3 px-2">
        <div
          className={`max-w-[85%] sm:max-w-[75%] border px-4 py-3 text-sm shadow-md transition-colors duration-700 ${
            isWaking
              ? 'bg-[#131E33] border-[#1E2D4A] text-[#F1F5F9]'
              : 'bg-[#101624] border-[#20283A] text-[#E5E7EB]'
          }`}
        >
          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
          <div className="mt-1 text-right">
            <span className="text-[10px] text-[#9CA3AF]/50 font-mono tracking-wider">
              {message.timestamp}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Assistant Message
  return (
    <div className="flex items-start gap-3.5 py-4 px-2 max-w-3xl transition-opacity duration-300">
      {/* Sigil Beside Message */}
      <div className="pt-0.5 shrink-0">
        <EmblemSigil
          size="sm"
          useImage={false}
          state={isResponding ? 'responding' : 'settled'}
          realmMode={realmMode}
        />
      </div>

      <div className="flex-1 space-y-2 overflow-hidden">
        {/* Name Bar */}
        <div className="flex items-center gap-2">
          <span
            className={`font-cinzel text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-700 ${
              isWaking ? 'text-[#38BDF8]' : 'text-[#A78BFA]'
            }`}
          >
            Nightmare Spell
          </span>
          <span className="text-[10px] text-[#9CA3AF]/50 font-mono tracking-widest">
            {message.timestamp}
          </span>
        </div>

        {/* Content Box */}
        {message.isError ? (
          <div className="p-3.5 bg-[#C74352]/10 border border-[#C74352]/40 text-xs text-[#E5E7EB] space-y-2">
            <div className="flex items-center gap-2 text-[#C74352] font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>COMMUNION INTERRUPTED</span>
            </div>
            <p className="text-[#9CA3AF] leading-relaxed">{message.content}</p>
            {onRetry && (
              <button
                onClick={() => onRetry(message.id)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs border border-[#C74352]/50 hover:bg-[#C74352]/20 text-[#E5E7EB] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 text-[#C74352]" />
                <span>Retry Communion</span>
              </button>
            )}
          </div>
        ) : (
          <div
            className={`text-sm space-y-3 font-sans transition-colors duration-700 ${
              isWaking ? 'text-[#F1F5F9]' : 'text-[#E5E7EB]'
            }`}
          >
            {renderFormattedContent(message.content)}
          </div>
        )}

        {/* Sources Fragment Accordion */}
        {message.sources && message.sources.length > 0 && (
          <SourceReferences sources={message.sources} realmMode={realmMode} />
        )}
      </div>
    </div>
  );
};
