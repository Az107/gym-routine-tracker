import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
// src/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

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

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      console.warn("No se pudo guardar en localStorage", key);
    }
  }, [key, state]);

  return [state, setState] as const;
}
