import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	// <React.StrictMode>   //加上这个strictMode页面上所有事件会触发两次react18特有
	<BrowserRouter>
		<App />
	</BrowserRouter>
	// </React.StrictMode>
)
