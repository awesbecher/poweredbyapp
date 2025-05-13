
import React, { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const ExitIntentModal = ({ isOpen, onClose }: ExitIntentModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success!",
        description: "Your AI agent audit request has been submitted. We'll be in touch soon!",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="p-1 text-center">
          <h3 className="text-2xl font-bold mb-2">Wait—Before You Go!</h3>
          <p className="text-gray-600 mb-6">Get a personalized AI agent audit for your business.</p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Your email address"
                        className="w-full p-3 border rounded-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-[#8B5CF6] hover:bg-[#7c4fee] text-white py-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Audit"}
              </Button>
            </form>
          </Form>
          
          <button 
            onClick={onClose}
            className="mt-4 text-sm text-gray-500 hover:text-gray-700"
          >
            No thanks, I'll continue browsing
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentModal;
