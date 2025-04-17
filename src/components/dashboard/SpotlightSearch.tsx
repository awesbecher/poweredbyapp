
import React, { useEffect, useState } from 'react';
import { 
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command';
import { Search, Bot, FileText, HelpCircle } from 'lucide-react';

interface SpotlightSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock search results
const mockAgents = [
  { id: 'a1', name: 'Voice Agent', type: 'voice' },
  { id: 'a2', name: 'Email Agent', type: 'email' },
  { id: 'a3', name: 'SMS Agent', type: 'sms' },
];

const mockDocs = [
  { id: 'd1', title: 'Getting Started Guide', url: '/docs/getting-started' },
  { id: 'd2', title: 'API Documentation', url: '/docs/api' },
];

const mockHelp = [
  { id: 'h1', title: 'How to create a voice agent', url: '/help/voice-agent' },
  { id: 'h2', title: 'Troubleshooting connection issues', url: '/help/troubleshooting' },
];

const SpotlightSearch: React.FC<SpotlightSearchProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // This would be handled by parent component opening the search
        }
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isOpen, onClose]);

  const handleSelect = (value: string) => {
    console.log('Selected:', value);
    onClose();
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose} className="backdrop-blur-md bg-white/90 dark:bg-slate-900/90">
      <CommandInput placeholder="Search for agents, docs, or help..." />
      <CommandList>
        <CommandEmpty>No results found</CommandEmpty>
        
        <CommandGroup heading="Agents">
          {mockAgents.map((agent) => (
            <CommandItem 
              key={agent.id} 
              value={`agent-${agent.id}`}
              onSelect={() => handleSelect(`agent-${agent.id}`)}
            >
              <Bot className="mr-2 h-4 w-4" />
              <span>{agent.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Documentation">
          {mockDocs.map((doc) => (
            <CommandItem 
              key={doc.id} 
              value={`doc-${doc.id}`}
              onSelect={() => handleSelect(`doc-${doc.id}`)}
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>{doc.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Help Articles">
          {mockHelp.map((help) => (
            <CommandItem 
              key={help.id} 
              value={`help-${help.id}`}
              onSelect={() => handleSelect(`help-${help.id}`)}
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>{help.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SpotlightSearch;
