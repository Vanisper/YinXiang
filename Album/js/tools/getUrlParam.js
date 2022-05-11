export default function getUrlParam(sUrl, sKey) {
  // 返回?后面#前面的
  let sParam = sUrl.split('?')[1].split('#')[0] // key=1&key=2&key=3&test=4
  // 进一步将参数分割为数组
  let arr = sParam.split('&') // ["key=1","key=2","key=3","test=4"]
  // 结果
  let res
  if (sKey) {
    // 如果指定参数
    // 结果为数组
    res = []
    for (let i = 0; i < arr.length; i++) {
      // 分割为键值对
      let temp = arr[i].split('=')
      // 存储指定key值的结果
      if (temp[0] === sKey) {
        res.push(temp[1])
      }
    }
    if (res.length === 1) {
      // 长度为1，返回字符串
      return res[0]
    } else if (res.length === 0) {
      // 长度为0，返回空字符串
      return ''
    } else {
      // 长度大于1返回数组
      return res
    }
  } else {
    // 如果不指定参数
    // 结果为对象
    res = {}
    if (sParam === undefined || sParam === '') {
      return res
    }
    for (let i = 0; i < arr.length; i++) {
      // 分割为键值对
      let temp = arr[i].split('=')
      // 判断是否已存在结果
      if (!(temp[0] in res)) {
        // temp[0]为键，temp[1]的数组为值
        res[temp[0]] = []
      }
      // 使用变量动态访问对象属性用obj[a]不能用obj.a
      res[temp[0]].push(temp[1])
    }
  }
  return res
}
