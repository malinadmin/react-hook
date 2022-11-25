import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'zarm'
import { useNavigate, useLocation } from 'react-router-dom'
import stl from './style.module.less'

const NavBar = ({ showNav }) => {
	const [activeKey, setActiveKey] = useState(useLocation().pathname)
	const navigateTo = useNavigate()

	const changeTab = (path) => {
		setActiveKey(path)
		navigateTo(path)
	}

	return (
		<TabBar visible={showNav} className={stl.tab} activeKey={activeKey} onChange={changeTab}>
			<TabBar.Item itemKey="/" title="账单" />
			<TabBar.Item itemKey="/data" title="统计" />
			<TabBar.Item itemKey="/user" title="我的" />
		</TabBar>
	)
}

NavBar.propTypes = {
	showNav: PropTypes.bool,
}

export default NavBar
