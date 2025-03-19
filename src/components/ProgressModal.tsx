
import React, { useEffect } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressModalProps {
  isOpen: boolean;
  progress: number;
  status: string;
  isComplete: boolean;
  error: string | null;
  onClose: () => void;
}

const ProgressModal: React.FC<ProgressModalProps> = ({
  isOpen,
  progress,
  status,
  isComplete,
  error,
  onClose,
}) => {
  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        onClose();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isComplete, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md p-6 rounded-xl bg-background shadow-lg animate-scale-in">
        <div className="flex flex-col items-center text-center">
          {error ? (
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <span className="text-2xl">!</span>
            </div>
          ) : isComplete ? (
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-green-100 text-green-600">
              <Check size={32} />
            </div>
          ) : (
            <div className="w-16 h-16 mb-4 flex items-center justify-center">
              <Loader2 size={40} className="animate-spin text-brand-blue" />
            </div>
          )}
          
          <h3 className="text-xl font-medium mb-2">
            {error 
              ? 'Error' 
              : isComplete 
                ? 'Voice Agent Created!' 
                : 'Creating Your Voice Agent'}
          </h3>
          
          <p className="text-muted-foreground mb-6">
            {error 
              ? error 
              : isComplete 
                ? 'Your agent is ready to use.' 
                : status}
          </p>
          
          {!error && !isComplete && (
            <div className="w-full bg-secondary rounded-full h-2.5 mb-4">
              <div
                className="bg-brand-blue h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          
          {(error || isComplete) && (
            <button
              className="px-5 py-2.5 bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark transition-colors"
              onClick={onClose}
            >
              {error ? 'Try Again' : 'Continue'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressModal;
