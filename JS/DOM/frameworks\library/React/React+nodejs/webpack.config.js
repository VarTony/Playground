
const pathChanger = (dirname, path) => {
	if(path[0] === '/' || (path[0] === 0 && path[1] === '/')) path = path.substring(1);
	if(dirname[dirname.length - 1] === '/') return `${dirname + path}`;
	else return `${dirname}'/'${path}`;
	}


module.exports = { 
	entery: pathChanger(__dirname, './view/src/randn.js'),
	output:  {
		path: pathChanger(__dirname, 'view/webpackDist'),
		filename : 'main.js'
	},
	devtool: '#sourcemap',
	module : {
		loaders : [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loaders: ['babel-loader']
			}	

		]
	}
}


