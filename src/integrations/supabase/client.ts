
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://maopalmposehziorjybx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hb3BhbG1wb3NlaHppb3JqeWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4NTQ2NDksImV4cCI6MjA2MDQzMDY0OX0.D8NlRxBvz0uzg9C18rKXbgPZvGQ_h0_tIRSAnexOSaU";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
