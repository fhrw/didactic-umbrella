// External
import React from 'react'
import { Routes, Route } from "react-router-dom"

// Local
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import { NoMatch } from './components/NoMatch'

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Dashboard />} />
				<Route path="*" element={<NoMatch />} />
			</Route>
		</Routes>
	)
}

export default App
