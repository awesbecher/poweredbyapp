
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { toast } from '@/hooks/use-toast';

export interface AgentData {
  id: string;
  company_name: string;
  agent_email: string;
  purpose: string;
  tone: string;
  auto_reply: boolean;
  fileCount?: number;
  fileNames?: string[];
  knowledgeFiles?: any[];
  created_at?: string;
}

export function useAgentData(agentId?: string | null) {
  const [agentData, setAgentData] = useState<AgentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (agentId) {
      fetchAgentById(agentId);
    }
  }, [agentId]);

  const fetchAgentById = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Get agent data
      const { data: agent, error } = await supabase
        .from('agents')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(`Agent not found: ${error.message}`);
      }

      // Get knowledge files
      const { data: files } = await supabase
        .from('knowledgebase_files')
        .select('*')
        .eq('agent_id', id);

      const completeAgentData = {
        ...agent,
        fileCount: files?.length || 0,
        fileNames: files?.map(file => file.file_name) || [],
        knowledgeFiles: files || []
      };

      setAgentData(completeAgentData);
    } catch (error: any) {
      console.error('Error fetching agent:', error);
      setError(error.message || 'Failed to load agent');
      toast({
        title: 'Error',
        description: error.message || 'Failed to load agent',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { agentData, isLoading, error, fetchAgentById };
}
