// 对指定目录的指定组件升级，并且记录下升级日志

// autoChange为true时会更新代码，否则只在控制台输出使用当前模块的工程

const fs = require('fs');
const path = require('path');
const logs = require('./logs');

const projects = [
  path.resolve(__dirname, '../../dm-jc/cost-center/public/index.html'),
  path.resolve(__dirname, '../../dm-jc/damo-store/public/index.html'),
  path.resolve(__dirname, '../../dm-jc/damo-system/public/index.html'),
  path.resolve(__dirname, '../../dm-jc/dm-finance/public/index.html'),
  path.resolve(__dirname, '../../dm-jc/merchant-brand/public/index.html'),
  path.resolve(__dirname, '../../dm-jc/wx-config/public/index.html'),
  path.resolve(__dirname, '../../dm-jc/memberFour/public/index.html'),

  path.resolve(__dirname, '../../dm-yw/app-center/index.html'),
  path.resolve(__dirname, '../../dm-yw/service-supervision/public/index.html'),
  path.resolve(__dirname, '../../dm-yw/weimo4/public/index.html'),
  path.resolve(__dirname, '../../dm-yw/gyt-app/public/index.html'),
  path.resolve(__dirname, '../../dm-yw/gyt-admin/public/index.html'),
]
const components = {
  'link-tools': '2.1.4'
}

const componentsName = Object.keys(components);
const autoChange = false // false：查询使用到当前组件的项目 true：记录日志、更改代码

logs('开始修改组件版本号...');
projects.map(el => {
  let file = fs.readFileSync(el).toString();
  let newFile = ''
  componentsName.map(item => {
    if (file.indexOf(item) >= 0) {
      newFile = file.replace(/(<script src=.*\/components\/)([\w-]+)(\.)([\d\.]+)(\.js.*><\/script>)/gi, (str, $1, $2, $3, $4, $5) => {
        if ($2 == item && $4 != components[item]) {
          if (autoChange) {
            logs(`${el} ${$2}已由${$4}更新至${components[item]}`);
            $4 = components[item];
          } else {
            console.log(el)
          }
        }
        return $1 + $2 + $3 + $4 + $5;
      })
    }
  })
  if (autoChange && newFile.length > 0 && newFile != file) {
    fs.writeFileSync(el, newFile);
  }
})
logs('组件版本号修改完毕！');
