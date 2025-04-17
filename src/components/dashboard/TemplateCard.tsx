
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, ArrowRight } from 'lucide-react';

export interface AgentTemplateData {
  id: string;
  name: string;
  description: string;
  tags: string[];
  image: string;
}

interface TemplateCardProps {
  template: AgentTemplateData;
  onUseTemplate: (templateId: string) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onUseTemplate }) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:translate-y-[-4px] hover:scale-[1.02] hover:shadow-xl flex flex-col min-w-[260px] max-w-xs">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{template.name}</h3>
        </div>
      </CardHeader>
      
      <CardContent className="py-2 flex-1">
        <div className="rounded-md overflow-hidden mb-3 h-28 bg-slate-100">
          <img 
            src={template.image} 
            alt={template.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {template.tags.map(tag => (
            <Badge key={tag} variant="outline" className="bg-slate-100 text-slate-800">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-4">
        <Button
          variant="default"
          className="w-full"
          onClick={() => onUseTemplate(template.id)}
        >
          <Copy size={16} className="mr-1" />
          Use Template
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
