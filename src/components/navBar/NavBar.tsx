import React, { FC } from 'react'
import { NavBar, TabBar } from 'antd-mobile'
import { Route, Routes, useNavigate, useLocation, MemoryRouter as Router } from 'react-router-dom'
import { AppOutline, MessageOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons'

import styles from './style.module.less'

const Bottom: FC = () => {
	const history = useNavigate()
	const location = useLocation()
	const { pathname } = location

	const setRouteActive = (value: string) => {
		history(value)
	}

	const tabs = [
		{
			key: '/home',
			title: '首页',
			icon: <AppOutline />,
		},
		{
			key: '/todo',
			title: '待办',
			icon: <UnorderedListOutline />,
		},
		{
			key: '/message',
			title: '消息',
			icon: <MessageOutline />,
		},
		{
			key: '/me',
			title: '我的',
			icon: <UserOutline />,
		},
	]

	return (
		<TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
			{tabs.map((item) => (
				<TabBar.Item key={item.key} icon={item.icon} title={item.title} />
			))}
		</TabBar>
	)
}

// eslint-disable-next-line react/display-name
export default () => {
	return (
		<Router initialEntries={['/home']}>
			<div className={styles.app}>
				<div className={styles.top}>
					<NavBar>配合路由使用</NavBar>
				</div>
				<div className={styles.body}>
					<Routes>
						<Route path="/home">home</Route>
						<Route path="/todo">todo</Route>
						<Route path="/message">message</Route>
						<Route path="/me">me</Route>
					</Routes>
				</div>
				<div className={styles.bottom}>
					<Bottom />
				</div>
			</div>
		</Router>
	)
}
