import React from 'react';
import {render} from 'react-dom';
import Chat from './Components/Chat/Chat';
import Audio from './Components/Audio';

class App extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<Audio />
				<Chat />
			</div>
		);
	}
}

render(<App/>, document.getElementById('root'));
