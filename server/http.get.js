let http = require('http');
const querystring = require("querystring");
const headers = {
  'Content-Type': 'application/json',
  'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 wechatdevtools/0.7.0 MicroMessenger/6.3.9 Language/zh_CN webview/0",
  'Cookie': 'IfAuth=93cba07454f06a4a960172bbd6e2a435;ptcz=93cba07454f06a4a960172bbd6e2a435;',
  "Referer": "http://www.zhbuswx.com/busline/BusQuery.html",
};

const HOST = 'www.zhbuswx.com';
const api = `/Handlers/BusQuery.ashx?handlerName=`;
//http gett请求客户端
module.exports = function (opts) {
  let options = {
    port: 80,
    host: opts.host || HOST,
    path: `${api}${opts.path}`,
    method: "GET",
    headers: headers,
    encoding: null
  };

  return new Promise((resolve, reject) => {
    let body = '';
    let req = http.request(options, (res) => {
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve(body)
      });
      res.on('error', err => reject(err));
    });
    req.end();
  })
}
