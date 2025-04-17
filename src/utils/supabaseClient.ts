
import { createClient } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

// Initialize Supabase client with proper error handling
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are defined
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are not defined!');
  console.log('Please create a .env file in the project root with the following variables:');
  console.log('VITE_SUPABASE_URL=your_supabase_project_url');
  console.log('VITE_SUPABASE_ANON_KEY=your_supabase_anon_key');
  
  // Only show toast if in browser environment
  if (typeof window !== 'undefined') {
    // Delay toast to ensure it's shown after UI is rendered
    setTimeout(() => {
      toast({
        title: "Missing Supabase Configuration",
        description: "Please add Supabase credentials to your .env file.",
        variant: "destructive",
      });
    }, 1000);
  }
}

// Initialize client only if variables are available
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper function to check if Supabase is properly initialized
export function checkSupabaseConnection() {
  if (!supabase) {
    throw new Error(
      'Supabase client is not initialized. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY ' +
      'are set in your .env file. For local development, create a .env file in the project root.'
    );
  }
  return true;
}
