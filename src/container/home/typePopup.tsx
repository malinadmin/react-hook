import React, { useState, useEffect, forwardRef, ForwardedRef, MutableRefObject } from 'react'
import { getType } from './api/home'
import type { Types } from './types/home'
import { Popup, Grid } from 'antd-mobile'
import cx from 'classnames'
import { CloseOutline } from 'antd-mobile-icons'
import stl from './style.module.less'

export type TagPopupExpose = {
	show: () => void
	close: () => void
}
interface Props {
	onSelect: (selected: Types) => void
}
const TagPopup = forwardRef(({ onSelect }: Props, ref: ForwardedRef<TagPopupExpose>) => {
	const [show, setShow] = useState(false) // 控制显示隐藏
	const [active, setActive] = useState<string | number>('all')
	const [expense, setExpense] = useState<Types[]>([]) // 支出类型标签
	const [income, setIncome] = useState<Types[]>([]) // 收入类型标签

	const getTypeList = async () => {
		const { data } = await getType()
		setExpense(data.filter((v) => v.type === 1))
		setIncome(data.filter((v) => v.type === 2))
	}

	useEffect(() => {
		// 请求标签接口放在弹窗内，这个弹窗可能会被复用，所以请求如果放在外面，会造成代码冗余。
		getTypeList()
	}, [])
	const choseType = (item: Types | { id: 'all' }) => {
		setActive(item.id)
		setShow(false)
		onSelect(item as Types)
	}

	if (ref) {
		// eslint-disable-next-line @typescript-eslint/no-extra-semi
		;(ref as MutableRefObject<TagPopupExpose>).current = {
			// 外部可以通过 ref.current.show 来控制组件的显示
			show: () => setShow(true),
			// 外部可以通过 ref.current.close 来控制组件的显示
			close: () => setShow(false),
		}
	}

	return (
		<Popup
			visible={show}
			onMaskClick={() => {
				setShow(false)
			}}
			bodyStyle={{
				minHeight: '30vh',
				background: '#eee',
			}}
		>
			<div className={stl.props_header}>
				<span>请选择类型</span>
				<span
					className={stl.close}
					onClick={() => {
						setShow(false)
					}}
				>
					<CloseOutline fontSize={16} />
				</span>
			</div>
			<div className={stl.props_body}>
				<div className={stl.mgbom10}>
					<Grid columns={3} gap={8}>
						<Grid.Item
							onClick={() => choseType({ id: 'all' })}
							className={cx({ [stl.grid]: true, [stl.active]: active == 'all' })}
						>
							全部类型
						</Grid.Item>
					</Grid>
				</div>
				<div className={stl.mgbom10}>
					<span>支出</span>
					<Grid columns={3} gap={8}>
						{expense.map((item, index) => {
							return (
								<Grid.Item
									key={index}
									onClick={() => choseType(item)}
									className={cx({ [stl.grid]: true, [stl.active]: active === item.id })}
								>
									{item.name}
								</Grid.Item>
							)
						})}
					</Grid>
				</div>
				<div className={stl.mgbom10}>
					<span>收入</span>
					<Grid columns={3} gap={8}>
						{income.map((item, index) => {
							return (
								<Grid.Item
									key={index}
									onClick={() => choseType(item)}
									className={cx({ [stl.grid]: true, [stl.active]: active === item.id })}
								>
									{item.name}
								</Grid.Item>
							)
						})}
					</Grid>
				</div>
			</div>
		</Popup>
	)
})
TagPopup.displayName = 'TagPopup'
export default TagPopup
