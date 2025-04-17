
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmptyState: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-64 h-64 mb-8">
        <img 
          src="/lovable-uploads/4c21c24d-5233-426f-8687-7dd9096c0e64.png" 
          alt="Empty state illustration" 
          className="w-full h-full object-contain"
        />
      </div>
      
      <h2 className="text-2xl font-bold mb-2">No agents yet</h2>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        Start by creating your first AI agent. Once configured, your agent will help automate tasks and enhance your workflow.
      </p>
      
      <Button 
        size="lg" 
        onClick={() => navigate('/voice-agent')}
        className="flex items-center gap-2"
      >
        <Plus size={18} />
        <span>Let's build your first agent</span>
      </Button>
    </div>
  );
};

export default EmptyState;
