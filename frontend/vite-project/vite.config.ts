import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  server:{
    host:'0.0.0.0',
    cors:true,
    open:true
  },
  plugins: [react()],
  resolve: {
    alias:[
      {
        find:'@',
        replacement:path.resolve('./src')
      }
    ]
  },

  //单元测试
  test:{
    environment:'jsdom',
    globals:true,
  }

})


