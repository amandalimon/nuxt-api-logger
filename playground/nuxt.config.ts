export default defineNuxtConfig({
  modules: ["../src/module"],
  runtimeConfig: {
    public: {
      apiLogger: {
        enabled: true,
        autoTrack: ["useFetch", "$fetch"],
        showPerformance: true,
        maxLogs: 10,
      },
    },
  },
  devtools: { enabled: true },
});
