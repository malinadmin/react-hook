import request from '@/utils/request'
import { Res } from '@/api/types/common'
import type { LoginForm } from '../../login/types/login'

//注册
export const regist = (data: LoginForm, loading?: boolean) => {
	return request({
		url: `/user/register`,
		loading,
		data,
		method: 'POST',
	}) as Promise<Res<string>>
}
