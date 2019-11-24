module.exports = middleware => (ctx, next) => (function dispatch(i) {
	let fn = i !== middleware.length? middleware[i] : next;
	return fn
		? Promise.resolve(fn(ctx, () => dispatch(i + 1)))
		: Promise.resolve();
})(0);
