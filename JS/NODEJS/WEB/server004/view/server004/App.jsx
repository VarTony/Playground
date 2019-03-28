import React from 'react';
import {render} from 'react-dom';
import ContactCreater from './components/ContactCreater';


const App = () => {
	return (
		<div>
			<h1> Work </h1>
			<ContactCreater />
		</div>
	)
}

render(<App/>, document.getElementById('root'));