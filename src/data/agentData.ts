
import { Headphones, Mail, MessageSquare } from 'lucide-react';
import { AgentStatus } from '@/components/dashboard/AgentStatusDot';
import { AgentTag } from '@/components/dashboard/AgentCard';
import { AgentType } from '@/lib/types';

export interface AgentCardData {
  id: string;
  name: string;
  description: string;
  agentType: AgentType;
  tags: AgentTag[];
  progress?: number;
  icon: string; // Changed from React.ReactNode to string to avoid JSX
  isActive: boolean;
  isFavorite?: boolean;
  status?: AgentStatus;
}

// Using string identifiers for icons instead of JSX
export const agentData: AgentCardData[] = [
  {
    id: 'voice-agent',
    name: 'Voice Agent',
    description: '24/7 human-sounding calls',
    agentType: 'voice',
    tags: ['Voice'],
    progress: undefined,
    icon: 'headphones',
    isActive: true,
    status: 'running'
  },
  {
    id: 'email-agent',
    name: 'Email Agent',
    description: 'Inbox zero, on autopilot',
    agentType: 'email',
    tags: ['Email'],
    progress: 60,
    icon: 'mail',
    isActive: true,
    status: 'warning'
  },
  {
    id: 'sms-agent',
    name: 'SMS Agent',
    description: 'Instant text replies that close deals',
    agentType: 'sms',
    tags: ['SMS'],
    progress: 25,
    icon: 'message-square',
    isActive: true,
    status: 'idle'
  },
  {
    id: 'receptionist-agent',
    name: 'Receptionist',
    description: 'Never miss a call again',
    agentType: 'voice',
    tags: ['Voice'],
    icon: 'headphones',
    isActive: true,
    status: 'running'
  }
];

export const releaseNotes = [
  {
    id: 'release-1',
    date: 'April 2025',
    title: 'Slack alerts & webhooks now live',
    description: 'You can now configure Slack alerts for agent events and set up webhooks to integrate with your existing tools.'
  },
  {
    id: 'release-2',
    date: 'March 2025',
    title: 'Custom voice profiles',
    description: 'Create and customize your agent voice profiles with our new voice editor.'
  },
  {
    id: 'release-3',
    date: 'February 2025',
    title: 'Advanced analytics dashboard',
    description: 'Track your agent performance with our new analytics dashboard featuring detailed metrics and insights.'
  }
];
