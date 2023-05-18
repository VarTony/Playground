const square = x => x * x;

const dx1 = 1e-10;
const dx2 = 1e-15;

const diff = (x, dx = dx1, f = square) => (f(x + dx) - f(x)) / dx; 

export { diff, dx1, dx2, square };
