import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// TODO: Replace 'call-change-app' with your actual GitHub repo name
// e.g. if repo is github.com/yourname/conductor-trainer, set base: '/conductor-trainer/'
export default defineConfig({
  plugins: [react()],
  base: '/call-change-app/',
})
