import React from 'react';

class TextArea extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="form-group">
				<textarea id="textArea" type="text"  name="text" className="form-control m" rows='4'></textarea>
				<label htmlFor='msg'>MSG</label>
			</div>
		);
	}
}

export default TextArea;