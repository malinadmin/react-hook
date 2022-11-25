import jsCookie, { CookieAttributes } from 'js-cookie'

/**
 * jsCookie缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 */

export const TOKEN_NAME = 'Authorization'
export const Cookies = {
	// 设置cookie缓存
	set(key: string, val: any, expire: CookieAttributes = { expires: 30 }) {
		jsCookie.set(key, val, expire)
	},
	// 获取cookie缓存
	get(key: string = TOKEN_NAME) {
		return jsCookie.get(key)
	},
	// 移除cookie缓存
	remove(key: string = TOKEN_NAME, expire?: CookieAttributes) {
		jsCookie.remove(key, expire)
	},
}
