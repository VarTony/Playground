import React from 'react';


class SendBtn extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="form-group">
				<button id="SendMSG" type="sabmit" className="btn btn-primary btn-block send  btns">Send MSG</button>
			</div>
		);
	}
}


export default SendBtn;

