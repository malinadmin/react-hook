import { lazy } from 'react'

const Home = lazy(() => import('@/container/home'))
const Regist = lazy(() => import('@/container/regist'))
const About = lazy(() => import('@/container/about'))
const Data = lazy(() => import('@/container/data'))
const User = lazy(() => import('@/container/user'))
const Login = lazy(() => import('@/container/login'))

const routes = [
	{
		path: '/',
		component: Home,
		meta: {
			title: '账单',
			needLogin: true,
		},
	},
	{
		path: '/regist',
		component: Regist,
		meta: {
			title: '注册',
			needLogin: false,
		},
	},
	{
		path: '/about',
		component: About,
		meta: {
			title: '关于',
			needLogin: true,
		},
	},
	{
		path: '/data',
		component: Data,
		meta: {
			title: '数据',
			needLogin: true,
		},
	},
	{
		path: '/user',
		component: User,
		meta: {
			title: '用户中心',
			needLogin: true,
		},
	},
	{
		path: '/login',
		component: Login,
		meta: {
			title: '登录',
			needLogin: false,
		},
	},
]

export default routes
