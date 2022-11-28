import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import routes from '../src/router'
import NavBar from './components/navBar/NavBar'

function App() {
	return (
		<>
			<Routes>
				{routes.map((route) => (
					<Route key={route.path} path={route.path} element={<route.component />} />
				))}
			</Routes>
			<NavBar />
		</>
	)
}
export default App
