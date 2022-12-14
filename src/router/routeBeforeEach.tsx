import React, { FC, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Cookies } from '../utils/storage'

// 拦截
const whiteList = ['/login']
export default function RouterBeforeEach(props: {
	route: {
		path: string
		component: React.LazyExoticComponent<() => JSX.Element>
		meta: Record<string, unknown>
	}
	children: ReactNode
}) {
	if (props.route.meta.title) {
		document.title = props.route.meta.title as string
	}

	const isLogin = !!Cookies.get()
	if (props?.route?.meta?.needLogin) {
		if (!isLogin) {
			return <Navigate to={'/login'} replace />
		}
	}
	const { pathname } = useLocation()
	if (isLogin && whiteList.includes(pathname)) {
		return <Navigate to={'/'} replace />
	}
	return <div>{props.children}</div>
}
