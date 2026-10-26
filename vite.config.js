import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Segovia_landing/', // 👈 Asegúrate de que coincida exactamente con el nombre de tu repo
});
