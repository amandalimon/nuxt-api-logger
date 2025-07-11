import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addComponentsDir,
  addImportsDir,
} from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "nuxt-api-logger",
    configKey: "apiLogger",
  },
  defaults: {
    enabled: process.env.NODE_ENV === "development",
    autoTrack: ["$fetch"],
    showPerformance: true,
    maxLogs: 1000,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    addPlugin(resolver.resolve("./runtime/plugins/logger.client"));

    addImportsDir(resolver.resolve("./runtime/composables"));

    addComponentsDir({
      path: resolver.resolve("./runtime/components"),
      prefix: "",
    });
  },
});
