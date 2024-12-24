import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',  // Đặt base cho cả ứng dụng chính và admin
  build: {
    outDir: 'dist',  // Đặt thư mục output cho ứng dụng
    rollupOptions: {
      output: {
        dir: 'dist', // Thư mục build chung cho cả ứng dụng chính và admin
      },
    },
  },
});
