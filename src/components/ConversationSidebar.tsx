import React from 'react';
import { ConversationSession, RealmMode } from '../types/chat';
import { Plus, MessageSquare, BookOpen, X, Sparkles } from 'lucide-react';

interface ConversationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: ConversationSession[];
  activeSessionId: string;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
  onSelectPresetTopic: (topic: string) => void;
  realmMode?: RealmMode;
}

const PRESET_TOPICS = [
  'Sunny\'s True Name & Divine Aspect',
  'The Forgotten Shore & Dark Sea',
  'Weaver\'s Lineage & The Daemons',
  'Nephis & The Immortal Flame',
  'Mordret: Prince of Nothing',
  'Soul Cores & Evolution Ranks',
];

export const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  isOpen,
  onClose,
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  onSelectPresetTopic,
  realmMode = 'dream',
}) => {
  if (!isOpen) return null;

  const isWaking = realmMode === 'waking';

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className="fixed inset-0 z-30 bg-[#080A0F]/80 backdrop-blur-sm lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Panel */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-40 w-72 sm:w-80 border-r flex flex-col justify-between transition-all duration-700 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${
          isWaking
            ? 'bg-[#0B1120]/95 lg:bg-[#131E33]/80 border-[#1E2D4A]'
            : 'bg-[#080A0F]/95 lg:bg-[#101624]/70 border-[#20283A]'
        }`}
      >
        {/* Header */}
        <div
          className={`p-4 border-b flex items-center justify-between transition-colors duration-700 ${
            isWaking ? 'border-[#1E2D4A]' : 'border-[#20283A]'
          }`}
        >
          <div className="flex items-center gap-2">
            <BookOpen
              className={`w-4 h-4 transition-colors duration-700 ${
                isWaking ? 'text-[#38BDF8]' : 'text-[#A78BFA]'
              }`}
            />
            <span className="font-cinzel text-xs font-bold tracking-[0.2em] text-[#E5E7EB] uppercase">
              CHRONICLES
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onNewSession}
              className={`p-1.5 transition-colors cursor-pointer ${
                isWaking
                  ? 'hover:bg-[#1E2D4A] text-[#38BDF8] hover:text-white'
                  : 'hover:bg-[#20283A] text-[#A78BFA] hover:text-white'
              }`}
              title="New inquiry"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-[#20283A] text-[#9CA3AF] hover:text-white transition-colors lg:hidden cursor-pointer"
              aria-label="Close chronicles"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* Active / Recent Inquiries */}
          <div>
            <div className="text-[10px] font-cinzel tracking-[0.2em] uppercase text-[#9CA3AF]/60 mb-2 px-2">
              Recent Communions
            </div>
            <div className="space-y-1">
              {sessions.map((session) => {
                const isActive = activeSessionId === session.id;
                return (
                  <button
                    key={session.id}
                    onClick={() => {
                      onSelectSession(session.id);
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={`w-full text-left px-3 py-2.5 flex items-start gap-2.5 text-xs transition-colors cursor-pointer ${
                      isActive
                        ? isWaking
                          ? 'bg-[#1E2D4A]/90 text-[#F1F5F9] border-l-2 border-[#38BDF8]'
                          : 'bg-[#20283A]/80 text-[#E5E7EB] border-l-2 border-[#A78BFA]'
                        : isWaking
                        ? 'text-[#9CA3AF] hover:bg-[#1E2D4A]/50 hover:text-[#F1F5F9]'
                        : 'text-[#9CA3AF] hover:bg-[#101624] hover:text-[#E5E7EB]'
                    }`}
                  >
                    <MessageSquare
                      className={`w-3.5 h-3.5 mt-0.5 shrink-0 transition-colors duration-700 ${
                        isWaking ? 'text-[#38BDF8]/70' : 'text-[#A78BFA]/70'
                      }`}
                    />
                    <div className="flex-1 truncate">
                      <p className="truncate font-medium">{session.title}</p>
                      <p className="text-[10px] text-[#9CA3AF]/50 font-mono mt-0.5">
                        {session.updatedAt}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lore Codex Bookmarks */}
          <div
            className={`pt-2 border-t transition-colors duration-700 ${
              isWaking ? 'border-[#1E2D4A]/70' : 'border-[#20283A]/60'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[10px] font-cinzel tracking-[0.2em] uppercase text-[#9CA3AF]/60 mb-2 px-2">
              <Sparkles
                className={`w-3 h-3 transition-colors duration-700 ${
                  isWaking ? 'text-[#38BDF8]' : 'text-[#A78BFA]'
                }`}
              />
              <span>Shadow Slave Grimoire</span>
            </div>
            <div className="space-y-1">
              {PRESET_TOPICS.map((topic) => (
                <button
                  key={topic}
                  onClick={() => {
                    onSelectPresetTopic(topic);
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={`w-full text-left px-3 py-2 text-xs transition-colors truncate cursor-pointer ${
                    isWaking
                      ? 'text-[#9CA3AF] hover:text-[#38BDF8] hover:bg-[#1E2D4A]/50'
                      : 'text-[#9CA3AF] hover:text-[#A78BFA] hover:bg-[#101624]'
                  }`}
                >
                  <span
                    className={`mr-1.5 transition-colors duration-700 ${
                      isWaking ? 'text-[#38BDF8]/60' : 'text-[#A78BFA]/50'
                    }`}
                  >
                    ✦
                  </span>
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div
          className={`p-3 border-t text-[11px] text-[#9CA3AF]/60 font-mono text-center transition-colors duration-700 ${
            isWaking ? 'border-[#1E2D4A]' : 'border-[#20283A]'
          }`}
        >
          <span>{isWaking ? 'Solitary Waking Node v1.0' : "Weaver's Tapestry v1.0"}</span>
        </div>
      </aside>
    </>
  );
};
