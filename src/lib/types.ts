export type AgentType = 'voice' | 'email' | 'sms' | 'workflow';

export type VoiceAgentType = 'voiceChat' | 'aiReceptionist' | 'outboundAI' | 'virtualSE';

export type LLMModelProvider = 'OpenAI' | 'Anthropic' | 'Meta' | 'DeepSeek' | 'Mistral';

export type LLMModelVersion = {
  id: string;
  name: string;
  provider: LLMModelProvider;
};

export type STTProvider = 'OpenAI Whisper' | 'Deepgram' | 'AssemblyAI' | 'Rev AI';
export type TTSProvider = 'ElevenLabs' | 'Google DeepMind' | 'Seed-TTS';
export type VoiceProvider = 'ElevenLabs' | 'Deepgram' | 'Cartesia' | 'Murf AI';

export type AgentTone = 'professionalDirect' | 'professionalAffable' | 'conversational';

export interface VoiceAgentConfig {
  agentType: VoiceAgentType;
  modelProvider: LLMModelProvider;
  modelVersion: string;
  sttProvider: STTProvider;
  ttsProvider: TTSProvider;
  voiceProvider: VoiceProvider;
  agentName: string;
  agentFunction: string;
  agentTone: AgentTone[];
  promptDetails: string;
  knowledgeBase: File[] | null;
}

export interface AgentRenderingState {
  isRendering: boolean;
  progress: number;
  status: string;
  isComplete: boolean;
  error: string | null;
}

export interface AutoReplyAnalysis {
  intent: 'simple_inquiry' | 'general_request' | 'complaint' | 'urgent_request' | 'other';
  complexity: number;
  confidence: number;
  autoReplyRecommended: boolean;
  reasoning: string;
}

export interface EmailLog {
  id: string;
  agent_id: string;
  gmail_message_id: string;
  from_address: string;
  subject: string;
  raw_body: string;
  ai_reply?: string;
  status: 'received' | 'awaiting_approval' | 'replied' | 'rejected';
  created_at: string;
  user_rating?: number;
  user_feedback?: string;
  auto_reply_analysis?: AutoReplyAnalysis;
}
