
class eventEmitter {

	constructor() {
		this.events = {};
	}	

	on(event, handler) {
		this.events.event = handler;
	}

	emit(event, data) {
		if(this.events.event) return this.events.event(data); 
	}

}

const emitter = new eventEmitter();
emitter.on('a', data => console.log(data));
emitter.emit('a', 'work');
