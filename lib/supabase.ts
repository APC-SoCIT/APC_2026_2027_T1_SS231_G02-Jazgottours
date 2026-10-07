import { createClient } from '@supabase/supabase-js';

// Safe fallbacks prevent hard server crashes if environment variables aren't loaded instantly by the runner
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ahvfnuwdglbohtxwmrfc.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFodmZudXdkZ2xib2h0eHdtcmZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1NzY4ODEsImV4cCI6MjEwMzE1Mjg4MX0.F6vljBSLGHoNFL1D5gRjkj--0s3EF2epzjb6YOa7G7s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);