import React from 'react';
import { EmblemSigil } from './EmblemSigil';
import { PanelLeft, Plus, LogOut, Radio, Moon, Sun } from 'lucide-react';
import { isLiveApiConfigured } from '../services/chatService';
import { RealmMode } from '../types/chat';

interface ChatHeaderProps {
  onToggleSidebar: () => void;
  onNewConversation: () => void;
  onExitToLanding: () => void;
  isSidebarOpen: boolean;
  realmMode: RealmMode;
  onToggleRealmMode: () => void;
  isLoading?: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  onToggleSidebar,
  onNewConversation,
  onExitToLanding,
  isSidebarOpen,
  realmMode,
  onToggleRealmMode,
  isLoading = false,
}) => {
  const isWaking = realmMode === 'waking';

  return (
    <header
      className={`sticky top-0 z-20 w-full backdrop-blur-md border-b px-3 sm:px-6 py-3 flex items-center justify-between transition-colors duration-700 ${
        isWaking
          ? 'bg-[#0B1120]/90 border-[#1E2D4A]'
          : 'bg-[#080A0F]/90 border-[#20283A]'
      }`}
    >
      {/* Left: Sidebar Toggle + Identity */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className={`p-2 border transition-colors cursor-pointer outline-none focus-visible:ring-1 ${
            isWaking
              ? 'border-[#1E2D4A] hover:border-[#38BDF8]/50 text-[#9CA3AF] hover:text-[#E5E7EB] focus-visible:ring-[#38BDF8]'
              : 'border-[#20283A] hover:border-[#A78BFA]/50 text-[#9CA3AF] hover:text-[#E5E7EB] focus-visible:ring-[#A78BFA]'
          } ${
            isSidebarOpen
              ? isWaking
                ? 'bg-[#1E2D4A]/60 text-[#38BDF8]'
                : 'bg-[#20283A]/50 text-[#A78BFA]'
              : ''
          }`}
          aria-label="Toggle Archives Sidebar"
          title="Toggle Chronicles"
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5">
          <EmblemSigil
            size="sm"
            useImage={false}
            state={isLoading ? 'retrieving' : 'settled'}
            realmMode={realmMode}
          />
          <div>
            <h1 className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] text-[#E5E7EB] uppercase leading-none">
              NIGHTMARE SPELL
            </h1>
            <p
              className={`text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-cinzel mt-0.5 leading-none transition-colors duration-700 ${
                isWaking ? 'text-[#38BDF8]' : 'text-[#A78BFA]'
              }`}
            >
              {isWaking ? 'WAKING WORLD CONDUIT' : 'YOUR GUIDE THROUGH THE UNKNOWN'}
            </p>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Nightmare Mode / Realm Shift Toggle */}
        <button
          onClick={onToggleRealmMode}
          className={`group relative flex items-center gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-cinzel tracking-wider uppercase border transition-all duration-500 cursor-pointer outline-none ${
            isWaking
              ? 'bg-[#38BDF8]/10 border-[#38BDF8]/40 hover:border-[#38BDF8] text-[#38BDF8] hover:text-white shadow-[0_0_12px_rgba(56,189,248,0.2)]'
              : 'bg-[#A78BFA]/10 border-[#A78BFA]/40 hover:border-[#A78BFA] text-[#A78BFA] hover:text-white shadow-[0_0_12px_rgba(167,139,250,0.2)]'
          }`}
          title={isWaking ? 'Shift to Dream Realm aesthetic' : 'Shift to Waking World aesthetic'}
          aria-label={`Toggle realm aesthetic: currently ${isWaking ? 'Waking World' : 'Dream Realm'}`}
        >
          <span className="relative flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
            {isWaking ? (
              <Sun className="w-3.5 h-3.5 text-[#F59E0B] animate-pulse" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-[#A78BFA]" />
            )}
          </span>
          <span className="whitespace-nowrap font-medium text-[11px]">
            {isWaking ? 'Waking World' : 'Dream Realm'}
          </span>
        </button>

        {/* Real RAG vs Mock Badge */}
        <div
          className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono border text-[#9CA3AF] transition-colors duration-700 ${
            isWaking ? 'border-[#1E2D4A]' : 'border-[#20283A]'
          }`}
        >
          <Radio
            className={`w-3 h-3 ${
              isLiveApiConfigured
                ? 'text-[#C74352]'
                : isWaking
                ? 'text-[#38BDF8]'
                : 'text-[#A78BFA]'
            }`}
          />
          <span>{isLiveApiConfigured ? 'LIVE PYTHON RAG' : 'LORE ARCHIVE'}</span>
        </div>

        {/* New Communion */}
        <button
          onClick={onNewConversation}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-cinzel tracking-wider uppercase text-[#E5E7EB] border transition-colors cursor-pointer ${
            isWaking
              ? 'border-[#1E2D4A] hover:border-[#38BDF8]/50 hover:text-[#38BDF8]'
              : 'border-[#20283A] hover:border-[#A78BFA]/50 hover:text-[#A78BFA]'
          }`}
          title="New inquiry"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px]">New Memory</span>
        </button>

        {/* Exit to Landing */}
        <button
          onClick={onExitToLanding}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs text-[#9CA3AF] hover:text-[#C74352] border border-[#20283A] hover:border-[#C74352]/40 transition-colors cursor-pointer font-cinzel tracking-wider uppercase"
          title="Return to gateway"
          aria-label="Exit to Gateway"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden md:inline text-[11px]">Gateway</span>
        </button>
      </div>
    </header>
  );
};
