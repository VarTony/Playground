import React from 'react';

class Audio extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(<audio src="view/Audio/callAlert.mp3"></audio>);
	}
}

export default Audio;