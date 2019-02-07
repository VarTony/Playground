import {diff, dx1, dx2, square} from 'diff';

const intgrl = (xs, xf = xs + 1, lim = 1e3, dx = (xf - xs) / lim, output = 0, dxxx = dx) => 
  	0 <= lim 
    	?intgrl(xs, xf, --lim, dx, output +=  dx * diff(xs + dxxx), dxxx += dx)
    	:output;

    	// ∫[xs, xf] f(x)dx  = F(xf) - F(xs) Основная теорема интегрального исчисления;


intgrl(5, 7);


//Version on loop;

// const intgrl = (xs, xf = xs + 1, lim = 1e5) => {
//   const dx = (xf - xs) / lim; 
//   let i = output = 0;
//   let dxxx = dx;
//   while(i <= lim) {
//     i++;
//     dxxx += dx;
//     output +=  dx * def(xs + dxxx);
//   }
//   return output;
// }

// intgrl(2, 3);
