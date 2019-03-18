import React from 'react';


const Controlers = () => (
		<nav className='controlers'> 
			<ul className='tools'>
				<li>
					<h3>
						<img className='icons' src='./imgs/icons/palette.svg'/> 
						<input type='color' id='color'/> 
					</h3>
				</li>
				<li>
					<h3>
						<img className='icons' src='./imgs/icons/ruler.svg'/> 
						<input type='text' id='ruler'/>
						px 
					</h3>
				</li>
    	 		<li>
    	 			<h3>Brush <img className='icons' src='./imgs/icons/edit.svg'/></h3>
          			<ul className="submenu brush">
            			<li> <img className='icons' src='./imgs/icons/brush.svg'/> brush </li>
            			<li><h5> <img className='icons' src='./imgs/icons/pen.svg'/>pen </h5></li>
            			<li><h5><img className='icons' src='./imgs/icons/spray.svg'/>spray </h5></li>
         			</ul>
        		</li>
        		<li>
        			<h3>Brush-size</h3>
          			<ul className="submenu brush-size">
            			<li><h5>5px</h5></li>
            			<li><h5>10px</h5></li>
            			<li><h5>15px</h5></li>
            			<li><h5>20px</h5></li>
            			<li><h5>25px</h5></li>
          			</ul>
        		</li>
        		<li><h3><img className='icons' src='./imgs/icons/fill-drip.svg'/>Fill field</h3></li>
      		</ul>
		</nav>
	)

export default Controlers;