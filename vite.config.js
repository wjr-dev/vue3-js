// import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default ({ command }) => {
  return {
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock', // 指定 mock 数据文件夹路径
        supportTs: false, // 启用 ts
        // command === serve: 由开发服务器调用的插件
        // command === build: 由 Rollup 调用的插件
        localEnabled: command === 'serve',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      proxy: {
        '/sdss': {
          target: 'http://localhost:64368',
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/sdss/, ''),
        },
      },
    },
  }
}
