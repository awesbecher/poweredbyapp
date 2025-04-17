
import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { EmailLog } from "@/types";
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

  // This would be replaced with actual Supabase queries once integrated
  useEffect(() => {
    // Simulate loading emails
    setLoading(true);
    
    // Mock data for UI demonstration
    setTimeout(() => {
      const mockEmails: EmailLog[] = [
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
          ai_reply: "I appreciate your follow-up. I have reviewed our previous communication and would like to provide the additional details you requested. Our company specializes in digital marketing and web development services for small to medium businesses.",
          status: 'replied',
          created_at: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: '3',
          agent_id: agentId || '',
          gmail_message_id: 'msg3',
          from_address: 'potential@client.com',
          subject: 'Pricing information needed',
          raw_body: 'Could you send me your pricing sheet for SEO services? I need it for my budget planning.',
          ai_reply: "Thank you for your interest in our SEO services. I'd be happy to share our pricing information. Our SEO packages range from $800-$2500/month depending on the scope and competitiveness of your industry. I've attached our detailed pricing sheet to this email for your budget planning. Would you like to schedule a call to discuss which package might be best for your specific needs?",
          status: 'awaiting_approval',
          created_at: new Date(Date.now() - 1800000).toISOString()
        },
        {
          id: '4',
          agent_id: agentId || '',
          gmail_message_id: 'msg4',
          from_address: 'existing@customer.com',
          subject: 'Technical support needed',
          raw_body: 'The website is down again. Can someone look into this ASAP?',
          ai_reply: "I'm sorry to hear about the website issue. I've immediately notified our technical team, and they'll investigate the problem right away. We understand the urgency of this matter and will prioritize getting your site back online. Could you please provide any error messages you're seeing or the approximate time when you first noticed the site was down? This will help our team diagnose the issue faster.",
          status: 'awaiting_approval',
          created_at: new Date(Date.now() - 7200000).toISOString()
        }
      ];
      
      setEmails(mockEmails);
      setFilteredEmails(mockEmails);
      setLoading(false);
      setPollingStatus('active');
    }, 1500);
  }, [agentId]);

  // Apply status filter
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
    // In a real implementation, this would call the /send-reply function
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
      setShowViewDialog(false);
      toast({
        title: "Reply sent",
        description: "Your response has been sent successfully",
      });
    }, 1500);
  };

  const handleRejectReply = () => {
    if (!selectedEmail) return;
    
    // In a real implementation, this would update the status in Supabase
    setLoading(true);
    toast({
      title: "Rejecting reply",
      description: "Updating status...",
    });
    
    // Update status locally for demo
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
    
    // In a real implementation, this would call the /send-reply function with edited text
    setLoading(true);
    toast({
      title: "Sending edited reply",
      description: "Your edited response is being sent...",
    });
    
    // Update locally for demo
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

      {/* Email Details Dialog */}
      <EmailDetailsDialog
        open={showViewDialog}
        onOpenChange={setShowViewDialog}
        email={selectedEmail}
        getStatusBadgeClass={getStatusBadgeClass}
        onApprove={handleApproveReply}
        onEdit={handleEditReply}
        onReject={() => setShowRejectDialog(true)}
      />

      {/* Edit Reply Dialog */}
      <EditReplyDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        email={selectedEmail}
        editedReply={editedReply}
        onEditChange={setEditedReply}
        onSave={handleSaveEdit}
      />

      {/* Reject Confirmation Dialog */}
      <RejectConfirmDialog
        open={showRejectDialog}
        onOpenChange={setShowRejectDialog}
        onConfirm={handleRejectReply}
      />
    </div>
  );
};

export default EmailLogs;
