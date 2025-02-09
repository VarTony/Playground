import React from 'react';
// import PaintScript from '../scripts/Paint.js';

let color;

class Controlers extends React.Component {
		

	stopPropagation() {

	}


	render () {
	
			return	(<nav className='controlers'> 
						<ul className='tools' 
							// onMouseDown={e => e.stopPropagation()}
							// onMouseMove={e => e.stopPropagation()}
							// onMouseUp={e => e.stopPropagation()}
							>
							<li>
								<h3
								onMouseDown={e => e.stopPropagation()}
								onMouseMove={e => e.stopPropagation()}
								onMouseUp={e => e.stopPropagation()}

								>
									<img className='icons' src='./imgs/icons/palette.svg'/> 
									<input type='color' onChange={(e) => this.props.takeValues(e)}  id='color' name='color' value={this.props.color} onMouseDown={e => e.stopPropagation()} 
									onMouseMove={e => e.stopPropagation()} 
									onMouseUp={e => e.stopPropagation()} /> 
							</h3>
						</li>
						<li>
							<h3
							onMouseDown={e => e.stopPropagation()}
							onMouseMove={e => e.stopPropagation()}
							onMouseUp={e => e.stopPropagation()}
							>
								<img className='icons' src='./imgs/icons/ruler.svg'/> 
								<input type='text' id='ruler'/>
								px 
							</h3>
						</li>
    	 				<li>
    	 					<h3
    	 						onMouseDown={e => e.stopPropagation()}
								onMouseMove={e => e.stopPropagation()}
								onMouseUp={e => e.stopPropagation()}
    	 					>
    	 						Tools 
    	 						<img className='icons' src='./imgs/icons/edit.svg'/>
    	 					</h3>
          					<ul className="submenu brush"
								onMouseDown={e => e.stopPropagation()}
								onMouseMove={e => e.stopPropagation()}
								onMouseUp={e => e.stopPropagation()}
          						>
            					<li name='feltTip' onClick={(e) => this.props.takeBrushModel(e)}>
            						<img className='icons' src='./imgs/icons/brush.svg'/>
            						feltip
            					</li>
            					<li name='pen' onClick={(e) => this.props.takeBrushModel(e)}>
            						<img className='icons' src='./imgs/icons/pen.svg'/>
            						pen
            					</li>
            					<li name='spray' onClick={(e) => this.props.takeBrushModel(e)}>
            						<img className='icons' src='./imgs/icons/spray.svg'/ >
            						spray
            					</li>
            					<li name='eraser' onClick={(e) => this.props.takeBrushModel(e)}>
            						<img className='icons' src='./imgs/icons/eraser.svg'/>
            						eraser
            					</li>
         					</ul>
        				</li>
        				<li>
        					<h3
        						onMouseDown={e => e.stopPropagation()}
								onMouseMove={e => e.stopPropagation()}
								onMouseUp={e => e.stopPropagation()}
        					>
        						Tool-size 
        						<img className='icons' 
        						src='./imgs/icons/roller.svg'/>
        						</h3>
          					<ul className="submenu tool-size"
          						onMouseDown={e => e.stopPropagation()}
								onMouseMove={e => e.stopPropagation()}
								onMouseUp={e => e.stopPropagation()}
          					>
            					<li name='5'  onClick={(e) => this.props.takeSizetool(e)}>5px</li>
            					<li name='10' onClick={(e) => this.props.takeSizetool(e)}>10px</li>
            					<li name='15' onClick={(e) => this.props.takeSizetool(e)}>15px</li>
            					<li name='20' onClick={(e) => this.props.takeSizetool(e)}>20px</li>
            					<li name='25' onClick={(e) => this.props.takeSizetool(e)}>25px</li>
          						</ul>
        					</li>
        					<li>
        						<h3	
        							onMouseDown={e => e.stopPropagation()}
									onMouseMove={e => e.stopPropagation()}
									onMouseUp={e => e.stopPropagation()}>
        							<img className='icons' src='./imgs/icons/fill-drip.svg'/>Fill field
        						</h3>
        					</li>
      					</ul>
					</nav>);
	}

}

// export  {Controlers, color};
export default Controlers;