import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

})



// To avoid cors issue 
  //   server:{
  //        proxy: {
  //     "/api": {
  //       target: 'https://blog-backend-ten-psi.vercel.app/',
  //       changeOrigin: true,
  //       secure: false
  //     }
  //   }
  // }