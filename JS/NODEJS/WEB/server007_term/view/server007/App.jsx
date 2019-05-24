import React from 'react';
import {render} from 'react-dom';
import Term from './Components/term/Term';
import Taskbar from './Components/taskbar/Taskbar.jsx';


class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			energyLvl: '100%',
			chargeBattery: false,
		};


	}

componentDidMount() {


//---------------battery-------------------

	if(navigator.getBattery){
		navigator.getBattery().then(battery => {
			battery.addEventListener('levelchange', () => this.setState({energyLvl : `${+battery.level * 100}%`}));
			battery.addEventListener('chargingchange', () => this.setState({chargeBattery: +battery.charging}));
			});
	}

	else this.setState({energyLvl : 'NaN%'});
//////////////////////////////////////////
	const rec = () => {
		console.log(this.state)
		setTimeout(rec, 5000);
	}
	rec();

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
    	ctx.strokeStyle = this.state.chargeBattery ? '#cfe28408' : '#7787da08';   //`${color}08`; //brush '#165d5008' '#7787da08' '#b097ee08'
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

	render() {
		// setTimeout(() => this.setState({chargeBattery: !this.state.chargeBattery})  ,5000)
		return(
			<div>

				<Taskbar
				energyLvl={this.state.energyLvl}
				chargeBattery={this.state.chargeBattery}
				/>

				<Term chargeBattery={this.state.chargeBattery} />
				<canvas id='canvas' ref="canvas"> </canvas>
			</div>);
	}
}

render(<App/>, document.getElementById('root'));
