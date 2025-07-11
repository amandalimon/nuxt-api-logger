import { ref } from "vue";
import { useRuntimeConfig } from "#app";
import type { ApiLogEntry } from "../types";

const logs = ref<ApiLogEntry[]>([]);

export function useApiLogger() {
  const pushLog = (info: ApiLogEntry) => {
    const config = useRuntimeConfig().public.apiLogger;
    logs.value.unshift({
      ...info,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toLocaleTimeString(),
    });
    logs.value = logs.value.slice(0, config?.maxLogs ?? 1000);
  };

  return {
    logs,
    logRequest: pushLog,
  };
}
