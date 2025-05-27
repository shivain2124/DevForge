// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import path from 'path';

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react({ babel: {plugins: ['babel-plugin-styled-components'] }}), tailwindcss(),],
  
// })

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [
//     react(),  // Removed the babel configuration
//     tailwindcss()
//   ],
//   build: {
//     outDir: 'dist',
//     sourcemap: false,
//     rollupOptions: {
//       output: {
//         manualChunks: undefined
//       }
//     }
//   }
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
})
