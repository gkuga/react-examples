import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Counter } from './Counter'

function App() {
	return (
		<div className="App">
			<main>
				<div>
					<Counter />
				</div>
				<div>
					<Counter />
				</div>
			</main>
		</div>
	)
}

export default App
