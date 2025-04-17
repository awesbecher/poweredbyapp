
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EmailLog } from "@/types";

interface EditReplyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: EmailLog | null;
  editedReply: string;
  onEditChange: (value: string) => void;
  onSave: () => void;
}

const EditReplyDialog: React.FC<EditReplyDialogProps> = ({
  open,
  onOpenChange,
  email,
  editedReply,
  onEditChange,
  onSave
}) => {
  if (!email) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Reply</DialogTitle>
          <DialogDescription>
            Make changes to the AI-generated reply before sending
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h4 className="font-medium mb-2">Original Message:</h4>
            <p className="text-sm whitespace-pre-wrap bg-gray-50 p-3 rounded border">{email.raw_body}</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Your Reply:</h4>
            <Textarea 
              className="min-h-[200px]"
              value={editedReply} 
              onChange={(e) => onEditChange(e.target.value)}
              placeholder="Edit the reply..."
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={onSave}>Send Edited Reply</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditReplyDialog;
