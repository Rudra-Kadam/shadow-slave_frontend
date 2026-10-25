import { ChatRequest, ChatResponse } from '../types/chat';
import { sendMockChatMessage } from './mockChatService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const isLiveApiConfigured = Boolean(API_BASE_URL && API_BASE_URL.trim() !== '');

/**
 * Chat service interface designed for seamless integration with the future Python RAG backend.
 * Contract:
 * POST /api/chat
 * Payload: { question: string, conversation_id: string | null }
 * Response: { answer: string, conversation_id?: string | null, sources?: Array<{ title?: string; chapter?: string; text?: string; }> }
 */
export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
  if (!isLiveApiConfigured) {
    return sendMockChatMessage(request);
  }

  const endpoint = `${API_BASE_URL.replace(/\/$/, '')}/api/chat`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: request.question,
        conversation_id: request.conversation_id || null,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => '');
      throw new Error(
        `Spell communion severed (${res.status}): ${errorText || res.statusText || 'Unknown gateway anomaly'}`
      );
    }

    const data = (await res.json()) as ChatResponse;
    return {
      answer: data.answer,
      conversation_id: data.conversation_id || request.conversation_id || null,
      sources: data.sources || [],
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('A rupture in the Dream Realm prevented the Spell from answering.');
  }
}
