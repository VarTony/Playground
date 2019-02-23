// import helper from 'helper.js';

const ajax = (method, data, server = '/', async = true, 
helpStrCollector = true) => {
	const user = JSON.stringify({email : data.email, password: data.password});
	const xhttp = new XMLHttpRequest();
	xhttp.open(method, server, async);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(user);

	xhttp.onreadystatechange = function(){
		if(this.readyState === 4 && this.status === 200) console.log(this.responseText);
	};
}

