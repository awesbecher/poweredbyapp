
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Pencil } from 'lucide-react';
import { EmailLog } from "@/lib/types";
import FeedbackForm from './FeedbackForm';

interface EmailDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: EmailLog | null;
  getStatusBadgeClass: (status: string) => string;
  onApprove: (email: EmailLog) => void;
  onEdit: () => void;
  onReject: () => void;
}

const EmailDetailsDialog: React.FC<EmailDetailsDialogProps> = ({
  open,
  onOpenChange,
  email,
  getStatusBadgeClass,
  onApprove,
  onEdit,
  onReject
}) => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  if (!email) return null;

  const shouldShowFeedback = email.status === 'replied' && !feedbackSubmitted;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Email Details</DialogTitle>
          <DialogDescription>
            {email.subject}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="border-b pb-4">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h4 className="font-medium">From: {email.from_address}</h4>
                <p className="text-xs text-gray-500">
                  {new Date(email.created_at).toLocaleString()}
                </p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full border ${getStatusBadgeClass(email.status)}`}>
                {email.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <h4 className="font-medium mt-4 mb-2">Original Message:</h4>
            <p className="text-sm whitespace-pre-wrap bg-gray-50 p-3 rounded border">{email.raw_body}</p>
          </div>
          
          <div className="border-b pb-4">
            <h4 className="font-medium mb-2">AI Generated Reply:</h4>
            <div className="bg-muted p-4 rounded">
              <p className="text-sm whitespace-pre-wrap">{email.ai_reply}</p>
            </div>
            
            {shouldShowFeedback && (
              <FeedbackForm 
                email={email} 
                onFeedbackSubmitted={() => setFeedbackSubmitted(true)} 
              />
            )}
            
            {(email.user_rating !== undefined && !shouldShowFeedback) && (
              <div className="mt-3 p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-sm font-medium">Rating:</span>
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <Star
                        key={i}
                        filled={i < (email.user_rating || 0)}
                      />
                    ))}
                  </div>
                </div>
                {email.user_feedback && (
                  <div>
                    <span className="text-sm font-medium">Feedback:</span>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{email.user_feedback}</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {email.status === 'awaiting_approval' && (
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={onReject}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button 
                variant="outline" 
                onClick={onEdit}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button onClick={() => onApprove(email)}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve & Send
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Small helper component for star display
const Star: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={filled ? "text-yellow-400" : "text-gray-300"}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default EmailDetailsDialog;
