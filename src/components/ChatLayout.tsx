import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, ConversationSession, RealmMode } from '../types/chat';
import { ChatHeader } from './ChatHeader';
import { ChatMessageItem } from './ChatMessageItem';
import { ChatComposer } from './ChatComposer';
import { SuggestedQuestions } from './SuggestedQuestions';
import { TypingIndicator } from './TypingIndicator';
import { ConversationSidebar } from './ConversationSidebar';
import { sendChatMessage } from '../services/chatService';

interface ChatLayoutProps {
  onExitToLanding: () => void;
  realmMode: RealmMode;
  onToggleRealmMode: () => void;
}

const EXACT_WELCOME_MESSAGE = `**Welcome to the Dream Realm.**

I am Nightmare Spell, your guide in this unknown land.

Ask me anything about Shadow Slave — its characters, lore, abilities, nightmares, mysteries, and the secrets hidden within its world.

*Every question is a step deeper into the shadows. What would you like to uncover?*`;

export const ChatLayout: React.FC<ChatLayoutProps> = ({
  onExitToLanding,
  realmMode,
  onToggleRealmMode,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initial Welcome Session
  const [sessions, setSessions] = useState<ConversationSession[]>(() => {
    const initialSessionId = `session_${Date.now()}`;
    return [
      {
        id: initialSessionId,
        title: 'Communion with the Spell',
        createdAt: 'Just now',
        updatedAt: 'Active',
        messages: [
          {
            id: 'welcome-msg',
            role: 'assistant',
            content: EXACT_WELCOME_MESSAGE,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ],
      },
    ];
  });

  const [activeSessionId, setActiveSessionId] = useState<string>(sessions[0].id);

  const activeSession =
    sessions.find((s) => s.id === activeSessionId) || sessions[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeSession.messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessageId = `user_${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newUserMsg: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content: text,
      timestamp,
    };

    // Update session title if first user question
    const isFirstQuestion = activeSession.messages.filter((m) => m.role === 'user').length === 0;
    const newTitle = isFirstQuestion
      ? text.length > 28
        ? `${text.substring(0, 28)}...`
        : text
      : activeSession.title;

    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeSessionId
          ? {
              ...s,
              title: newTitle,
              updatedAt: 'Active',
              messages: [...s.messages, newUserMsg],
            }
          : s
      )
    );

    setIsLoading(true);

    try {
      const response = await sendChatMessage({
        question: text,
        conversation_id: activeSession.id,
      });

      const assistantMsg: ChatMessage = {
        id: `assist_${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: response.sources,
      };

      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId
            ? {
                ...s,
                messages: [...s.messages, assistantMsg],
              }
            : s
        )
      );
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : 'Communion severed by the Dream Realm.';

      const failedMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        role: 'assistant',
        content: errorMsg,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };

      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId
            ? {
                ...s,
                messages: [...s.messages, failedMsg],
              }
            : s
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = (errorMsgId: string) => {
    // Find preceding user message
    const errorIndex = activeSession.messages.findIndex((m) => m.id === errorMsgId);
    if (errorIndex > 0) {
      const prevMsg = activeSession.messages[errorIndex - 1];
      if (prevMsg && prevMsg.role === 'user') {
        setSessions((prev) =>
          prev.map((s) =>
            s.id === activeSessionId
              ? {
                  ...s,
                  messages: s.messages.filter((m) => m.id !== errorMsgId),
                }
              : s
          )
        );
        handleSendMessage(prevMsg.content);
      }
    }
  };

  const handleNewSession = () => {
    const newId = `session_${Date.now()}`;
    const newSession: ConversationSession = {
      id: newId,
      title: 'New Communion',
      createdAt: 'Just now',
      updatedAt: 'Active',
      messages: [
        {
          id: `welcome-${Date.now()}`,
          role: 'assistant',
          content: EXACT_WELCOME_MESSAGE,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    };

    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newId);
  };

  const isWaking = realmMode === 'waking';

  return (
    <div
      className={`relative min-h-screen flex flex-col z-10 transition-colors duration-700 ${
        isWaking
          ? 'realm-waking bg-[#0B1120]/75 text-[#F1F5F9]'
          : 'realm-dream bg-[#080A0F]/70 text-[#E5E7EB]'
      }`}
    >
      {/* Top Header with Nightmare Mode Toggle */}
      <ChatHeader
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onNewConversation={handleNewSession}
        onExitToLanding={onExitToLanding}
        isSidebarOpen={isSidebarOpen}
        realmMode={realmMode}
        onToggleRealmMode={onToggleRealmMode}
        isLoading={isLoading}
      />

      {/* Main Chat Body with Collapsible Sidebar */}
      <div className="flex-1 flex overflow-hidden relative">
        <ConversationSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSelectSession={(id) => setActiveSessionId(id)}
          onNewSession={handleNewSession}
          onSelectPresetTopic={(topic) => handleSendMessage(`Tell me about: ${topic}`)}
          realmMode={realmMode}
        />

        {/* Conversation Stream */}
        <main className="flex-1 flex flex-col h-[calc(100vh-65px)] overflow-hidden">
          <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-4">
            <div className="max-w-4xl mx-auto space-y-4">
              {activeSession.messages.map((msg, index) => (
                <React.Fragment key={msg.id}>
                  <ChatMessageItem
                    message={msg}
                    onRetry={handleRetry}
                    realmMode={realmMode}
                  />
                  {/* Suggested questions chips appear below the first welcome message if only 1 message exists */}
                  {index === 0 && activeSession.messages.length === 1 && (
                    <div className="pl-12 sm:pl-12">
                      <SuggestedQuestions
                        onSelect={handleSendMessage}
                        disabled={isLoading}
                        realmMode={realmMode}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}

              {isLoading && <TypingIndicator realmMode={realmMode} />}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Sticky Bottom Composer */}
          <ChatComposer
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            realmMode={realmMode}
          />
        </main>
      </div>
    </div>
  );
};
