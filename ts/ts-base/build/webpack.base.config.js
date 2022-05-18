/*
 * @Author: qf
 * @Date: 2022-04-21 17:54:02
 * @LastEditTime: 2022-05-11 09:51:24
 * @LastEditors: qf
 * @Description:
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: [{
          loader: 'ts-loader'
        }],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/tpl/index.html'
    })
  ]
}