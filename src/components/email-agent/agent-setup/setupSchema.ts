
import * as z from 'zod';

// Define tone options
export const toneOptions = [
  { value: 'friendly', label: 'Friendly' },
  { value: 'professional', label: 'Professional' },
  { value: 'witty', label: 'Witty' },
  { value: 'formal', label: 'Formal' },
];

// Define form schema
export const formSchema = z.object({
  company_name: z.string().min(2, { message: 'Company name is required' }),
  agent_email: z.string().email({ message: 'Valid email address is required' }),
  purpose: z.string().min(10, { message: 'Purpose must be at least 10 characters' }),
  tone: z.string({ required_error: 'Please select a tone' }),
  auto_reply: z.boolean().default(false),
  files: z.any().optional(),
});

export type FormValues = z.infer<typeof formSchema>;
