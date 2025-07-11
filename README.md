# Nuxt API Logger

Debug your `$fetch` and `useFetch` API requests in development with a built-in logger UI component.

## 🛠 Installation

### 1. Link the module locally

In the `nuxt-api-logger` project:

```bash
npm link
```

Make sure you have this in your `package.json`:

```json
"scripts": {
  "dev": "nuxt dev",
  "build": "nuxt build",
  "link": "npm link"
}
```

### 2. Link the module into your Nuxt app

In your Nuxt app:

```bash
npm run link-module
```

Make sure your `package.json` includes:

```json
"scripts": {
  "dev": "nuxt dev",
  "build": "nuxt build",
  "link-module": "npm link nuxt-api-logger"
}
```

## ⚙️ Configuration

In your `nuxt.config.ts`, enable the module and configure its options:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-api-logger"],
  runtimeConfig: {
    public: {
      apiLogger: {
        enabled: true,
        autoTrack: ["$fetch", "useFetch"],
        showPerformance: true,
        maxLogs: 10,
      },
    },
  },
});
```

## 🧩 Usage

Add the `<ApiDebugger />` component to your app, e.g. in `App.vue`:

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
    <ApiDebugger />
  </NuxtLayout>
</template>
```

## ✅ Features

- Tracks `$fetch` and/or `useFetch` calls
- Logs method, duration, success/failure, and errors
- Limits log history (`maxLogs`)
- Includes a UI debugger component: `<ApiDebugger />`
