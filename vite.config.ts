import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createStyleImportPlugin } from 'vite-plugin-style-import'
import { resolve } from 'path'

const pathResolve = (dir: string): any => {
	return resolve(__dirname, '.', dir)
}
const alias: Record<string, string> = {
	'/@': pathResolve('/src/'),
	'@': pathResolve('/src/'),
}
// https://vitejs.dev/config/
export default defineConfig({
	resolve: { alias },
	plugins: [
		react(),
		createStyleImportPlugin({
			// libs: [
			// 	{
			// 		libraryName: 'zarm',
			// 		esModule: true,
			// 		resolveStyle: (name) => {
			// 			return `zarm/es/${name}/style/css`
			// 		},
			// 	},
			// ],
		}),
	],
	server: {
		host: '0.0.0.0',
	},
	css: {
		modules: {
			localsConvention: 'dashesOnly',
		},
		preprocessorOptions: {
			less: {
				// 支持内联 JavaScript
				javascriptEnabled: true,
			},
		},
	},
})
