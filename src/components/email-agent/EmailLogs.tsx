
import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

interface Email {
  id: string;
  from_address: string;
  subject: string;
  created_at: string;
  status: 'received' | 'replied' | 'awaiting_approval';
}

interface EmailLogsProps {
  agentId?: string;
  onBack: () => void;
}

const EmailLogs: React.FC<EmailLogsProps> = ({ agentId, onBack }) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [pollingStatus, setPollingStatus] = useState<'active' | 'inactive'>('inactive');

  // This would be replaced with actual Supabase queries once integrated
  useEffect(() => {
    // Simulate loading emails
    setLoading(true);
    
    // Mock data for UI demonstration
    setTimeout(() => {
      setEmails([
        {
          id: '1',
          from_address: 'client@example.com',
          subject: 'Question about your services',
          created_at: new Date().toISOString(),
          status: 'received'
        },
        {
          id: '2',
          from_address: 'support@company.com',
          subject: 'Your recent inquiry',
          created_at: new Date(Date.now() - 3600000).toISOString(),
          status: 'replied'
        }
      ]);
      setLoading(false);
      setPollingStatus('active');
    }, 1500);
  }, [agentId]);

  const handleRefresh = () => {
    setLoading(true);
    toast({
      title: "Refreshing emails",
      description: "Manually checking for new emails...",
    });
    
    // This would trigger a manual check with the Gmail API
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Email check complete",
        description: "No new emails found",
      });
    }, 1500);
  };

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'received':
        return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/50';
      case 'replied':
        return 'bg-green-500/20 text-green-600 border-green-500/50';
      case 'awaiting_approval':
        return 'bg-blue-500/20 text-blue-600 border-blue-500/50';
      default:
        return 'bg-gray-500/20 text-gray-600 border-gray-500/50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-1">
          <ArrowLeft size={16} />
          Back to Agent Setup
        </Button>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs rounded-full ${pollingStatus === 'active' ? 
            'bg-green-500/20 text-green-600 border border-green-500/50' : 
            'bg-gray-500/20 text-gray-600 border border-gray-500/50'}`}>
            {pollingStatus === 'active' ? 'Polling Active' : 'Polling Inactive'}
          </span>
          <Button 
            size="sm" 
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Mail size={18} />
            Email Activity Log
          </CardTitle>
          <CardDescription>
            Monitoring inbox activity for your AI email agent
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse space-y-4 w-full">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          ) : emails.length > 0 ? (
            <div className="space-y-4">
              {emails.map((email, index) => (
                <div key={email.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{email.from_address}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(email.created_at).toLocaleString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full border ${getStatusBadgeClass(email.status)}`}>
                      {email.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{email.subject}</p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">View Details</Button>
                    {email.status === 'awaiting_approval' && (
                      <Button size="sm">Approve Reply</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Mail size={40} className="mx-auto mb-4 opacity-30" />
              <p>No emails have been processed yet</p>
              <p className="text-sm mt-1">
                The system will begin monitoring for new emails shortly
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-gray-50 flex flex-col items-start border-t">
          <div className="text-sm text-gray-600">
            <p>Background polling is running every 2-5 minutes</p>
            <p className="text-xs mt-1">
              Last check: {new Date().toLocaleString()}
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmailLogs;
