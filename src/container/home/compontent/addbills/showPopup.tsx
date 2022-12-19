import React, { useState, forwardRef, ForwardedRef, MutableRefObject, useEffect } from 'react'
import { Popup, Grid, NumberKeyboard } from 'antd-mobile'
import cx from 'classnames'
import stl from './addBills.module.less'
import { DownFill } from 'antd-mobile-icons'
import type { Types } from '../../types/home'
import { getType } from '../../api/home'
export type BillPopupExpose = {
	show: () => void
	close: () => void
}

interface Props {
	refresh: () => void
	detail?: Bill
}
const ShowPopup = forwardRef(({ refresh, detail }: Props, ref: ForwardedRef<BillPopupExpose>) => {
	const [visible, setVisible] = useState(false)
	const [active, setActive] = useState<number>(1)

	const [typeList, setTypeList] = useState<Types[]>([])
	const [list, setList] = useState<Types[]>([]) //获取分类例表

	const [money, setMoney] = useState('')

	const choseType = (type: number) => {
		setActive(type)
		setTypeList(list.filter((v) => v.type === type))
	}

	const [text, setText] = useState([
		{
			text: '支出',
			type: 1,
		},
		{
			text: '收入',
			type: 2,
		},
	])
	if (ref) {
		// eslint-disable-next-line @typescript-eslint/no-extra-semi
		;(ref as MutableRefObject<BillPopupExpose>).current = {
			// 外部可以通过 ref.current.show 来控制组件的显示
			show: () => setVisible(true),
			// 外部可以通过 ref.current.close 来控制组件的显示
			close: () => setVisible(false),
		}
	}

	const getTypeList = async () => {
		const { data } = await getType()
		setList(data)
		setTypeList(data.filter((v) => v.type === active))
	}

	const actions = {
		onClose: () => {},
		onInput: (v: string) => {
			setMoney(`${money}${v}`)
		},
		onDelete: () => {
			setMoney(money.slice(0, -1))
		},
		onConfirm: () => {},
	}
	useEffect(() => {
		// 请求标签接口放在弹窗内，这个弹窗可能会被复用，所以请求如果放在外面，会造成代码冗余。
		getTypeList()
	}, [])

	return (
		<Popup
			visible={visible}
			showCloseButton
			onClose={() => {
				setVisible(false)
			}}
			onMaskClick={() => {
				setVisible(false)
			}}
			bodyStyle={{
				borderTopLeftRadius: '8px',
				borderTopRightRadius: '8px',
				minHeight: '30vh',
			}}
		>
			<div className={stl.pop_header}>
				<div className={stl.pop_flex}>
					<div className={stl.fl1}>
						{text.map((v) => {
							return (
								<span
									onClick={() => {
										choseType(v.type)
									}}
									className={cx({ [stl.active]: active === v.type })}
									key={v.type}
								>
									{v.text}
								</span>
							)
						})}
					</div>
					<div className={stl.fl2}>
						<span>12月3日</span>
						<span>
							<DownFill fontSize={12} />
						</span>
					</div>
				</div>
				<div className={stl.money}>
					<span>¥</span>
					<span>{money}</span>
				</div>
				<div className={stl.type_list}>
					<Grid columns={6} gap={8}>
						{typeList.map((v) => {
							return (
								<Grid.Item key={v.id}>
									<div className={stl.grid}>
										<span className={stl.icon}>icon</span>
										<p>{v.name}</p>
									</div>
								</Grid.Item>
							)
						})}
					</Grid>
				</div>
				<div className={stl.remark}>添加备注</div>
				<div className={stl.keworld}>
					<NumberKeyboard
						visible={visible}
						showCloseButton={false}
						onConfirm={actions.onConfirm}
						onInput={actions.onInput}
						onDelete={actions.onDelete}
						customKey={'.'}
						confirmText="确定"
					/>
				</div>
			</div>
		</Popup>
	)
})

ShowPopup.displayName = 'ShowPopup'
export default ShowPopup
