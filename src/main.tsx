import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './style/common.less'
const container = document.getElementById('root')
import { HashRouter as Router } from 'react-router-dom'
const root = createRoot(container!)
root.render(
	<Suspense>
		<Router>
			<App />
		</Router>
	</Suspense>
)
