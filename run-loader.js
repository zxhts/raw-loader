/**
 *  loader-runner 介绍
    定义：loader-runner 允许你在不安装 webpack 的情况下运行 loaders

    作用：
    1、作为 webpack 的依赖，webpack 中使用它执行 loader
    2、进行 loader 的开发和调试
 */

const { runLoaders } = require('loader-runner');
const fs = require('fs');
const path = require('path');
const localTargetFile = path.join(process.cwd(), 'dist');

runLoaders(
  {
    resource: path.join(__dirname, './src/demo.txt'),
    loaders: [
      {
        loader: path.join(__dirname, './src/raw-loader.js'),
        options: {
          name: 'test',
        },
      },
    ],
    context: {
      emitFile: () => {},
    },
    readResource: fs.readFile.bind(fs),
  },
  (err, result) => {
    console.log(result);
    err ? console.log(err) : writeFile(result.result[0]);
  }
);

function writeFile(data) {
  if (!fs.existsSync(localTargetFile)) {
    fs.mkdirSync(path.join(process.cwd(), 'dist'));
    fs.writeFileSync(
      localTargetFile + '/result.txt',
      JSON.stringify(data, null, 2),
      'utf-8'
    );
    return;
  }

  if (fs.existsSync(localTargetFile)) {
    fs.writeFileSync(
      localTargetFile + '/result.txt',
      JSON.stringify(data, null, 2),
      'utf-8'
    );
    return;
  }
}
