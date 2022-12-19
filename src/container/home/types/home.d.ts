export interface Types {
	id: number | string
	name: string
	type: number
}

export interface BillList {
	list: List[]
	totalExpense: number
	totalIncome: number
	totalPage: number
}

export interface List {
	bills: Bills[]
	date: string
}

export interface Bills {
	amount: number
	date?: string
	id?: number
	pay_type: number | string
	remark: string
	type_id: number
	type_name: string
}
