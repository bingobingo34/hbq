/**
 * setCookie 用来设置 cookie 的方法
 * @param {STRING} key 你要存储的 cookie 的名称
 * @param {STRING} value 你要存储的 cookie 的值
 * @param {INT} expires 你设置的过期时间，按照秒计算的
 */
function setCookie(key, value, expires) {
  var time = new Date()
  var t1 = time.getTime() - 1000 * 60 * 60 * 8 + 1000 * expires
  time.setTime(t1)

  document.cookie = `${key}=${value};expires=${expires ? time : ''}`
}

/**
 * getCookie 用域获取 cookie 的某一个属性的值
 * @param {STRING} key 你要获取的 cookie 属性的名
 * @return {STRING}  就是你要获取的 cookie 属性的值
 */
function getCookie (key) {
  var arr = document.cookie.split('; ')

  // 提前准备一个变量，用于记录 cookie 的值
  var value = ''

  // 如果数组中的 第 0 项 为 true
  if (arr[0]) {
    // 如果能进入到这里，证明 arr[0] 为 true
    // console.log(arr)

    // 遍历数组
    arr.forEach(item => {
      // url=http://gz2008.com/day06_code/project/html/detail.html?id=5
      // [url,http://gz2008.com/day06_code/project/html/detail.html?id,5]
      
      var tmp = item.split('=');

      if (tmp[0] === key) {
        value = tmp[1]
      }
    })
  }

  return value
}

/**
 * delCookie 用来删除 cookie 中指定的内容的
 * @param {STRing} key 你要删除的 cookie 的名
 */
function delCookie (key) {
  setCookie(key, 'suibain', -10)
}
