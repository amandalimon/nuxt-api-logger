<template>
  <div class="playground-container">
    <header class="header">
      <h1>API Logger Playground!</h1>
      <p class="subtitle">Test your API endpoints with useFetch and $fetch</p>
    </header>

    <div class="main-content">
      <div class="input-card">
        <label for="api-url" class="input-label">API Endpoint</label>
        <div class="input-wrapper">
          <input
            id="api-url"
            v-model="apiUrl"
            placeholder="Enter API URL (e.g., https://api.example.com/data)"
            class="api-input"
          />
          <div class="input-actions">
            <button
              @click="testUseFetch"
              :disabled="!apiUrl"
              class="btn btn-primary"
            >
              Test useFetch
            </button>
            <button
              @click="testFetch"
              :disabled="!apiUrl"
              class="btn btn-secondary"
            >
              Test $fetch
            </button>
          </div>
        </div>
      </div>

      <div class="results-grid">
        <div class="result-card">
          <div class="result-header">
            <h3>useFetch Result</h3>
            <span class="status-badge" :class="{ 'has-data': useFetchData }">
              {{ useFetchData ? "Loaded" : "Empty" }}
            </span>
          </div>
          <div v-if="useFetchData" class="json-display">
            <pre>{{ JSON.stringify(useFetchData, null, 2) }}</pre>
          </div>
          <div v-else class="empty-state">
            <p>No data yet. Click "Test useFetch" to see results.</p>
          </div>
        </div>

        <div class="result-card">
          <div class="result-header">
            <h3>$fetch Result</h3>
            <span class="status-badge" :class="{ 'has-data': fetchData }">
              {{ fetchData ? "Loaded" : "Empty" }}
            </span>
          </div>
          <div v-if="fetchData" class="json-display">
            <pre>{{ JSON.stringify(fetchData, null, 2) }}</pre>
          </div>
          <div v-else class="empty-state">
            <p>No data yet. Click "Test $fetch" to see results.</p>
          </div>
        </div>
      </div>
      <ApiDebugger />
    </div>
  </div>
</template>

<script setup>
const apiUrl = ref("https://pokeapi.co/api/v2/pokemon/wooloo");
const useFetchData = ref(null);
const fetchData = ref(null);

const testUseFetch = async () => {
  try {
    const { data } = await useFetch(apiUrl.value);
    useFetchData.value = data.value;
  } catch (error) {
    useFetchData.value = { error: error.message };
  }
};

const testFetch = async () => {
  try {
    fetchData.value = await $fetch(apiUrl.value);
  } catch (error) {
    fetchData.value = { error: error.message };
  }
};
</script>

<style scoped>
.playground-container {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.header h1 {
  font-size: 2.5rem;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
}

.input-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.input-label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #374151;
  font-size: 1rem;
}

.input-wrapper {
  display: flex;
  height: fit-content;
  gap: 1rem;
  align-items: flex-end;
  flex-wrap: wrap;
}

.api-input {
  flex: 1;
  min-width: 300px;
  padding: 0.7rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: #f9fafb;
}

.api-input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input-actions {
  display: flex;
  gap: 0.75rem;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  background: #324dc4;
  color: white;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
}

.btn-secondary {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  transform: translateY(-2px);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.results-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.result-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  overflow-x: auto;
}

.result-card:hover {
  transform: translateY(-4px);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f3f4f6;
}

.result-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: #f3f4f6;
  color: #6b7280;
}

.status-badge.has-data {
  background: #d1fae5;
  color: #065f46;
}

.json-display {
  height: 300px;
  overflow-y: auto;
  background: #1a1a2e;
  border-radius: 8px;
  padding: 1rem;
}

.json-display pre {
  font-family: "Consolas", monospace;
  font-size: 12px;
  color: #e2e8f0;
  margin: 0;
  line-height: 1.5;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #9ca3af;
  text-align: center;
}

.empty-state p {
  margin: 0;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .playground-container {
    padding: 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .input-wrapper {
    flex-direction: column;
    align-items: stretch;
  }

  .api-input {
    min-width: auto;
  }

  .input-actions {
    justify-content: center;
  }

  .results-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
