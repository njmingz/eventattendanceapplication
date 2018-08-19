 const path = require('path');
 const webpack = require('webpack');
 const CleanWebpackPlugin = require('clean-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   entry: {
     app: './src/index.js'
   },
   plugins: [
     new CleanWebpackPlugin(['dist']),
     new HtmlWebpackPlugin({
		 template: "./index.html"
     }),
	 new webpack.HotModuleReplacementPlugin()
   ],
   output: {
     filename: '[name].bundle.js',
		 path: path.resolve(__dirname, 'dist'),
		 publicPath: '/'
   },
   module:{
	   rules:[
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use:{
					loader:"babel-loader"
				}
			},
			{
				test:/\.css$/,
				use:["style-loader","css-loader"]
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use:[{
					loader: 'file-loader',
					options: {
							name: '[name].[ext]',
							outputPath: 'fonts/'
					}
				}]
			},
			{
				test: /\.(jpg|png)$/,
				use: {
					loader: "file-loader",
					options: {
						name: "[path][name].[hash].[ext]",
					},
				},
			},
	   ]
   }
 };