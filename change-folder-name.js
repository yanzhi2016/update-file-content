// 读取wx-config/public/static/images/footbar文件夹下的文件夹
// 遍历读取文件夹下的文件，重命名
const path = require('path');
const fs = require('fs')

const basePath = '../wx-config/public/static/images/footbar'

const dirs = fs.readdirSync(path.resolve(__dirname, basePath));

dirs.map(el => {
  // fs.rename(oldPath, newPth)
  if (el.indexOf('-1') >= 0) {
    return
  }
  fs.rename(path.resolve(__dirname,  basePath + '/' + el + '/填充'), path.resolve(__dirname, basePath + '/' + el + '/full'), (err, data) => {
    if(err) {
      console.log(err)
    } else {
      console.log(el + '/填充', '已改为', el + '/full')
    }
  })
  fs.rename(path.resolve(__dirname,  basePath + '/' + el + '/线框'), path.resolve(__dirname,  basePath + '/' + el + '/line'), (err, data) => {
    if(err) {
      console.log(err)
    } else {
      console.log(el + '/线框', '已改为', el + '/line')
    }
  })
})