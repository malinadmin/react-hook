export interface Res<T> {
	code: 0 | 1
	msg?: string
	data?: T
}
