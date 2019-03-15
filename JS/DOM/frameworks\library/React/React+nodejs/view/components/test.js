import React from 'react'
import {render} from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
console.log('work');
const App = () => {
	return (
		<div>
			<h1>Работает<h1/>
		</div>
	)
}

render(<App/>, document.getElementById('root'))

// alert('work');