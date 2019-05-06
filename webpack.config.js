module.exports = {
  target: 'node',
  mode: 'production',
  module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
  }
};
