import React, { useState } from 'react'
import stl from './style.module.less'
import { Form, Input, Button, Toast } from 'antd-mobile'
import Lottie, { Options } from 'react-lottie'
import { useNavigate, Link } from 'react-router-dom'
import registLo from './static/regist_lo.json'
import type { LoginForm } from '../login/types/login'
import { regist } from './api/regist'
const Regist = () => {
	const Opetions: Options = {
		loop: true,
		autoplay: true,
		animationData: registLo,
	}
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const onFinish = async (val: LoginForm) => {
		setLoading(true)
		await regist(val)
		Toast.show('注册成功')
		navigate('/login')
		setLoading(false)
	}
	return (
		<div className={stl.regist}>
			<div className={stl.content}>
				<div>
					<Lottie options={Opetions} width={200} height={200}></Lottie>
				</div>
				<div className={stl.form}>
					<Form
						mode="card"
						requiredMarkStyle="none"
						onFinish={onFinish}
						footer={
							<Button loading={loading} block type="submit" color="primary" size="large">
								提交
							</Button>
						}
					>
						<Form.Item
							name="username"
							label="手机号"
							rules={[{ required: true, message: '手机号不能为空' }]}
						>
							<Input placeholder="请输入手机号" />
						</Form.Item>
						<Form.Item
							name="password"
							label="密码"
							rules={[{ required: true, message: '密码不能为空' }]}
						>
							<Input placeholder="请输入密码" type="password" />
						</Form.Item>
						<Form.Item>
							<p className={stl.login}>
								已有账号? <Link to="/login">登录</Link>
							</p>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	)
}

export default Regist
