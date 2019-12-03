var HtmlWebPackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /.html$/,
        use: ['html-loader']
      }
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    },
    extensions: ['.tsx', '.ts', '.js', '.json'],
    mainFiles: ['index']
  },
  plugins: [
    new HtmlWebPackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        filename: './index.html'
    })
  ],
  devtool: '#source-map'
};
