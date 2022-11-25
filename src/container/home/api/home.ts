import request from '@/utils/request'
import { Res } from '@/api/types/common'

//获取个人信息
export const getInfo = (loading?: boolean) => {
	return request({
		url: `/user/get_userinfo`,
		loading,
	}) as Promise<Res<string>>
}
