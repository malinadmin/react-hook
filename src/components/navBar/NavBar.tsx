import React, { FC } from 'react'
import { TabBar } from 'antd-mobile'
import { useNavigate, useLocation } from 'react-router-dom'
import { AppOutline, MessageOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons'

const Bottom: FC = () => {
	const history = useNavigate()
	const location = useLocation()
	const { pathname } = location

	const setRouteActive = (value: string) => {
		history(value)
	}

	const tabs = [
		{
			key: '/',
			title: '首页',
			icon: <AppOutline />,
		},
		{
			key: '/about',
			title: '关于',
			icon: <UnorderedListOutline />,
		},
		{
			key: '/data',
			title: '数据',
			icon: <MessageOutline />,
		},
		{
			key: '/user',
			title: '个人中心',
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

interface ChildProps {
	showNav: boolean
}
const navBootom: FC<ChildProps> = (props) => {
	const { showNav } = props
	return (
		<div className={`bottom ${showNav ? 'is-show' : 'is-hide'} `}>
			<Bottom />
		</div>
	)
}

export default navBootom
