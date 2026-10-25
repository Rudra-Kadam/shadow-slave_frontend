export interface Source {
  title?: string;
  chapter?: string;
  text?: string;
  source_id?: string;
  confidence?: number;
}

export interface ChatRequest {
  question: string;
  conversation_id?: string | null;
}

export interface ChatResponse {
  answer: string;
  conversation_id?: string | null;
  sources?: Source[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: Source[];
  isError?: boolean;
}

export interface ConversationSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export type AppStage = 'landing' | 'transitioning' | 'chat';

export type RealmMode = 'dream' | 'waking';
