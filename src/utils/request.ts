import axios, { AxiosRequestConfig } from 'axios'
import {Cookies} from '../utils/storage'

export interface ExpAxiosRequestConfig extends AxiosRequestConfig {
	loading?: any
	reqTime?: number
	loadingTime?: number
}

const instance = axios.create({})

/**
 *
 * @param {*} config 参考 axios 文档
 * @param {Number} timer 延迟时间（ms)，只有请求的事件超过该值时才会返回数据
 */
 const request = (config: ExpAxiosRequestConfig) => {
   return new Promise((resolve, reject) => {
      instance(config).then(async (response)=>{
         const res = response.data
         if(res.code!==0){
            reject(response || 'Error')
         }else{
            resolve(res)
         }
      }).catch((e)=>{
         reject(e)
      })
   })
 }

 export const setRequestApi = () => {
	instance.defaults.baseURL = '' //请求地址
}

export function setInterceptors() {
	let curLoading: { value: boolean }
	// 请求拦截器
	instance.interceptors.request.use(
		function (conf: ExpAxiosRequestConfig) {
			if (Cookies.get('token')) {
				(conf.headers as any).common['Token']  = Cookies.get('token')
			}
			// 实现页面的加载效果
			if (conf.loading) {
				conf.reqTime = new Date().getTime() // 存储一个发起请求的时间戳

				conf.loading.value = true // 将传入的 响应式数据loading 设为true
				curLoading = conf.loading // 将响应式的 loading 放入上一级作用域，方便后续使用
			}

			return conf
		},
		(error) => {
			// do something with request error
			return Promise.reject(error)
		}
	)
	// 响应拦截器
	instance.interceptors.response.use(
		(res) => {
			const {
				loading,
				loadingTime = 300, // 页面loading的最小时间（ms）
				reqTime,
			} = res.config as ExpAxiosRequestConfig

			// 结束页面的加载效果
			if (loading && reqTime) {
				const curTime = new Date().getTime() // 获取当前时间戳
				// debugger;
				// 用 loadingTime 减去 响应时间(curTime - reqTime) 可以计算出 页面还需要loading的时间
				const curLoadingTime = loadingTime - (curTime - reqTime)
				// 如果 curLoadingTime 为负数，则说明超出了 loadingTime，直接将 响应式数据loading 设为false，结束页面的加载效果
				setTimeout(() => {
					processTimeout(curLoadingTime, () => {
						loading.value = false
					})
				})

				return new Promise((resolve) => {
					processTimeout(curLoadingTime, () => {
						resolve(res)
					})
				})
			}

			return res

			function processTimeout(
				curLoadingTime: number | undefined,
				callback: { (): void; (): void; (): void }
			) {
				if (typeof curLoadingTime !== 'undefined' && curLoadingTime > 0) {
					setTimeout(() => {
						callback()
					}, curLoadingTime)
				} else {
					callback()
				}
			}
		},
		(err) => {
			curLoading &&
				setTimeout(() => {
					curLoading.value = false
				}, 500)
			return Promise.reject(err)
		}
	)
}

setRequestApi()
setInterceptors()
export default request