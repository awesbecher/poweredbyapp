
import { createClient } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

const supabaseUrl = "https://maopalmposehziorjybx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hb3BhbG1wb3NlaHppb3JqeWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4NTQ2NDksImV4cCI6MjA2MDQzMDY0OX0.D8NlRxBvz0uzg9C18rKXbgPZvGQ_h0_tIRSAnexOSaU";

// Always create the client, removing the null check
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function checkSupabaseConnection() {
  if (!supabase) {
    console.error('Supabase client failed to initialize');
    toast({
      title: "Supabase Connection Error",
      description: "Failed to connect to Supabase. Please check your configuration.",
      variant: "destructive"
    });
    return false;
  }
  return true;
}
