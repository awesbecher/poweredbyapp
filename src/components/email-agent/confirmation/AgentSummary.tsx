
import React from 'react';

interface AgentSummaryProps {
  company_name: string;
  agent_email: string;
  tone: string;
  auto_reply: boolean;
}

const AgentSummary: React.FC<AgentSummaryProps> = ({ 
  company_name, 
  agent_email, 
  tone, 
  auto_reply 
}) => {
  return (
    <div className="border rounded-md p-4 bg-muted/30 mt-8">
      <h3 className="text-sm font-medium mb-2">Agent Summary</h3>
      <ul className="space-y-2 text-sm">
        <li><span className="font-medium">Company:</span> {company_name}</li>
        <li><span className="font-medium">Email:</span> {agent_email}</li>
        <li><span className="font-medium">Tone:</span> {tone}</li>
        <li><span className="font-medium">Auto-reply:</span> {auto_reply ? 'Enabled' : 'Requires Approval'}</li>
      </ul>
    </div>
  );
};

export default AgentSummary;
