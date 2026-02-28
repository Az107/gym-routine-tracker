import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
// src/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

// Singleton
let supabaseInstance: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return supabaseInstance;
}

// También puedes exportar directamente si prefieres estilo default:
export const supabase = getSupabaseClient();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
