var http = require("http");
const headers = {
  "Content-Type": "application/json",
  "User-Agent":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 wechatdevtools/0.7.0 MicroMessenger/6.3.9 Language/zh_CN webview/0",
  Cookie:
    "IfAuth=93cba07454f06a4a960172bbd6e2a435;ptcz=93cba07454f06a4a960172bbd6e2a435;",
  Referer: "http://www.zhbuswx.com/busline/BusQuery.html"
};

const HOST = "www.zhbuswx.com";
const api = `/Handlers/BusQuery.ashx?handlerName=`;
const HANDLER_LIST = {
  search: "GetLineListByLineName",
  line: "GetStationList",
  current: "GetBusListOnRoad"
};
module.exports = function(opts) {
  var searchPath = "";
  var route = HANDLER_LIST[opts.key];
  var key = opts.key;
  if (key === "search") {
    searchPath = `${route}&key=${opts.name}`;
  }
  if (key === "line") {
    searchPath = `${route}&lineId=${opts.name}`;
  }
  if (key === "current") {
    searchPath = `${route}&lineName=${encodeURI(
      opts.name
    )}&fromStation=${encodeURI(opts.from)}`;
  }

  var options = {
    port: 80,
    host: opts.host || HOST,
    path: `${api}${searchPath}`,
    method: "GET",
    headers: headers,
    encoding: null
  };
  return new Promise((resolve, reject) => {
    var body = "";
    var req = http.request(options, res => {
      res.on("data", chunk => (body += chunk));
      res.on("end", () => {
        resolve(body);
      });
      res.on("error", err => reject(err));
    });
    req.end();
  });
};
