
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, ArrowLeft, Github } from 'lucide-react';
import Header from '@/components/Header';
import Button from '@/components/Button';
import { useStore } from '@/lib/store';
import { toast } from 'sonner';

const ReviewAgent = () => {
  const navigate = useNavigate();
  const { voiceAgentConfig } = useStore();
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const handleSpeakClick = () => {
    setIsSpeaking(true);
    
    // Simulate speaking for demonstration
    toast.info('Microphone activated. Speak to the agent.');
    
    // Simulate a response after 3 seconds
    setTimeout(() => {
      toast.success('Agent is responding...');
      
      // End the conversation after 5 more seconds
      setTimeout(() => {
        setIsSpeaking(false);
        toast.info('Voice session ended.');
      }, 5000);
    }, 3000);
  };
  
  const handleEditClick = () => {
    navigate('/voice-agent');
  };
  
  const handlePublishClick = () => {
    toast.success('Publishing agent to GitHub...');
    
    // Simulate publishing process
    setTimeout(() => {
      toast.success('Agent successfully published to GitHub!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        showBackButton 
        title="Review Voice Agent Draft" 
        rightElement={
          <Button
            variant="primary"
            leftIcon={<Github size={18} />}
            onClick={handlePublishClick}
          >
            Publish Agent
          </Button>
        }
      />
      
      <main className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl border border-border shadow-sm p-8 mb-8">
            <div className="mb-8">
              <h2 className="text-3xl font-medium mb-2">
                {voiceAgentConfig.agentName || 'My Voice Agent'}
              </h2>
              <p className="text-muted-foreground">
                {voiceAgentConfig.agentFunction || 'A voice-enabled AI assistant'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Agent Configuration</h3>
                  <div className="bg-secondary rounded-lg p-4 space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Agent Type:</span>
                      <p className="font-medium">{getReadableValue(voiceAgentConfig.agentType)}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Model:</span>
                      <p className="font-medium">{voiceAgentConfig.modelProvider} - {getModelName(voiceAgentConfig.modelVersion)}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Speech-to-Text:</span>
                      <p className="font-medium">{voiceAgentConfig.sttProvider}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Text-to-Speech:</span>
                      <p className="font-medium">{voiceAgentConfig.ttsProvider}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Voice Provider:</span>
                      <p className="font-medium">{voiceAgentConfig.voiceProvider}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Agent Tone</h3>
                  <div className="flex flex-wrap gap-2">
                    {voiceAgentConfig.agentTone.length > 0 ? (
                      voiceAgentConfig.agentTone.map((tone) => (
                        <span 
                          key={tone}
                          className="px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full text-sm"
                        >
                          {getToneLabel(tone)}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">No tone specified</span>
                    )}
                  </div>
                </div>
                
                {voiceAgentConfig.knowledgeBase && voiceAgentConfig.knowledgeBase.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Knowledge Base</h3>
                    <div className="bg-secondary rounded-lg p-4">
                      <p className="text-sm">{voiceAgentConfig.knowledgeBase.length} file(s) uploaded</p>
                      <ul className="mt-2 space-y-1">
                        {voiceAgentConfig.knowledgeBase.map((file, index) => (
                          <li key={index} className="text-sm truncate">{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Prompt Details</h3>
                <div className="bg-secondary rounded-lg p-4 h-[300px] overflow-y-auto">
                  <p className="whitespace-pre-line">
                    {voiceAgentConfig.promptDetails || 'No detailed prompt provided.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-12">
            <Button
              variant="outline"
              size="lg"
              leftIcon={<ArrowLeft size={18} />}
              onClick={handleEditClick}
              className="md:order-1"
            >
              Edit Voice Agent
            </Button>
            
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Mic size={18} />}
              onClick={handleSpeakClick}
              isLoading={isSpeaking}
              className="md:order-2"
            >
              Speak to Voice Agent
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper functions
const getReadableValue = (value: string): string => {
  return value
    .replace(/([A-Z])/g, ' $1') // Insert a space before all caps
    .replace(/^./, (str) => str.toUpperCase()); // Uppercase the first character
};

const getModelName = (modelId: string): string => {
  // This would normally look up the model name from a mapping
  // For simplicity, we'll just return the ID if no mapping exists
  return modelId;
};

const getToneLabel = (tone: string): string => {
  const toneMap: Record<string, string> = {
    professionalDirect: 'Professional & Direct',
    professionalAffable: 'Professional & Affable',
    conversational: 'Conversational'
  };
  
  return toneMap[tone] || tone;
};

export default ReviewAgent;
