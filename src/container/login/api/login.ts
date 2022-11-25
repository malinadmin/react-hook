import request from '@/utils/request'
import { Res } from '@/api/types/common'
import type { LoginForm } from '../types/login'

//登录
export const login = (data: LoginForm, loading?: boolean) => {
	return request({
		url: `/user/login`,
		loading,
		data,
		method: 'POST',
	}) as Promise<Res<string>>
}
