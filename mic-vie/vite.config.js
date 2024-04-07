import { defineConfig } from 'vite'
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'
import { VITE_PORT } from './conifg/constant';
import { configManualChunk } from './conifg/vite/optimizer';
import commonjs from 'rollup-plugin-commonjs';
import externalGlobals from 'rollup-plugin-external-globals';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  const isBuild = command === 'build';
  return {
    // 生产环境需要在域名基础上加上bea
	base: isBuild ? '/vie' : '/',
    server: {
			// hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
			// 服务配置
			port: VITE_PORT, // 类型： number 指定服务器端口;
			open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
			cors: {
				origin: '*',
				'Access-Control-Allow-Origin': '*',
			}, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
			host: '0.0.0.0', // IP配置，支持从IP启动
			// https: true,
			// proxy,
		},
    resolve: {
			// 设置别名
			alias: [
				{ find: '~', replacement: resolve(__dirname, './') },
				{ find: '@', replacement: resolve(__dirname, './src') },
			],
			extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs'],
		},

    plugins: [vue()],
    build: {
			target: 'es2015',
			rollupOptions: {
				plugins: [
					commonjs(),
					externalGlobals({
						// vue: 'Vue',
						// moment: "moment",
						// "eui-plus": "eui-plus",
						// "micro-app": "micro-app",
					}),
				],
				output: {
					chunkFileNames: 'static/js/[name]-[hash].js',
					entryFileNames: 'static/js/[name]-[hash].js',
					assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
					manualChunks: configManualChunk,
				},
			},
			// Turning off brotliSize display can slightly reduce packaging time
			// brotliSize: false,
			chunkSizeWarningLimit: 2000,
			minify: 'terser',
			terserOptions: {
				compress: {
					//生产环境时移除console
					drop_console: true,
					drop_debugger: true,
				},
			},
		},
  }
  // if (command === 'serve') {
  //   return {
  //     // dev specific config
  //   }
  // } else {
  //   // command === 'build'
  //   return {
  //     // build specific config
  //   }
  // }
})