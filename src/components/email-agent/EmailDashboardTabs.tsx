
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import EmailLogs from './EmailLogs';
import EmailAnalytics from './EmailAnalytics';
import FineTuningExport from './FineTuningExport';
import ErrorMonitoring from './ErrorMonitoring';
import PromptSettings from './PromptSettings';

interface EmailDashboardTabsProps {
  agentId?: string;
  onBack?: () => void; // Made optional with default implementation
}

const EmailDashboardTabs: React.FC<EmailDashboardTabsProps> = ({ agentId, onBack = () => window.history.back() }) => {
  const [activeTab, setActiveTab] = useState<string>("inbox");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-1">
          <ArrowLeft size={16} />
          Back to Agent Setup
        </Button>
      </div>

      <Tabs defaultValue="inbox" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="inbox">Inbox Dashboard</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="training">Model Training</TabsTrigger>
          <TabsTrigger value="prompts">Prompt Settings</TabsTrigger>
          <TabsTrigger value="errors">Error Monitoring</TabsTrigger>
        </TabsList>
        <TabsContent value="inbox" className="mt-6">
          <EmailLogs agentId={agentId} onBack={onBack} />
        </TabsContent>
        <TabsContent value="analytics" className="mt-6">
          <EmailAnalytics agentId={agentId} />
        </TabsContent>
        <TabsContent value="training" className="mt-6">
          <FineTuningExport agentId={agentId} />
        </TabsContent>
        <TabsContent value="prompts" className="mt-6">
          <PromptSettings agentId={agentId} />
        </TabsContent>
        <TabsContent value="errors" className="mt-6">
          <ErrorMonitoring agentId={agentId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailDashboardTabs;
