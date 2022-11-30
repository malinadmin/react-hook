import React, { useState, useRef, ForwardedRef } from 'react'
import stl from './style.module.less'
import { AppstoreOutline, DownFill } from 'antd-mobile-icons'
import TypePopup, { TagPopupExpose } from './typePopup'
import type { Types } from './types/home'
const Home = () => {
	const tagPopupRef = useRef<TagPopupExpose>() // 账单类型 ref
	const [currentSelect, setCurrentSelect] = useState<Types>({ id: 'all' } as Types) // 当前筛选类型

	const onTagSelect = (item: Types) => {
		setCurrentSelect(item)
	}
	return (
		<div className={stl.home}>
			<div className={stl.header}>
				<div
					className={stl.slt_typ}
					onClick={() => {
						tagPopupRef.current?.show()
					}}
				>
					<span> {currentSelect.id === 'all' ? '全部类型' : currentSelect.name}</span>
					<span className={stl.icon}>
						<AppstoreOutline />
					</span>
				</div>
				<div className={stl.slt_time}>
					<span>
						2022.1.2 <DownFill fontSize={12} />
					</span>
					<span>总支出￥ 1450.02</span>
					<span>总收入￥ 555.04</span>
				</div>
			</div>
			<TypePopup onSelect={onTagSelect} ref={tagPopupRef as ForwardedRef<TagPopupExpose>} />
		</div>
	)
}
export default Home
