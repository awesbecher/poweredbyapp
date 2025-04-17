
import React from 'react';
import { Button } from "@/components/ui/button";
import { EmailLog } from "@/types";

interface EmailListItemProps {
  email: EmailLog;
  getStatusBadgeClass: (status: string) => string;
  onViewDetails: (email: EmailLog) => void;
}

const EmailListItem: React.FC<EmailListItemProps> = ({ 
  email,
  getStatusBadgeClass,
  onViewDetails
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <tr>
      <td className="font-medium">{email.from_address}</td>
      <td>{email.subject}</td>
      <td>{formatDate(email.created_at)}</td>
      <td>
        <span className={`px-2 py-1 text-xs rounded-full border ${getStatusBadgeClass(email.status)}`}>
          {email.status.replace('_', ' ').toUpperCase()}
        </span>
      </td>
      <td>
        <Button size="sm" variant="outline" onClick={() => onViewDetails(email)}>
          View
        </Button>
      </td>
    </tr>
  );
};

export default EmailListItem;
