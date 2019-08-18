import React from 'react';
import BtnPaint from './BtnPaint'
// import mover from './../../viewHelpers.js';
// import PaintScript from '../scripts/Paint.js';

let color;

class Controlers extends React.Component {


	stopPropagation() {

	}


	render () {

			return	(
				<nav className='controlers' >
						<ul className='tools ul_of_paint'
							// onMouseDown={e => e.stopPropagation()}
							// onMouseMove={e => e.stopPropagation()}
							// onMouseUp={e => e.stopPropagation()}
							>
							<li className='li_of_paint'>
								<h3 className='tools_name'
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
    	 				<li className='li_of_paint'>
    	 					<h3 className='tools_name'
    	 						onMouseDown={e => e.stopPropagation()}
									onMouseMove={e => e.stopPropagation()}
									onMouseUp={e => e.stopPropagation()}
    	 					>
    	 						Tools
    	 						<img className='icons' src='./imgs/icons/edit.svg'/>
    	 					</h3>
          					<ul className="submenu brush ul_of_paint"
											onMouseDown={e => e.stopPropagation()}
											onMouseMove={e => e.stopPropagation()}
											onMouseUp={e => e.stopPropagation()}
          						>
            					<li className='li_of_paint' name='feltTip' onClick={(e) => this.props.takeBrushModel(e)}>
            						<img className='icons' src='./imgs/icons/brush.svg'/>
            						feltip
            					</li>
            					<li className='li_of_paint' name='pen' onClick={(e) => this.props.takeBrushModel(e)}>
            						<img className='icons' src='./imgs/icons/pen.svg'/>
            						pen
            					</li>
            					<li className='li_of_paint' name='spray' onClick={(e) => this.props.takeBrushModel(e)}>
            						<img className='icons' src='./imgs/icons/spray.svg'/ >
            						spray
            					</li>
            					<li className='li_of_paint' name='eraser' onClick={(e) => this.props.takeBrushModel(e)}>
            						<img className='icons' src='./imgs/icons/eraser.svg'/>
            						eraser
            					</li>
         					</ul>
        				</li>
        				<li className='li_of_paint'>
        					<h3 className='tools_name'
        						onMouseDown={e => e.stopPropagation()}
										onMouseMove={e => e.stopPropagation()}
										onMouseUp={e => e.stopPropagation()}
        					>
        						Tool-size
        						<img className='icons'
        						src='./imgs/icons/roller.svg'/>
        						</h3>
          					<ul className="submenu tool-size ul_of_paint"
          							onMouseDown={e => e.stopPropagation()}
												onMouseMove={e => e.stopPropagation()}
												onMouseUp={e => e.stopPropagation()}
          					>
            					<li className='li_of_paint' name='5'  onClick={(e) => this.props.takeSizetool(e)}>5px</li>
            					<li className='li_of_paint' name='10' onClick={(e) => this.props.takeSizetool(e)}>10px</li>
            					<li className='li_of_paint' name='15' onClick={(e) => this.props.takeSizetool(e)}>15px</li>
            					<li className='li_of_paint' name='20' onClick={(e) => this.props.takeSizetool(e)}>20px</li>
            					<li className='li_of_paint' name='25' onClick={(e) => this.props.takeSizetool(e)}>25px</li>
          						</ul>
        					</li>
        					<li className='li_of_paint'>
        						<h3 className='tools_name'
        							onMouseDown={e => e.stopPropagation()}
											onMouseMove={e => e.stopPropagation()}
											onMouseUp={e => e.stopPropagation()}>
        							<img className='icons' src='./imgs/icons/fill-drip.svg'/>Fill field
        						</h3>
        					</li>
      					</ul>
								<div id='paint_btn_block' onClick={e => e.stopPropagation()}>
									<BtnPaint handlerBtn={this.props.changePaintVisible}>X</BtnPaint>
									<BtnPaint handlerBtn={this.props.changePaintVisible}>-</BtnPaint>
								</div>
					</nav>
				);
	}

}

// export  {Controlers, color};
export default Controlers;


// <li className='li_of_paint'>
// 	<h3 className='tools_name'
// 	onMouseDown={e => e.stopPropagation()}
// 	onMouseMove={e => e.stopPropagation()}
// 	onMouseUp={e => e.stopPropagation()}
// 	>
// 		<img className='icons' src='./imgs/icons/ruler.svg'/>
// 		<input className='input_of_paint' type='text' id='ruler'/>
// 		px
// 	</h3>
// </li>
