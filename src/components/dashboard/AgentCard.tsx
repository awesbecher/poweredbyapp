
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AgentType } from "@/lib/types";
import { 
  Headphones, 
  Mail, 
  MessageSquare, 
  GitBranch,
  Info,
  ChevronRight
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

export type AgentTag = 'Voice' | 'Email' | 'SMS' | 'Web' | 'Workflow';

interface AgentCardProps {
  name: string;
  description: string;
  agentType: AgentType;
  tags: AgentTag[];
  progress?: number;
  icon?: React.ReactNode;
  isActive: boolean;
  onConfigure: () => void;
}

const getAgentIcon = (type: AgentType) => {
  switch (type) {
    case 'voice':
      return <Headphones size={24} />;
    case 'email':
      return <Mail size={24} />;
    case 'sms':
      return <MessageSquare size={24} />;
    case 'workflow':
      return <GitBranch size={24} />;
    default:
      return <span className="text-2xl">😎</span>;
  }
};

const getTagColor = (tag: AgentTag) => {
  switch (tag) {
    case 'Voice':
      return 'bg-purple-100 text-purple-800';
    case 'Email':
      return 'bg-blue-100 text-blue-800';
    case 'SMS':
      return 'bg-green-100 text-green-800';
    case 'Web':
      return 'bg-amber-100 text-amber-800';
    case 'Workflow':
      return 'bg-rose-100 text-rose-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const AgentCard: React.FC<AgentCardProps> = ({
  name,
  description,
  agentType,
  tags,
  progress,
  icon,
  isActive,
  onConfigure,
}) => {
  const navigate = useNavigate();
  
  const handleLearnMore = () => {
    // This would navigate to a details page in the future
    console.log(`Learn more about ${name}`);
  };

  return (
    <Card className={`overflow-hidden transition-all duration-200 hover:translate-y-[-4px] hover:scale-[1.02] hover:shadow-2xl ${!isActive ? 'opacity-70' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 shadow-inner">
              <div className="absolute inset-0.5 rounded-full bg-white flex items-center justify-center">
                {icon || getAgentIcon(agentType)}
              </div>
            </div>
            <h3 className="text-xl font-semibold">{name}</h3>
          </div>
          
          {!isActive && (
            <Badge variant="outline" className="bg-gray-100 text-gray-800">
              Coming Soon
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="py-2">
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map(tag => (
            <Badge key={tag} className={`${getTagColor(tag)}`}>
              {tag}
            </Badge>
          ))}
        </div>
        
        {progress !== undefined && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-muted-foreground">Setup Progress</span>
              <span className="text-xs font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1" />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between gap-2 pt-4">
        <Button
          variant="default"
          className="flex-1 bg-primary hover:bg-primary/90"
          onClick={onConfigure}
          disabled={!isActive}
        >
          Configure
          <ChevronRight size={16} />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={handleLearnMore}
          disabled={!isActive}
        >
          <Info size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;
