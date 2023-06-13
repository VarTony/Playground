
let i = 0;


setTimeout(() => console.log('timer1'), 10);
setTimeout(() => console.log('timer2'), 20);


const first = () => {
	while(i < 250) {
		i += 0.0005 ;
		console.log(i);
	}

	while(i >= 0) {
		i += 0.5;
		i--;
		console.log(i);
	}
	console.log('First');
}


const second = () => {
	while(i < 250) {
		i += 0.0005 ;
		console.log(i);
	}

	while(i >= 0) {
		i + 0.5;
		i--;
		console.log(i);
	}
	console.log('second');
}


first();
second();