import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({ exportAsDefault: true })],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src')},
      { find: '@components', replacement: path.resolve(__dirname, 'src/components')},
      { find: '@routes', replacement: path.resolve(__dirname, 'src/routes')},
      { find: '@apis', replacement: path.resolve(__dirname, 'src/apis')},
    ]
  }
})
