import React, { useState, useRef, ForwardedRef, useEffect, createContext } from 'react'
import { EditSOutline } from 'antd-mobile-icons'
import stl from './addBills.module.less'

const AddBills = () => {
	return (
		<div className={stl.add}>
			<i>
				<EditSOutline />
			</i>
			<span>记一笔</span>
		</div>
	)
}

export default AddBills
