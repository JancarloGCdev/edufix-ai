import { createClient } from "@supabase/supabase-js";

// Credenciales públicas de Supabase para cliente (URL y Anon Key)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qtqczcybiwdfkxtvhctt.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0cWN6Y3liaXdkZmt4dHZoY3R0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4ODQ4MDAsImV4cCI6MjAyNTQ2MDgwMH0.mock_key_edufix";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});
