
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { AgentFormValues } from '../AgentFormSchema';

interface BudgetSectionProps {
  form: UseFormReturn<AgentFormValues>;
}

const BudgetSection: React.FC<BudgetSectionProps> = ({ form }) => {
  const budgetOptions = [
    { label: "Under $2 K", value: "under2k" },
    { label: "$2 K–$10 K", value: "2k-10k" },
    { label: "$10 K–$50 K", value: "10k-50k" },
    { label: "Over $50 K", value: "over50k" },
  ];

  return (
    <FormField
      control={form.control}
      name="budget"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="uppercase text-sm text-white">What is your total project budget (USD)?</FormLabel>
          <FormControl>
            <div className="grid grid-cols-2 gap-2">
              {budgetOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => field.onChange(option.value)}
                  className={`p-2 border-2 rounded-md text-center text-sm ${field.value === option.value ? "bg-[#0062FF] text-white border-[#0062FF]" : "bg-black text-white border-[#DDD]"}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </FormControl>
          <FormMessage className="text-red-300" />
        </FormItem>
      )}
    />
  );
};

export default BudgetSection;
