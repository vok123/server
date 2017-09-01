require('colors');
const net = require('net');
const Ip = require('./ip');
const express = require('express');
const app = express();
const curPath = process.cwd();

module.exports = {
  checkPort (port) { // 监测端口
    return new Promise((resolve, reject) => {
      let server = net.createServer().listen(port);
      server.on('listening', () => { // 执行这块代码说明端口未被占用
        server.close();
        resolve(true, port);
      });
      server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') { // 端口已经被使用
          console.log(`${port}端口已经被占用 !`.underline.red);
          reject();
        }
      });
    });
  },
  createServer (program) { // 创建静态资源服务
    const { port, history, allowOrigin } = program;
    if (allowOrigin) {
      console.log('Access-Control-Allow-Origin: *'.yellow);
      app.all('*', function(_, res, next) {
        res.header("Cache-Control", "max-age=76000");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        next();
      });
    }
    if (history) {
      app.use(require('connect-history-api-fallback')());
      console.log('Enable history mode'.yellow);
    }
    app.use(express.static(curPath));
    app.listen(port, () => {
      console.log(('Listen at: ' + curPath).yellow);
      console.log(`>>>>> url: http://localhost:${port}  ||  http://${Ip.ip}:${port}`.green);
    });
  }
}