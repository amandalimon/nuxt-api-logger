declare module "nuxt/schema" {
  interface PublicRuntimeConfig {
    apiLogger?: {
      enabled?: boolean;
      autoTrack?: ("$fetch" | "useFetch")[];
      showPerformance?: boolean;
      maxLogs?: number;
    };
  }
}

export interface ApiLogEntry {
  id: string;
  url: string;
  method?: string;
  success: boolean;
  error?: unknown;
  duration?: number;
  timestamp?: string;
  source?: string;
} 