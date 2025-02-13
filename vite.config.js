import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5100,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:11434',  // Pointing to your Ollama server
        changeOrigin: true,
        // Don't rewrite since the endpoint already starts with /api
        rewrite: (path) => path
      }
    }
  }
})
