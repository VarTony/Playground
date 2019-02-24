// import helper from 'helper.js';

const ajax = (method, data, server = '/', async = true, 
helpStrCollector = true) => {
	const user = data;
	const xhttp = new XMLHttpRequest();
	xhttp.open(method, server, async);
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
	xhttp.send(user);

	xhttp.onreadystatechange = function(){
		if(this.readyState === 4 && this.status === 200) console.log(this.responseText);
	};
}

