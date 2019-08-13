import React from 'react'
import {render} from 'react-dom'
import Exemplars from './Components/Exemple'
import ListForExemplars from './Components/listForExemplars'
import Header from './Components/Header'
import Card from './Components/Card'

const App = () => {
	return (
		<div>
			<Header/>
			<Exemplars ListForExemplars={ListForExemplars} />
			<Card/>
		</div>
	)
}

render(<App/>, document.getElementById('root'))
