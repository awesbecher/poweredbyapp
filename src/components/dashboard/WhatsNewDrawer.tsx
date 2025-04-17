
import React from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

interface ReleaseNote {
  id: string;
  date: string;
  title: string;
  description: string;
}

interface WhatsNewDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  releaseNotes: ReleaseNote[];
}

const WhatsNewDrawer: React.FC<WhatsNewDrawerProps> = ({
  open,
  onOpenChange,
  releaseNotes,
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>What's New</SheetTitle>
          <SheetDescription>
            Latest updates and improvements to the platform
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        <div className="space-y-6">
          {releaseNotes.map((note) => (
            <div key={note.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{note.title}</h3>
                <span className="text-sm text-muted-foreground">{note.date}</span>
              </div>
              <p className="text-sm text-muted-foreground">{note.description}</p>
              <Separator className="mt-4" />
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default WhatsNewDrawer;
