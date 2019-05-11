import React from 'react';
import MsgForm from './MsgForm';
import BlockForMsgs from './BlockForMsgs';

class Chat extends React.Component {

	constructor(props) {
		super(props);
		this.socket = io(`http://localhost:${1975}/`)
	
	}

	render() {
		return(
			<div id='Chat'>
				<BlockForMsgs />
				<MsgForm />
			</div>
		);
	}
}


export default Chat;