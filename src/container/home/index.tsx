import React from 'react'
import { getInfo } from './api/home'
import { NavBar } from 'antd-mobile'
import stl from './style.module.less'

const Home = () => {
	//请求
	const get_info = async () => {
		await getInfo()
	}

	get_info()
	return (
		<div className={stl.home}>
			<NavBar back={null}> 首页</NavBar>
		</div>
	)
}
export default Home
