/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_ASSETS_CDN: string
	readonly VITE_IMG_CDN: string
}
/* eslint-disable-next-line */
interface ImportMeta {
	readonly env: ImportMetaEnv
}
