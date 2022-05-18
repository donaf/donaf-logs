/*
 * @Author: qf
 * @Date: 2022-04-23 14:39:18
 * @LastEditTime: 2022-05-11 09:52:13
 * @LastEditors: qf
 * @Description: 
 */
/*
 * @Author: qf
 * @Date: 2022-04-21 17:54:14
 * @LastEditTime: 2022-04-23 14:36:06
 * @LastEditors: qf
 * @Description: 
 */
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const devConfig = require('./webpack.dev.config')
const prodConfig = require('./webpack.prod.config')

let config = process.env.NODE_ENV === 'development' ? devConfig : prodConfig

module.exports = merge(baseConfig, config)