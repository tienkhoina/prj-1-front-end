import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/admin/',  // Đặt base path cho ứng dụng admin
  build: {
    outDir: '../../dist/admin',  // Đảm bảo output vào thư mục chính dưới /dist/admin
    rollupOptions: {
      input: {
        main: './src/main.jsx',  // Entry point của ứng dụng admin
      },
      output: {
        // Đảm bảo các tệp output vào thư mục đúng
        dir: '../../dist/admin',  // Đặt thư mục output cho ứng dụng admin
        manualChunks: {
          admin: ['./src/main.jsx'],  // Chia chunk cho admin
        },
      },
    },
  },
});
