import React, {
	useState,
	forwardRef,
	ForwardedRef,
	MutableRefObject,
	useEffect,
	useRef,
} from 'react'
import { Popup, Grid, NumberKeyboard, Toast, Input } from 'antd-mobile'
import cx from 'classnames'
import dayjs from 'dayjs'
import stl from './addBills.module.less'
import { DownFill } from 'antd-mobile-icons'
import type { Types, Bills } from '../../types/home'
import { getType, addBill } from '../../api/home'
import SelectTime, { TimePopupExpose } from '../../selectTime'

export type BillPopupExpose = {
	show: () => void
	close: () => void
}

interface Props {
	refresh: () => void
	detail?: Bills
}
const dateFormate = 'MM-DD'
const ShowPopup = forwardRef(({ refresh, detail }: Props, ref: ForwardedRef<BillPopupExpose>) => {
	// 传递 detail 则为编辑模式
	const id = detail && detail.id
	const [visible, setVisible] = useState(false)
	const [active, setActive] = useState<number>(1)
	const timePopupRef = useRef<TimePopupExpose>()
	const [typeList, setTypeList] = useState<Types[]>([])
	const [list, setList] = useState<Types[]>([]) //获取分类例表
	const [currentTime, setCurrentTime] = useState(dayjs().format(dateFormate)) // 当前筛选时间
	const [money, setMoney] = useState('')
	const [remark, setRemark] = useState('')

	const [expense, setExpense] = useState<Types[]>([]) // 支出类型标签
	const [income, setIncome] = useState<Types[]>([]) // 收入类型标签
	const [tag, setTag] = useState<Types>()
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
		if (!visible) return
		const { data } = await getType()
		setList(data)
		const _expense = data.filter((i) => i.type === 1)
		const _income = data.filter((i) => i.type === 2)
		setTypeList(data.filter((v) => v.type === active))

		setExpense(_expense)
		setIncome(_income)
		if (!id) {
			setTag(_expense[0])
		}
	}
	const reset = () => {
		setVisible(false)
		if (id) return
		setMoney('')
		setCurrentTime(dayjs().format(dateFormate))
		setActive(1)
		setTag({ id: '' } as Types)
		setRemark('')
	}

	// 筛选时间
	const onTimeSelect = (date: Date) => {
		//setPage(1)
		setCurrentTime(dayjs(date).format(dateFormate))
	}
	const actions = {
		onClose: () => {
			reset()
		},
		onInput: (v: string) => {
			// 当输入的值为 '.' 且 已经存在 '.'，则不让其继续字符串相加。
			if (v === '.' && money.includes('.')) return
			// 当输入的值为 '.' 且 为首字符时, 前面加0
			if (v === '.' && !money.length) {
				setMoney(`0${v}`)
				return
			}
			// 小数点后保留两位，当超过两位时，不让其字符串继续相加。
			if (v !== '.' && money.includes('.') && money && money.split('.')[1].length >= 2) {
				return
			}

			const _amount = `${money}${v}`
			if (Number(_amount) > 1000000) {
				Toast.show('金额不能大于1,000,000')
				return
			}
			setMoney(`${money}${v}`)
		},
		onDelete: () => {
			setMoney(money.slice(0, -1))
		},
		onConfirm: async () => {
			console.log(tag)
			if (!money.length) {
				Toast.show('请输入具体金额')
			} else {
				const params = {
					type_id: tag?.id as number,
					type_name: tag?.name || '',
					amount: Number(money),
					remark,
					pay_type: active,
					date: dayjs(currentTime).format('YYYY-MM-DD hh:mm:ss'),
				}
				if (id) {
					//await updateBill({ id, ...params })
				} else {
					await addBill(params)
				}
				reset()
				refresh()
			}
		},
	}

	useEffect(() => {
		getTypeList()
	}, [visible])

	useEffect(() => {
		setTag(active === 1 ? expense[0] : income[0])
	}, [active])

	return (
		<Popup
			visible={visible}
			showCloseButton
			onClose={() => {
				reset()
			}}
			onMaskClick={() => {
				reset()
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
					<div className={stl.fl2} onClick={() => timePopupRef.current?.show()}>
						<span>{currentTime}</span>
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
									<div
										onClick={() => setTag(v)}
										className={cx({
											[stl['grid']]: true,
											[stl.active]: tag?.id == v.id,
										})}
									>
										<span className={stl.icon}>icon</span>
										<p>{v.name}</p>
									</div>
								</Grid.Item>
							)
						})}
					</Grid>
				</div>
				<div className={stl.remark}>
					添加备注
					<Input
						placeholder="请输入内容"
						value={remark}
						onChange={(val) => {
							setRemark(val)
						}}
					/>
				</div>
				<div className={stl.keworld}>
					<NumberKeyboard
						visible={true}
						getContainer={null}
						showCloseButton={false}
						onConfirm={actions.onConfirm}
						onInput={actions.onInput}
						onDelete={actions.onDelete}
						closeOnConfirm={false}
						customKey={'.'}
						confirmText="确定"
					/>
				</div>
			</div>
			<SelectTime
				precision="day"
				onSelect={onTimeSelect}
				ref={timePopupRef as ForwardedRef<TimePopupExpose>}
			/>
		</Popup>
	)
})

ShowPopup.displayName = 'ShowPopup'
export default ShowPopup
