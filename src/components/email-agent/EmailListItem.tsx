
import React from 'react';
import { Button } from "@/components/ui/button";
import { EmailLog } from "@/lib/types";

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
        {email.user_rating && (
          <span className="ml-2 inline-flex items-center">
            <span className="text-xs font-medium">{email.user_rating}/5</span>
            <svg 
              className="h-3 w-3 ml-0.5 text-yellow-400 fill-current" 
              viewBox="0 0 24 24"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </span>
        )}
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
