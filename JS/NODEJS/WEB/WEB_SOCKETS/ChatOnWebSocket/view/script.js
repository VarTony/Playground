// const inputName = document.querySelector("#name");
// 		let name = '';
// 		inputName.onkeypress = e => {
// 		 	if(e.keyCode === 13) {
// 		 		name = inputName.value;
// 		 		inputName.value = '';
// 		 		inputName.style.display = "none"; 
// 		 	}
// 		}


////192.168.1.155:${1970};
		const socket = io(`http://localhost:${1975}/`);
		const listMsg = document.querySelector('.list-group');
		const callAlert = document.querySelector('audio');
		const textArea = document.querySelector('#textArea');
		const sendMSG = (event, msg = '') => {
			if(shift) {
			event.preventDefault();
			msg = textArea.value;
			textArea.value =  '';
			socket.emit('sendMSG', `${name} : ${msg}`);
			}	
		}

		let shift = true;
		textArea.onkeydown = event => {
				if(event.keyCode === 16)  shift = false;
				return;
		}
		textArea.onkeyup = event => {
		 if(event.keyCode === 16) shift = true;
		 return;
		}

		let thisWindow = false;
		let needCall = false;
		window.onfocus = () => thisWindow = false;
		window.onblur = () => thisWindow = true;


		textArea.onkeypress = event => event.keyCode  === 13?  sendMSG(event) : null;
		document.querySelector('#SendMSG').onclick = event => sendMSG(event)

		socket.on('Broadcast msg', msgText => {
			let msg = document.createElement('li');
			msg.innerText = msgText;
			msg.classList.add('list-group-item');
			listMsg.appendChild(msg);
			console.log(thisWindow);
			if(thisWindow) callAlert.play();
		});

		function pageScroll() {
    		listMsg.scrollBy(0,1);
    		scrolldelay = setTimeout(pageScroll,10);
		}

		pageScroll();