import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import routes from '../src/router'
import NavBar from './components/navBar/NavBar'
import { Cookies } from './utils/storage'
function App() {
	const location = useLocation()
	const { pathname } = location
	const needNav = ['/', '/about', '/data', '/user'] // 需要底部导航栏的路径
	// useState 的参数为状态初始值，setShowNav为变更状态值的方法
	const [showNav, setShowNav] = useState(false)
	const navigate = useNavigate()
	useEffect(() => {
		if (!Cookies.get()) {
			navigate('/login')
		}
		setShowNav(needNav.includes(pathname))
	}, [pathname]) // [] 内的参数若是变化，便会执行上述回调函数=
	return (
		<>
			<div className="app">
				<div className="body">
					<Routes>
						{routes.map((route) => (
							<Route key={route.path} path={route.path} element={<route.component />} />
						))}
					</Routes>
				</div>
				<NavBar showNav={showNav} />
			</div>
		</>
	)
}
export default App
