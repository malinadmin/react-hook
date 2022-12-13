import React, { useState, useRef, ForwardedRef, useEffect, createContext } from 'react'
import stl from './style.module.less'
import { AppstoreOutline, DownFill } from 'antd-mobile-icons'
import TypePopup, { TagPopupExpose } from './typePopup'
import { PullToRefresh, InfiniteScroll, ErrorBlock } from 'antd-mobile'
import { getBillList } from './api/home'
import dayjs from 'dayjs'
import type { Types, List } from './types/home'
import SelectTime, { TimePopupExpose } from './selectTime'
import BillItem from './billItem'
import AddBills from './addBills'

export const HomeContext = createContext({
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	refresh() {},
})
const dateFormate = 'YYYY-MM'
const Home = () => {
	const tagPopupRef = useRef<TagPopupExpose>() // 账单类型 ref
	const timePopupRef = useRef<TimePopupExpose>()
	const [currentSelect, setCurrentSelect] = useState<Types>({ id: 'all' } as Types) // 当前筛选类型
	const [currentTime, setCurrentTime] = useState(dayjs().format(dateFormate)) // 当前筛选时间
	const [page, setPage] = useState(1) // 分页
	const [list, setList] = useState<List[]>([]) // 账单列表
	const [totalPage, setTotalPage] = useState(0) // 分页总数
	const [expense, setExpense] = useState(0) // 总支出
	const [income, setIncome] = useState(0) // 总收入
	const onTagSelect = (item: Types) => {
		setPage(1)
		setCurrentSelect(item)
	}
	// 筛选时间
	const onTimeSelect = (date: Date) => {
		setPage(1)
		setCurrentTime(dayjs(date).format(dateFormate))
	}

	const getList = async () => {
		const { data } = await getBillList({
			page,
			page_size: 5,
			date: currentTime,
			type_id: currentSelect.id as string,
		})
		// 下拉刷新，重制数据
		page === 1 ? setList(data.list) : setList(list.concat(data.list))

		setTotalPage(data.totalPage)
		setExpense(data.totalExpense)
		setIncome(data.totalExpense)
	}

	const loadMore = async () => {
		if (page < totalPage) {
			setPage(page + 1)
		}
	}

	useEffect(() => {
		getList()
	}, [page, currentSelect, currentTime])

	const refresh = async () => {
		page !== 1 ? setPage(1) : getList()
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
					<span onClick={() => timePopupRef.current?.show()}>
						{currentTime} <DownFill fontSize={12} />
					</span>

					<span>总支出￥ {expense.toFixed(2)}</span>
					<span>总收入￥ {income.toFixed(2)}</span>
				</div>
			</div>
			<div>
				<PullToRefresh onRefresh={refresh}>
					<div className={stl.list}>
						<HomeContext.Provider value={{ refresh }}>
							{list.length ? (
								list.map((item, index) => <BillItem oneDayBills={item} key={index} />)
							) : (
								<ErrorBlock status="empty" title="暂无数据" />
							)}
						</HomeContext.Provider>
					</div>
					<InfiniteScroll loadMore={loadMore} hasMore={page < totalPage} />
				</PullToRefresh>
			</div>
			<AddBills />
			<TypePopup onSelect={onTagSelect} ref={tagPopupRef as ForwardedRef<TagPopupExpose>} />
			<SelectTime onSelect={onTimeSelect} ref={timePopupRef as ForwardedRef<TimePopupExpose>} />
		</div>
	)
}
export default Home
