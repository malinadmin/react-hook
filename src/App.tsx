import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { routes, RouteBeforeEach } from './router'
import NavBar from './components/navBar/NavBar'
import { ConfigProvider } from 'antd-mobile'
import zhCN from 'antd-mobile/es/locales/zh-CN'

function App() {
	const location = useLocation()
	const { pathname } = location
	const needNav = ['/', '/about', '/data', '/user'] // 需要底部导航栏的路径
	// useState 的参数为状态初始值，setShowNav为变更状态值的方法
	const [showNav, setShowNav] = useState(false)
	useEffect(() => {
		setShowNav(needNav.includes(pathname))
	}, [pathname]) // [] 内的参数若是变化，便会执行上述回调函数=
	return (
		<ConfigProvider locale={zhCN}>
			<div className="app">
				<div className="body">
					<Routes>
						{routes.map((route) => {
							return (
								<Route
									key={route.path}
									path={route.path}
									element={
										<RouteBeforeEach route={route}>
											<route.component />
										</RouteBeforeEach>
									}
								/>
							)
						})}
					</Routes>
				</div>
				<div>
					<NavBar showNav={showNav} />
				</div>
			</div>
		</ConfigProvider>
	)
}
export default App
