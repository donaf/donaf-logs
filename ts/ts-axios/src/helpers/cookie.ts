/*
 * @Author: qf
 * @Date: 2022-07-05 11:23:03
 * @LastEditTime: 2022-07-05 11:25:04
 * @LastEditors: qf
 * @Description:
 */
/**
 * 读取cookie
 */
const cookie = {
  read(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
    return match ? decodeURIComponent(match[3]) : null
  }
}

export default cookie
