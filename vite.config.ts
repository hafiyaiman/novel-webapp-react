import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: true, // Allow access from external devices
    port: 5173, // Ensure it's running on the correct port
    allowedHosts: ['.ngrok-free.app'], // Allow all ngrok subdomains
    strictPort: true,
  }
})
