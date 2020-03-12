export function throttle(fn, gapTime = 500) {
  let _lastTime = null
  return function() {
    const _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)
      _lastTime = _nowTime
    }
  }
}

/**
 * 把数组分割成长度为size的数组
 * @param {Array} arr 数组
 * @param {Number} size 每一个数组的长度
 */
function chunk(arr, size) {
  const arr2 = []
  for (let i = 0; i < arr.length; i = i + size) {
    arr2.push(arr.slice(i, i + size))
  }
  return arr2
}

/**
 * 随机单词列表转成符合对战选词的列表
 * @param {Array} list 随机单词列表
 * @param {Number} len 每一个题目有多少个选项
 */
export const formatList = (list, len) => {
  const lists = chunk(list, len)
  return lists.map(option => {
    const obj = { options: [] }
    const randomIndex = Math.floor(Math.random() * len)
    option.forEach((word, index) => {
      if (index === randomIndex) {
        obj['correctIndex'] = randomIndex
        obj['word'] = word.word
        obj['wordId'] = word._id
        obj['usphone'] = word.usphone
      }
      const { pos, tranCn } = word.trans.sort(() => Math.random() - 0.5)[0]
      let trans = tranCn
      if (pos) {
        trans = `${pos}.${tranCn}`
      }
      obj.options.push(trans)
    })
    return obj
  })
}