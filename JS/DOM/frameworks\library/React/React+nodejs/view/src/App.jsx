import React from 'react'
import {render} from 'react-dom'
import Paint  from './components/Paint.jsx';
console.log('work');
const App = () => {
	return (
		<div>
			<h1>work</h1>
			<Paint/>
		</div>
	)
}

render(<App/>, document.getElementById('root'))
