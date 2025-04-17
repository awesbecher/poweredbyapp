
import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, Mail, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { EmailLog } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface EmailLogsProps {
  agentId?: string;
  onBack: () => void;
}

const EmailLogs: React.FC<EmailLogsProps> = ({ agentId, onBack }) => {
  const [emails, setEmails] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState<EmailLog | null>(null);
  const [pollingStatus, setPollingStatus] = useState<'active' | 'inactive'>('inactive');
  const [showReplyDialog, setShowReplyDialog] = useState(false);

  // This would be replaced with actual Supabase queries once integrated
  useEffect(() => {
    // Simulate loading emails
    setLoading(true);
    
    // Mock data for UI demonstration
    setTimeout(() => {
      setEmails([
        {
          id: '1',
          agent_id: agentId || '',
          gmail_message_id: 'msg1',
          from_address: 'client@example.com',
          subject: 'Question about your services',
          raw_body: 'Hello, I was wondering if you offer consulting services for small businesses?',
          ai_reply: 'Thank you for reaching out! Yes, we do offer consulting services tailored specifically for small businesses. Our packages start at $500/month and include weekly strategy calls and monthly reports. Would you like to schedule a discovery call to discuss your specific needs?',
          status: 'awaiting_approval',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          agent_id: agentId || '',
          gmail_message_id: 'msg2',
          from_address: 'support@company.com',
          subject: 'Your recent inquiry',
          raw_body: 'We received your message and wanted to follow up. Can you provide more details?',
          ai_reply: 'I appreciate your follow-up. I\'ve reviewed our previous communication and would like to provide the additional details you requested. Our company specializes in...',
          status: 'replied',
          created_at: new Date(Date.now() - 3600000).toISOString()
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

  const handleApproveReply = (email: EmailLog) => {
    // In a real implementation, this would call the /generate-reply function
    setLoading(true);
    toast({
      title: "Sending approved reply",
      description: "Your approved response is being sent...",
    });
    
    // Update status locally for demo
    setTimeout(() => {
      setEmails(emails.map(e => 
        e.id === email.id ? {...e, status: 'replied' as const} : e
      ));
      setLoading(false);
      setShowReplyDialog(false);
      toast({
        title: "Reply sent",
        description: "Your response has been sent successfully",
      });
    }, 1500);
  };

  const handleRejectReply = (email: EmailLog) => {
    // In a real implementation, this would reject the reply and possibly trigger a new generation
    toast({
      title: "Reply rejected",
      description: "You'll need to manually respond to this email",
    });
    setShowReplyDialog(false);
  };

  const viewEmailDetails = (email: EmailLog) => {
    setSelectedEmail(email);
    setShowReplyDialog(true);
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
              {emails.map((email) => (
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
                    <Button size="sm" variant="outline" onClick={() => viewEmailDetails(email)}>View Details</Button>
                    {email.status === 'awaiting_approval' && (
                      <Button size="sm" onClick={() => viewEmailDetails(email)}>Approve Reply</Button>
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

      {/* Email Details Dialog */}
      <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Email Details</DialogTitle>
            <DialogDescription>
              {selectedEmail?.subject}
            </DialogDescription>
          </DialogHeader>
          
          {selectedEmail && (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-medium">From: {selectedEmail.from_address}</h4>
                    <p className="text-xs text-gray-500">
                      {new Date(selectedEmail.created_at).toLocaleString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full border ${getStatusBadgeClass(selectedEmail.status)}`}>
                    {selectedEmail.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <p className="text-sm mt-2 whitespace-pre-wrap">{selectedEmail.raw_body}</p>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="font-medium mb-2">AI Generated Reply:</h4>
                <div className="bg-muted p-4 rounded">
                  <p className="text-sm whitespace-pre-wrap">{selectedEmail.ai_reply}</p>
                </div>
              </div>
              
              {selectedEmail.status === 'awaiting_approval' && (
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => handleRejectReply(selectedEmail)}>
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject Reply
                  </Button>
                  <Button onClick={() => handleApproveReply(selectedEmail)}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve & Send
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailLogs;
