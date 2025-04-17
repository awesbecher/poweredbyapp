
export const getStatusBadgeClass = (status: string) => {
  switch(status) {
    case 'received':
      return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/50';
    case 'replied':
      return 'bg-green-500/20 text-green-600 border-green-500/50';
    case 'awaiting_approval':
      return 'bg-blue-500/20 text-blue-600 border-blue-500/50';
    case 'rejected':
      return 'bg-red-500/20 text-red-600 border-red-500/50';
    default:
      return 'bg-gray-500/20 text-gray-600 border-gray-500/50';
  }
};
