import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useNavigate, useLocation } from 'react-router-dom'
import stl from './style.module.less'

const NavBar = ({ showNav }) => {
	const [activeKey, setActiveKey] = useState(useLocation().pathname)
	const navigateTo = useNavigate()

	const changeTab = (path) => {
		setActiveKey(path)
		navigateTo(path)
	}

	return <div></div>
}

NavBar.propTypes = {
	showNav: PropTypes.bool,
}

export default NavBar
