import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { 'react-native': 'react-native-web' } },
  build: { rollupOptions: { input: `${root}showcase/ui-kit.html` } }
});
