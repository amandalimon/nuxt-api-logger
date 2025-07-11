import { defineNuxtPlugin, useFetch, useRuntimeConfig } from "#app";
import type { NitroFetchOptions } from "nitropack";
import { useApiLogger } from "#imports";
import { watch } from "vue";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public.apiLogger;
  if (!config?.enabled) return;

  const { logRequest } = useApiLogger();

  const log = (
    url: string,
    method: string,
    success: boolean,
    start: number,
    error?: unknown
  ) => {
    logRequest({
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      url,
      method,
      success,
      error,
      duration: config.showPerformance ? performance.now() - start : undefined,
    });
  };

  if (config.autoTrack?.includes("$fetch")) {
    const originalFetch = globalThis.$fetch;
    globalThis.$fetch = Object.assign(
      async (url: string, options?: NitroFetchOptions<string>) => {
        const start = performance.now();
        try {
          const res = await originalFetch(url, options);
          log(url, options?.method || "GET", true, start);
          return res;
        } catch (error) {
          log(url, options?.method || "GET", false, start, error);
          throw error;
        }
      },
      originalFetch
    );
  }

  if (config.autoTrack?.includes("useFetch")) {
    const originalUseFetch = useFetch;
    (globalThis as any).useFetch = ((...args) => {
      const start = performance.now();
      const result = originalUseFetch(...args);

      watch(result.pending, (isPending) => {
        if (!isPending) {
          log(
            String(args[0]),
            "GET",
            !result.error.value,
            start,
            result.error.value
          );
        }
      });

      return result;
    }) as typeof useFetch;
  }
});
