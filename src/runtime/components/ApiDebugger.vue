<template>
  <ClientOnly>
    <div class="api-debugger">
      <div class="debugger-header">
        <div class="header-left">
          <div class="debugger-icon">🔍</div>
          <h3 class="debugger-title">API Debugger</h3>
          <div class="status-badge" :class="{ 'status-active': isActive }">
            {{ logs.length }} requests
          </div>
        </div>
        <div class="header-controls">
          <button @click="logs = []" class="btn-clear" title="Clear logs">
            <span class="icon">🗑️</span>
          </button>
          <button
            @click="isMinimized = !isMinimized"
            class="btn-minimize"
            title="Minimize"
          >
            <span class="icon">{{ isMinimized ? "▲" : "▼" }}</span>
          </button>
        </div>
      </div>

      <div class="logs-container" v-show="!isMinimized">
        <div class="logs-list">
          <div v-for="log in logs" :key="log.id" class="log-entry">
            <div class="log-main">
              <div class="log-method" :class="getMethodClass(log.method)">
                {{ log.method || "FETCH" }}
              </div>
              <div class="log-url">
                <code>{{ log.url }}</code>
              </div>
              <div class="log-status">
                <span
                  class="status-icon"
                  :class="{ success: log.success, error: !log.success }"
                >
                  {{ log.success ? "✅" : "❌" }}
                </span>
                <small
                  v-if="log.duration && config.showPerformance"
                  class="duration"
                >
                  ⏱ {{ log.duration }}ms
                </small>
              </div>
            </div>
            <div class="log-timestamp">
              {{ log.timestamp }}
            </div>
          </div>
        </div>

        <div v-if="logs.length === 0" class="empty-state">
          <p>No API calls detected.</p>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
const { logs } = useApiLogger();
const config = useRuntimeConfig().public.apiLogger;
const isActive = computed(() => logs.value.length > 0);

const isMinimized = ref(false);

const getMethodClass = (method) => {
  const methodMap = {
    GET: "method-get",
    POST: "method-post",
    PUT: "method-put",
    DELETE: "method-delete",
    PATCH: "method-patch",
  };
  return methodMap[method] || "method-default";
};
</script>

<style scoped>
.api-debugger {
  position: fixed;
  bottom: 0;
  left: 0;
  background: #1a1a2e;
  color: #e2e8f0;
  font-family: "Consolas", monospace;
  font-size: 13px;
  width: 100%;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.3);
  border-top: 1px solid #334155;
  backdrop-filter: blur(10px);
  z-index: 9999;
}

.debugger-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #334155;
  background: #1a1a2e;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.debugger-icon {
  font-size: 16px;
  filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.5));
}

.debugger-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #f1f5f9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.status-badge {
  background: #374151;
  color: #9ca3af;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.status-badge.status-active {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.header-controls {
  display: flex;
  gap: 8px;
}

.btn-clear,
.btn-minimize {
  background: rgba(55, 65, 81, 0.8);
  border: 1px solid #4b5563;
  color: #9ca3af;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  font-size: 12px;
}

.logs-container {
  max-height: 40vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #4b5563 #1f2937;
}

.logs-container::-webkit-scrollbar {
  width: 6px;
}

.logs-container::-webkit-scrollbar-track {
  background: #1f2937;
}

.logs-container::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 3px;
}

.logs-container::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

.logs-list {
  padding: 8px 0;
}

.log-entry {
  padding: 8px 16px;
  border-bottom: 1px solid rgba(51, 65, 85, 0.3);
  transition: all 0.2s ease;
}

.log-entry:hover {
  background: rgba(30, 41, 59, 0.4);
}

.log-entry:last-child {
  border-bottom: none;
}

.log-main {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
}

.log-method {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-width: 50px;
  text-align: center;
}

.method-get {
  background: #065f46;
  color: #6ee7b7;
}

.method-post {
  background: #1e3a8a;
  color: #93c5fd;
}

.method-put {
  background: #92400e;
  color: #fbbf24;
}

.method-delete {
  background: #7f1d1d;
  color: #fca5a5;
}

.method-patch {
  background: #581c87;
  color: #d8b4fe;
}

.method-default {
  background: #374151;
  color: #9ca3af;
}

.log-url {
  flex: 1;
  min-width: 0;
}

.log-url code {
  background: rgba(15, 23, 42, 0.6);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #cbd5e1;
  word-break: break-all;
  border: 1px solid rgba(51, 65, 85, 0.3);
}

.log-status {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-icon {
  font-size: 14px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
}

.duration {
  color: #94a3b8;
  font-size: 11px;
  font-weight: 500;
}

.log-timestamp {
  font-size: 10px;
  color: #64748b;
  margin-left: 62px;
}

.empty-state {
  text-align: center;
  padding: 32px 16px;
  color: #64748b;
}

.empty-icon {
  font-size: 32px;
  margin-bottom: 8px;
  opacity: 0.7;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}

@media (max-width: 768px) {
  .api-debugger {
    font-size: 11px;
  }

  .log-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .log-url {
    width: 100%;
  }

  .log-timestamp {
    margin-left: 0;
  }
}
</style>
