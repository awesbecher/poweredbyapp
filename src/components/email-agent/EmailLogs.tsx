import React, { useState, useEffect } from 'react';
import { RefreshCw, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { EmailLog } from "@/lib/types";
import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import EmailListItem from './EmailListItem';
import EmailDetailsDialog from './EmailDetailsDialog';
import EditReplyDialog from './EditReplyDialog';
import RejectConfirmDialog from './RejectConfirmDialog';
import { getStatusBadgeClass } from './emailUtils';

interface EmailLogsProps {
  agentId?: string;
  onBack: () => void;
}

const EmailLogs: React.FC<EmailLogsProps> = ({ agentId, onBack }) => {
  const [emails, setEmails] = useState<EmailLog[]>([]);
  const [filteredEmails, setFilteredEmails] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState<EmailLog | null>(null);
  const [editedReply, setEditedReply] = useState("");
  const [pollingStatus, setPollingStatus] = useState<'active' | 'inactive'>('inactive');
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    setLoading(true);
    
    const mockEmails: EmailLog[] = [
      {
        id: '1',
        agent_id: agentId || '',
        gmail_message_id: 'msg1',
        from_address: 'user@example.com',
        subject: 'Need help logging in',
        raw_body: "Hi, I'm having trouble accessing my account. Can you help me reset my password?",
        ai_reply: "I understand you're having trouble accessing your account. I'd be happy to help you reset your password. You can follow these steps:\n\n1. Visit our login page\n2. Click on 'Forgot Password'\n3. Enter your email address\n4. Follow the instructions in the reset email\n\nIf you don't receive the reset email within a few minutes, please check your spam folder. Let me know if you need any additional assistance!",
        status: 'replied',
        created_at: new Date().toISOString(),
        auto_reply_analysis: {
          intent: 'simple_inquiry',
          complexity: 2,
          confidence: 95,
          autoReplyRecommended: true,
          reasoning: 'Standard password reset request with clear solution path'
        }
      },
      {
        id: '2',
        agent_id: agentId || '',
        gmail_message_id: 'msg2',
        from_address: 'business@company.com',
        subject: 'Question about pricing tiers',
        raw_body: 'Can you explain the difference between the Starter and Pro plans?',
        ai_reply: "Thank you for your interest in our pricing plans. Let me break down the key differences between our Starter and Pro tiers:\n\nStarter Plan ($29/month):\n- Up to 5 team members\n- Basic analytics\n- Standard support\n- Core features\n\nPro Plan ($79/month):\n- Unlimited team members\n- Advanced analytics\n- Priority support\n- All core features\n- Custom integrations\n- API access\n\nWould you like to schedule a demo to see the Pro features in action? I'd be happy to arrange that for you.",
        status: 'awaiting_approval',
        created_at: new Date(Date.now() - 3600000).toISOString(),
        auto_reply_analysis: {
          intent: 'general_request',
          complexity: 5,
          confidence: 85,
          autoReplyRecommended: false,
          reasoning: 'Pricing inquiry may need human verification for accuracy'
        }
      },
      {
        id: '3',
        agent_id: agentId || '',
        gmail_message_id: 'msg3',
        from_address: 'unhappy@client.com',
        subject: 'Very disappointed with the service',
        raw_body: "I was expecting better results. I want a refund or I'm canceling.",
        ai_reply: "I sincerely apologize for not meeting your expectations. I understand your frustration and would like to help address your concerns. I've flagged this for immediate attention from our customer success team, and they will be reaching out to you personally within the next few hours to discuss your experience and find the best resolution.\n\nIn the meantime, could you please share more specific details about what aspects of our service didn't meet your expectations? This will help us better prepare for our discussion and ensure we can properly address all your concerns.\n\nThank you for bringing this to our attention. We value your feedback and are committed to making this right.",
        status: 'awaiting_approval',
        created_at: new Date(Date.now() - 1800000).toISOString(),
        auto_reply_analysis: {
          intent: 'complaint',
          complexity: 8,
          confidence: 60,
          autoReplyRecommended: false,
          reasoning: 'High-stakes situation requiring human review and personalized attention'
        }
      },
      {
        id: '4',
        agent_id: agentId || '',
        gmail_message_id: 'msg4',
        from_address: 'integration@startup.com',
        subject: 'Do you offer integrations with Slack?',
        raw_body: "I'd love to connect your product with our Slack workspace. Is that possible?",
        ai_reply: "Thanks for your interest in Slack integration! Yes, we do offer Slack integration with our Pro and Enterprise plans. The integration allows you to:\n\n- Receive notifications in your Slack channels\n- Share updates directly from our platform\n- Use Slack commands to interact with our service\n\nWould you like me to send you our integration guide or connect you with our integration team for a detailed walkthrough?",
        status: 'awaiting_approval',
        created_at: new Date(Date.now() - 7200000).toISOString(),
        auto_reply_analysis: {
          intent: 'general_request',
          complexity: 4,
          confidence: 90,
          autoReplyRecommended: true,
          reasoning: 'Feature availability confirmation with clear documentation'
        }
      }
    ];
    
    setEmails(mockEmails);
    setFilteredEmails(mockEmails);
    setLoading(false);
    setPollingStatus('active');
  }, [agentId]);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredEmails(emails);
    } else {
      setFilteredEmails(emails.filter(email => email.status === statusFilter));
    }
  }, [statusFilter, emails]);

  const handleRefresh = () => {
    setLoading(true);
    toast({
      title: "Refreshing emails",
      description: "Manually checking for new emails...",
    });
    
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Email check complete",
        description: "No new emails found",
      });
    }, 1500);
  };

  const handleApproveReply = (email: EmailLog) => {
    setLoading(true);
    toast({
      title: "Sending approved reply",
      description: "Your approved response is being sent...",
    });
    
    setTimeout(() => {
      setEmails(emails.map(e => 
        e.id === email.id ? {...e, status: 'replied' as const} : e
      ));
      setLoading(false);
      setShowViewDialog(false);
      toast({
        title: "Reply sent",
        description: "Your response has been sent successfully",
      });
    }, 1500);
  };

  const handleRejectReply = () => {
    if (!selectedEmail) return;
    
    setLoading(true);
    toast({
      title: "Rejecting reply",
      description: "Updating status...",
    });
    
    setTimeout(() => {
      setEmails(emails.map(e => 
        e.id === selectedEmail.id ? {...e, status: 'rejected' as const} : e
      ));
      setLoading(false);
      setShowRejectDialog(false);
      setShowViewDialog(false);
      toast({
        title: "Reply rejected",
        description: "The AI generated reply has been rejected",
      });
    }, 1000);
  };

  const handleEditReply = () => {
    if (!selectedEmail) return;
    setEditedReply(selectedEmail.ai_reply || "");
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (!selectedEmail) return;
    
    setLoading(true);
    toast({
      title: "Sending edited reply",
      description: "Your edited response is being sent...",
    });
    
    setTimeout(() => {
      setEmails(emails.map(e => 
        e.id === selectedEmail.id ? {...e, ai_reply: editedReply, status: 'replied' as const} : e
      ));
      setLoading(false);
      setShowEditDialog(false);
      setShowViewDialog(false);
      toast({
        title: "Edited reply sent",
        description: "Your edited response has been sent successfully",
      });
    }, 1500);
  };

  const viewEmailDetails = (email: EmailLog) => {
    setSelectedEmail(email);
    setShowViewDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
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
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Mail size={18} />
                Agent Inbox Dashboard
              </CardTitle>
              <CardDescription>
                Review and manage AI-generated email replies
              </CardDescription>
            </div>
            <div>
              <select
                className="block w-full p-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="received">Received</option>
                <option value="awaiting_approval">Awaiting Approval</option>
                <option value="replied">Replied</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="animate-pulse space-y-4 w-full">
              <div className="h-10 bg-gray-200 rounded w-full"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
          ) : filteredEmails.length > 0 ? (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>From</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Received</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmails.map((email) => (
                    <EmailListItem
                      key={email.id}
                      email={email}
                      getStatusBadgeClass={getStatusBadgeClass}
                      onViewDetails={viewEmailDetails}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Mail size={40} className="mx-auto mb-4 opacity-30" />
              <p>No emails matching the selected filter</p>
              <p className="text-sm mt-1">
                Try a different filter or check back later
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

      <EmailDetailsDialog
        open={showViewDialog}
        onOpenChange={setShowViewDialog}
        email={selectedEmail}
        getStatusBadgeClass={getStatusBadgeClass}
        onApprove={handleApproveReply}
        onEdit={handleEditReply}
        onReject={() => setShowRejectDialog(true)}
      />

      <EditReplyDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        email={selectedEmail}
        editedReply={editedReply}
        onEditChange={setEditedReply}
        onSave={handleSaveEdit}
      />

      <RejectConfirmDialog
        open={showRejectDialog}
        onOpenChange={setShowRejectDialog}
        onConfirm={handleRejectReply}
      />
    </div>
  );
};

export default EmailLogs;
