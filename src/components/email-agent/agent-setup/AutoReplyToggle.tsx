
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { FormValues } from './setupSchema';

interface AutoReplyToggleProps {
  form: UseFormReturn<FormValues>;
}

const AutoReplyToggle: React.FC<AutoReplyToggleProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="auto_reply"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <div className="space-y-0.5">
            <FormLabel>Auto-reply Mode</FormLabel>
            <div className="text-sm text-muted-foreground">
              Turn on to let the agent reply automatically without approval
            </div>
          </div>
          <FormControl>
            <div>
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="peer sr-only"
                />
                <div className="relative h-6 w-11 rounded-full bg-muted transition-colors peer-checked:bg-primary">
                  <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
                </div>
              </label>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default AutoReplyToggle;
