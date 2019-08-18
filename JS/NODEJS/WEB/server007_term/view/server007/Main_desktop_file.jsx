import React from 'react';
// import {render} from 'react-dom';
import Term from './term/Components/Term';
import Toolbar from './toolbar/Toolbar.jsx';
import Paint from './paint/Main_paint_file';
import {BrowserRouter, Route} from 'react-router-dom';


class Main_terminal_file extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			energyLvl: '100%',
			chargeBattery: false,
			hour: '00',
			minute: '00',
		  visibleOfTerm : false,
			visibleOfPaint : false
		};
		this.changeTermVisible = this.changeTermVisible.bind(this);
		this.changePaintVisible = this.changePaintVisible.bind(this);
	}

componentDidMount() {

//---------------battery-------------------

	if(navigator.getBattery){
		navigator.getBattery().then(battery => {
			battery.addEventListener('levelchange', () => this.setState({energyLvl : `${Math.floor(+battery.level * 100)}%`}));
			battery.addEventListener('chargingchange', () => this.setState({chargeBattery: +battery.charging}));
			});
	}

	else this.setState({energyLvl : 'NaN%'});

/////////////////Timer///////////////////

const timer = () => {
		const date =  new Date();
		let delay = date.getSeconds() > 0? (60 - date.getUTCSeconds()) * 1000 : 60000;
		this.setState({
			hour: date.getHours() < 10? `0${date.getHours()}`: date.getHours(),
			minute: date.getMinutes() < 10? `0${date.getMinutes()}`: date.getMinutes()
		});
		console.log(this.state, ';', delay);
		setTimeout(timer, delay);
}
timer();

///////////////////////////////////////
	const canvas = this.refs.canvas;
	const ctx = canvas.getContext('2d');

	let color = `#${(Math.floor(Math.random() * (12131217 - 1200000)) + 1200000).toString(16)}` //#24adac08 #346e6e08
	console.log(color + '08');

	let w = canvas.width = window.innerWidth;
	let h = canvas.height = window.innerHeight;
	let t = 1;
	let grd=ctx.createLinearGradient(10, 100, w, 0);
	grd.addColorStop(0,'#0d151b');
	grd.addColorStop(1,'#1b2036'); //'#1e243e'

	const draw = (a, b, t) => {
  	ctx.lineWidth = 0.8;
  	ctx.fillStyle = grd;

  	ctx.fillRect(0, 0, w, h);
  	for (let i = 0; i < 128; i += 1) {
    	ctx.strokeStyle = this.state.chargeBattery ? '#7787da12' : '#7787da10';   //`${color}08`; //brush '#165d5008' '#7787da08' '#b097ee08' '#ff8faf08'
    	ctx.beginPath();
    	ctx.moveTo(0, h / 2);
    	for (let j = 0; j < w; j += 10) {
      	ctx.lineTo(20 * Math.sin(i / 10) +
        	j + 0.008 * j * j,
        	Math.floor(h / 2 + j / 2 *
          	Math.sin(j / 64 - t / 64 - i / 118) +
          	(i * 0.9) * Math.sin(j / 35 - (i + t) / 75)));
    	};
			ctx.stroke();
		}
	}

	window.addEventListener('resize', () => {
  	canvas.width = w = window.innerWidth;
  	canvas.height = h = window.innerHeight;
  	ctx.fillStyle=grd;
	}, false);

	const run = () => {
  	window.requestAnimationFrame(run);
  	t += 0.512;
  	draw(33, 52 * Math.sin(t / 2400), t);
	};

	run();
}

	changeTermVisible(e) {
		e.preventDefault();
		e.stopPropagation();
		this.setState((prevState, props) => ({visibleOfTerm : !prevState.visibleOfTerm}));
	}

	changePaintVisible(e) {
		e.preventDefault();
		e.stopPropagation();
		console.error('do`t wordk');
		this.setState((prevState, props) => ({visibleOfPaint : !prevState.visibleOfPaint}));
	}




	render() {
		return(
			<div>

				<Toolbar
				energyLvl={this.state.energyLvl}
				chargeBattery={this.state.chargeBattery}
				time={{minute: this.state.minute, hour: this.state.hour}}
				changeTermVisible={this.changeTermVisible}
				changePaintVisible={this.changePaintVisible}
				/>

				<Term
				chargeBattery={this.state.chargeBattery}
				userString={`${document.cookie.split('=')[1].split('-')[0]}:~$`}
				changeTermVisible={this.changeTermVisible}
				visible = {this.state.visibleOfTerm}
				/>

				<Paint
					changePaintVisible={this.changePaintVisible}
					visible = {this.state.visibleOfPaint}
				/>

				 <canvas id='canvas' ref="canvas"> </canvas>
			</div>);
	}
}

export default Main_terminal_file;


// <BrowserRouter>
// 	<Route path='/' render={() => {}}/>
// </BrowserRouter>
