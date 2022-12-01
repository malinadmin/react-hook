import request from '@/utils/request'
import { Res } from '@/api/types/common'
import type { Types, BillList } from '../types/home'
//获取个人信息
export const getInfo = (loading?: boolean) => {
	return request({
		url: `/user/get_userinfo`,
		loading,
	}) as Promise<Res<string>>
}

//获取消费类型账单
export const getType = (loading?: boolean) => {
	return request({
		url: `/type/list`,
		loading,
	}) as Promise<Res<Types[]>>
}

//获取账单例表
export const getBillList = (params: {
	page: number
	page_size: number
	date: string
	type_id: string
}) => {
	return request({
		url: `/bill/list`,
		params,
	}) as Promise<Res<BillList>>
}
