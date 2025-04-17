
import { AgentType, VoiceAgentType, LLMModelProvider, LLMModelVersion, STTProvider, TTSProvider, VoiceProvider, AgentTone } from '@/lib/types';

export interface EmailLog {
  id: string;
  agent_id: string;
  gmail_message_id: string;
  from_address: string;
  subject: string;
  raw_body: string;
  ai_reply?: string;
  status: 'received' | 'replied' | 'awaiting_approval' | 'rejected';
  created_at: string;
}

export type { AgentType, VoiceAgentType, LLMModelProvider, LLMModelVersion, STTProvider, TTSProvider, VoiceProvider, AgentTone };
