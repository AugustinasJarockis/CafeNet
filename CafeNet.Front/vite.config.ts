import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173, // Vite dev server port
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:7153', // Backend server URL
        changeOrigin: true,
        secure: false, // Set to true if using HTTPS with valid certificates
        // Remove the rewrite to maintain the '/api' prefix
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
