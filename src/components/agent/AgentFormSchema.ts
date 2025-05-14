
import { z } from 'zod';

// Form schema with validation
export const formSchema = z.object({
  projectDescription: z.string().min(1, "Please describe your project"),
  budget: z.enum(["under2k", "2k-10k", "10k-50k", "over50k"], {
    required_error: "Please select a budget range",
  }),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
});

export type AgentFormValues = z.infer<typeof formSchema>;
