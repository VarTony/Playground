
const path = require('path');


module.exports = {
  entry: "./view/server004/App.jsx",
  output: {
    path: path.join(__dirname, "view/dist"),
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