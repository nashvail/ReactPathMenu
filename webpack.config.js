
const path = require("path");

module.exports = {
	mode: 'development', // or 'production' or 'none'
	entry: './app.js',
	output: {
	  path: path.resolve(__dirname, "public"),
	  filename: "bundle.js",
	  publicPath: "/",
	},
	module: {
		rules: [
		  {
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
			  loader: 'babel-loader',
			  options: {
				presets: ['@babel/preset-env', '@babel/preset-react'],
				plugins: ['@babel/plugin-syntax-jsx']
				// Add other plugins if needed
			  },
			},
		  },
		],
	  },
  };
  