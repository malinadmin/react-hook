import React, { useState, useRef, ForwardedRef, useEffect, createContext } from 'react'
import { EditSOutline } from 'antd-mobile-icons'
import stl from './addBills.module.less'
import ShowPopup, { BillPopupExpose } from './showPopup'

const AddBills = () => {
	const billPopupRef = useRef<BillPopupExpose>()
	return (
		<div className={stl.add}>
			<i>
				<EditSOutline />
			</i>
			<span
				onClick={() => {
					billPopupRef.current?.show()
				}}
			>
				记一笔
			</span>
			<ShowPopup
				refresh={() => {
					alert(2)
				}}
				ref={billPopupRef as ForwardedRef<BillPopupExpose>}
			/>
		</div>
	)
}

export default AddBills
