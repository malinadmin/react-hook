import Home from '../container/home'
import Regist from '../container/regist'
import About from '../container/about'
import Data from '../container/data'
import User from '../container/user'
import Login from '../container/login'

const routes = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/home',
		component: Home,
	},
	{
		path: '/regist',
		component: Regist,
	},
	{
		path: '/about',
		component: About,
	},
	{
		path: '/data',
		component: Data,
	},
	{
		path: '/user',
		component: User,
	},
	{
		path: '/login',
		component: Login,
	},
]

export default routes
