/*
 * @Author: qf
 * @Date: 2022-03-05 17:05:29
 * @LastEditTime: 2022-03-05 17:05:30
 * @LastEditors: qf
 * @Description:
 */
const modulesFiles = require.context('./options', true, /index.js$/)
let modules = {}
modulesFiles.keys().forEach((item) => {
  modules = Object.assign({}, modules, modulesFiles(item).default)
})
export default modules
