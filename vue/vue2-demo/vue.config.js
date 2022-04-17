/*
 * @Author: qf
 * @Date: 2022-04-16 21:37:33
 * @LastEditTime: 2022-04-16 21:55:41
 * @LastEditors: qf
 * @Description:
 */
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  transpileDependencies: true,
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
})
