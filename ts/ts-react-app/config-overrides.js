/*
 * @Author: qf
 * @Date: 2022-04-25 09:12:07
 * @LastEditTime: 2022-04-25 09:12:08
 * @LastEditors: qf
 * @Description: 
 */

const {override, fixBabelImports} = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  })
)