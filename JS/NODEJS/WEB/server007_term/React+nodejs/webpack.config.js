
const path = require('path');

// const pathChanger = (dirname, path) => {
// 	if(path[0] === '/' || (path[0] === '.' && path[1] === '/')) path = path.substring(1);
// 	if(dirname[dirname.length - 1] === '/') return `${dirname + path}`;
// 	else return `${dirname}'/'${path}`;
// 	}

module.exports = {
  entry: "./view/src/App.jsx",
  output: {
    path: path.join(__dirname, "view/webpackDist"),
    filename: "App.js"
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}


// 	module : {
// 		loaders : [
// 			{
// 				test: /\.jsx?$/,
// 				exclude: /(node_modules)/,
// 				loaders: ['babel-loader']
// 			}	

// 		]
// 	}
// }


