import React, { useState, useEffect } from 'react'
import stl from './bill.module.less'
import dayjs from 'dayjs'
import type { List } from './types/home'

const BillItem = ({ oneDayBills: { date, bills } }: { oneDayBills: List }) => {
	const [income, setIncome] = useState(0) // 总收入
	const [expense, setExpense] = useState(0) // 总支出

	// 新增或删除 账单时,从新计算 总收入与总支出
	useEffect(() => {
		const _income = bills
			.filter((i) => i.pay_type === 2)
			.reduce((prev, curr) => prev + Number(curr.amount), 0)

		const _expense = bills
			.filter((i) => i.pay_type === 1)
			.reduce((prev, curr) => prev + Number(curr.amount), 0)

		setIncome(_income)
		setExpense(_expense)
	}, [bills])
	return (
		<div className={stl.list}>
			<div className={stl.top_header}>
				<div className={stl.fl1}>
					<p>{dayjs(date).format('MM月DD日')}</p>
				</div>
				<div className={stl.fl2}>
					<span>支</span>￥{expense.toFixed(2)}
					<span>收</span>￥{income.toFixed(2)}
				</div>
			</div>
			<div className={stl.body}>
				{bills.map((item) => {
					return (
						<div key={item.id} className={stl.body_list}>
							<div className={stl.icon}>icon</div>
							<div className={stl.fl2}>
								<div>
									<p>{item.type_name}</p>
									<span className={stl.time}>{dayjs(item.date).format('hh:ss')}</span>
								</div>
								<div className={`${item.pay_type === 2 ? stl.income : stl.expense}`}>
									{item.pay_type === 1 ? '-' : '+'}
									{item.amount}
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default BillItem
