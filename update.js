// 仅限4.0，未正式接入商户前
// 对指定目录的指定组件升级，并且记录下升级日志

// 先配置工程目录和组件名称及版本号
// 再执行更新命令 node update
// autoChange为true时会更新代码，否则只记录日志

const cmd = require('node-cmd');
const fs = require('fs');
const path = require('path');
const logs = require('./logs');

const projects = [
  // path.resolve(__dirname, '../../dm-jc/cost-center/public/index.html'),
  // path.resolve(__dirname, '../../dm-jc/damo-store/public/index.html'),
  // path.resolve(__dirname, '../../dm-jc/damo-system/public/index.html'),
  // path.resolve(__dirname, '../../dm-jc/dm-finance/public/index.html'),
  // path.resolve(__dirname, '../../dm-jc/merchant-brand/public/index.html'),
  // path.resolve(__dirname, '../../dm-jc/wx-config/public/index.html'),
  path.resolve(__dirname, '../../dm-yw/app-center/index.html'),
  // path.resolve(__dirname, '../../dm-yw/service-supervision/public/index.html'),
  path.resolve(__dirname, '../../dm-yw/weimo4/public/index.html')
]
const components = {
  layout: '1.2.35'
}

const componentsName = Object.keys(components);
const autoChange = false // false：只记录日志不更改代码 true：既记录日志又更改代码

logs('开始修改组件版本号...');
projects.map(el => {
  let file = fs.readFileSync(el).toString();
  let newFile = ''
  componentsName.map(item => {
    if (file.indexOf(item) >= 0) {
      newFile = file.replace(/(<script src=.*\/components\/)([\w-]+)(\.)([\d\.]+)(\.js.*><\/script>)/gi, (str, $1, $2, $3, $4, $5) => {
        if ($2 == item && $4 != components[item]) {
          logs(`${el} ${$2}已由${$4}更新至${components[item]}`);
          $4 = components[item];
        }
        return $1 + $2 + $3 + $4 + $5;
      })
    }
  })
  if (newFile != file && autoChange) {
    fs.writeFileSync(el, newFile);
  }
})
logs('组件版本号修改完毕！');
