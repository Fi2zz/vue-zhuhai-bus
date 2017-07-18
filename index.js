const get = require('./app');
const ip = require('./getIp');

const express = require('express');
const app = express();
const HANDLER_GET_STATION_LIST = 'GetStationList';
const HANDLER_GET_LINELIST_BY_LINENAME = "GetLineListByLineName";
const HANDLER_GET_BUSLIST_ONROAD = "GetBusListOnRoad";

const cors = require('cors');
const querystring = require("querystring");


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}));

app.get('*', (req, res) => {
  let params = req.params;
  let query = req.query;
  let param = params[0].substring(1, params[0].length - 1);
  //查询路线 如 3
  if (param === 'getLine') {
    get({
      path: `${HANDLER_GET_LINELIST_BY_LINENAME}&key=${query.lineId}`,
      data: ``
    }).then(resp => {
      res.send(resp)
    })
  }
  //获取站点列表，如3路车
  if (param === 'getStopList') {
    get({
      path: `${HANDLER_GET_STATION_LIST}&lineId=${query.lineId}`,
      data: ``
    }).then(resp => {
      res.send(resp)
    })
  }

  //获取车辆实时列表，如3路车 车牌号 粤C18272  当前位置：叠石
  if (param === 'getOnRoad') {
    get({
      path: HANDLER_GET_BUSLIST_ONROAD + `&lineName=${encodeURI(query.lineName)}&fromStation=${encodeURI(query.fromStation)}`,
    }).then(body => {
      res.send(body)
    })
  }

});


app.listen(3000, ip(), function (err) {
  if (err) {
    console.log(err);
    process.exit();
  }
  console.log(`>Server is running on http://${ip()}:3000/`)


});
