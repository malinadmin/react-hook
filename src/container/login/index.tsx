import React, { useEffect } from 'react'
import { Form, Input, Button, Dialog } from 'antd-mobile'
import stl from './style.module.less'
import type { LoginForm } from './types/login'
import { login } from './api/login'
import { useNavigate, Link } from 'react-router-dom'
import { Cookies, TOKEN_NAME } from '/@/utils/storage'
import loginBg from './static/login_bg.svg'
export default function Login() {
	const loading = false
	const navigate = useNavigate()
	const onFinish = async (val: LoginForm) => {
		const { data } = await login(val, loading)
		Cookies.set(TOKEN_NAME, data)
		navigate('/')
	}
	return (
		<div className={stl.login}>
			<div className={stl.from}>
				<div>
					<img src={loginBg} alt="" />
				</div>
				<div>
					<Form
						layout="horizontal"
						mode="card"
						name="from"
						onFinish={onFinish}
						footer={
							<Button block type="submit" color="primary" size="large">
								提交
							</Button>
						}
					>
						<Form.Item
							name="username"
							label="手机号"
							rules={[{ required: true, message: '手机号不能为空' }]}
						>
							<Input placeholder="请输入" />
						</Form.Item>
						<Form.Item
							name="password"
							label="密码"
							rules={[{ required: true, message: '密码不能为空' }]}
						>
							<Input placeholder="请输入" type="password" />
						</Form.Item>
						<Form.Item>
							<p className={stl.regist}>
								没有账号? <Link to="/regist">注册</Link>
							</p>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	)
}
Login.displayName = 'Login'
