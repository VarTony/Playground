const combineFunctions = require('../lib/combine-functions')

module.exports = class Router {

	constructor() {
		this.routes = {};
		this.methods = ['get', 'post', 'put', 'delete'];
      this.methods.forEach(method => {
			this[method] = (path, ...middleware) => {

				const fns = combineFunctions(middleware);
				if (!this.routes[path]) this.routes[path] = {};

				this.routes[path][method] = fns;
			}
		})
	}

	toMiddleware() {
		return (ctx, next) => {
			const { path, method } = ctx
			if (!this.routes[path]) {
				ctx.body = { message: 'Not Found' }
				ctx.status = 404
				return Promise.resolve()
			}
			if (!this.routes[path][method]) {
				ctx.body = { message: 'Method not supported' }
				ctx.status = 405
				return Promise.resolve()
			}
			return this.routes[path][method](ctx, next)
		}
	}
}
