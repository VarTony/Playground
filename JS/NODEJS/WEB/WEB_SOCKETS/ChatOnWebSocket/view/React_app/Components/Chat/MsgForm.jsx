import React from 'react';
import TextArea from './TextArea';
import SendBtn from './SendBtn';


class MsgForm extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(	
			<div id='MsgForm'>
				<TextArea />
				<SendBtn />
			</div>
		);
	}
}


export default MsgForm;