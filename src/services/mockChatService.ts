import { ChatRequest, ChatResponse } from '../types/chat';
import { queryLoreDatabase } from '../data/loreKnowledge';

/**
 * Isolated Mock Chat Service for Nightmare Spell.
 * Simulates asynchronous retrieval and returns lore-accurate demonstration
 * responses with novel citations for "Memories Unearthed".
 */
export async function sendMockChatMessage(request: ChatRequest): Promise<ChatResponse> {
  // Simulate atmospheric retrieval latency
  await new Promise((resolve) => setTimeout(resolve, 1100));

  const result = queryLoreDatabase(request.question);

  return {
    answer: result.answer,
    conversation_id: request.conversation_id || `conv_${Date.now()}`,
    sources: result.sources,
  };
}
