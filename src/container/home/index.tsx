import React from 'react'
import { getInfo } from './api/home'

import stl from './style.module.less'

const Home = () => {
	//请求
	const get_info = async () => {
		await getInfo()
	}

	get_info()
	console.log(22)
	return (
		<div className={stl.home}>
			主页
			<span></span>
		</div>
	)
}
export default Home
