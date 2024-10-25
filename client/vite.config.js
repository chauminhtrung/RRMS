import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: {},
  },
  plugins: [
    react(),
    visualizer({
      open: true,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Room Rental Management System',
        short_name: 'RRMS',
        description: 'My Progressive Web App',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/assets/house.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/house.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB
      },
    }),
  ],
  resolve: {
    alias: [{ find: '~', replacement: '/src' }],
  },
})
