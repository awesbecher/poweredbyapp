
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  VoiceAgentConfig, 
  AgentRenderingState,
  LLMModelProvider,
  VoiceAgentType,
  STTProvider,
  TTSProvider,
  VoiceProvider,
  AgentTone
} from './types';

const defaultVoiceConfig: VoiceAgentConfig = {
  agentType: 'voiceChat',
  modelProvider: 'OpenAI',
  modelVersion: '',
  sttProvider: 'OpenAI Whisper',
  ttsProvider: 'ElevenLabs',
  voiceProvider: 'ElevenLabs',
  agentName: '',
  agentFunction: '',
  agentTone: [],
  promptDetails: '',
  knowledgeBase: null
};

const defaultRenderingState: AgentRenderingState = {
  isRendering: false,
  progress: 0,
  status: '',
  isComplete: false,
  error: null
};

interface StoreState {
  voiceAgentConfig: VoiceAgentConfig;
  renderingState: AgentRenderingState;
  updateVoiceConfig: (
    updates: Partial<VoiceAgentConfig>
  ) => void;
  resetVoiceConfig: () => void;
  startRendering: () => void;
  updateRenderingProgress: (progress: number, status: string) => void;
  completeRendering: () => void;
  setRenderingError: (error: string) => void;
  resetRenderingState: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      voiceAgentConfig: { ...defaultVoiceConfig },
      renderingState: { ...defaultRenderingState },
      
      updateVoiceConfig: (updates) =>
        set((state) => ({
          voiceAgentConfig: { ...state.voiceAgentConfig, ...updates },
        })),
      
      resetVoiceConfig: () =>
        set(() => ({
          voiceAgentConfig: { ...defaultVoiceConfig },
        })),
      
      startRendering: () =>
        set(() => ({
          renderingState: {
            isRendering: true,
            progress: 0,
            status: 'Initializing...',
            isComplete: false,
            error: null,
          },
        })),
      
      updateRenderingProgress: (progress, status) =>
        set(() => ({
          renderingState: {
            isRendering: true,
            progress,
            status,
            isComplete: false,
            error: null,
          },
        })),
      
      completeRendering: () =>
        set(() => ({
          renderingState: {
            isRendering: false,
            progress: 100,
            status: 'Complete',
            isComplete: true,
            error: null,
          },
        })),
      
      setRenderingError: (error) =>
        set(() => ({
          renderingState: {
            isRendering: false,
            progress: 0,
            status: 'Error',
            isComplete: false,
            error,
          },
        })),
      
      resetRenderingState: () =>
        set(() => ({
          renderingState: { ...defaultRenderingState },
        })),
    }),
    {
      name: 'agent-config-storage',
    }
  )
);

// Model mapping data
export const modelVersionsByProvider: Record<LLMModelProvider, { id: string, name: string }[]> = {
  'OpenAI': [
    { id: 'gpt-4o', name: 'GPT-4o' },
    { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' },
    { id: 'gpt-4', name: 'GPT-4' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' }
  ],
  'Anthropic': [
    { id: 'claude-3-opus', name: 'Claude 3 Opus' },
    { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet' },
    { id: 'claude-3-haiku', name: 'Claude 3 Haiku' },
    { id: 'claude-2', name: 'Claude 2' }
  ],
  'Meta': [
    { id: 'llama-3-70b', name: 'Llama 3 70B' },
    { id: 'llama-3-8b', name: 'Llama 3 8B' },
    { id: 'llama-2-70b', name: 'Llama 2 70B' }
  ],
  'DeepSeek': [
    { id: 'deepseek-coder', name: 'DeepSeek Coder' },
    { id: 'deepseek-llm', name: 'DeepSeek LLM' }
  ],
  'Mistral': [
    { id: 'mistral-large', name: 'Mistral Large' },
    { id: 'mistral-medium', name: 'Mistral Medium' },
    { id: 'mistral-small', name: 'Mistral Small' }
  ]
};

export const voiceAgentTypeOptions = [
  { value: 'voiceChat', label: 'Voice Chat' },
  { value: 'aiReceptionist', label: 'AI Receptionist' },
  { value: 'outboundAI', label: 'OutboundAI' },
  { value: 'virtualSE', label: 'Virtual SE' }
];

export const sttProviderOptions = [
  { value: 'OpenAI Whisper', label: 'OpenAI Whisper' },
  { value: 'Deepgram', label: 'Deepgram' },
  { value: 'AssemblyAI', label: 'AssemblyAI' },
  { value: 'Rev AI', label: 'Rev AI' }
];

export const ttsProviderOptions = [
  { value: 'ElevenLabs', label: 'ElevenLabs' },
  { value: 'Google DeepMind', label: 'Google DeepMind' },
  { value: 'Seed-TTS', label: 'Seed-TTS' }
];

export const voiceProviderOptions = [
  { value: 'ElevenLabs', label: 'ElevenLabs' },
  { value: 'Deepgram', label: 'Deepgram' },
  { value: 'Cartesia', label: 'Cartesia' },
  { value: 'Murf AI', label: 'Murf AI' }
];

export const agentToneOptions = [
  { value: 'professionalDirect', label: 'Professional & Direct' },
  { value: 'professionalAffable', label: 'Professional & Affable' },
  { value: 'conversational', label: 'Conversational' }
];
