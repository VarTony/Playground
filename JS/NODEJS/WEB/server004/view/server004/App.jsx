import React from 'react';
import {render} from 'react-dom';
import GIDCreator from './components/GIDCreator.jsx';


const App = () => {
	return (
		<div>
			<h1> Work </h1>
			<GIDCreator />
		</div>
	)
}

render(<App/>, document.getElementById('root'));