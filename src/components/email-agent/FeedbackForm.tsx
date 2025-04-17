
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { EmailLog } from "@/lib/types";

interface FeedbackFormProps {
  email: EmailLog;
  onFeedbackSubmitted: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ email, onFeedbackSubmitted }) => {
  const [rating, setRating] = useState<number | undefined>(email.user_rating);
  const [feedback, setFeedback] = useState<string>(email.user_feedback || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // In a real implementation, this would update the data in Supabase
      // const { error } = await supabase
      //   .from('email_logs')
      //   .update({ user_rating: rating, user_feedback: feedback })
      //   .eq('id', email.id);
      
      // For now, we'll just simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback!",
      });
      
      onFeedbackSubmitted();
    } catch (error) {
      toast({
        title: "Error submitting feedback",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array(5).fill(0).map((_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => setRating(i + 1)}
        className="focus:outline-none"
      >
        <Star
          size={20}
          className={`${i < (rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} cursor-pointer`}
        />
      </button>
    ));
  };

  if (!expanded && !email.user_rating) {
    return (
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setExpanded(true)}
        className="text-xs text-muted-foreground hover:text-foreground"
      >
        Was this reply helpful?
      </Button>
    );
  }

  return (
    <div className="space-y-3 border-t pt-3 mt-3">
      <div className="space-y-2">
        <p className="text-sm font-medium">Was this reply helpful?</p>
        <div className="flex items-center gap-1">
          {renderStars()}
        </div>
      </div>
      
      {(rating !== undefined || email.user_rating) && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Anything we could improve?</p>
          <Textarea
            placeholder="Share your thoughts..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="resize-none h-24"
            disabled={isSubmitting}
          />
          
          <div className="flex justify-end">
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={isSubmitting || rating === undefined}
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
