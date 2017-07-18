import Vue from 'vue'
import VueResource from  'vue-resource'

Vue.use(VueResource);
let locations = window.location,
  port = 3000;
const uri = `${locations.protocol}//${locations.hostname}:${port}`
const timestamp = (new Date()).getTime()
function search(line) {
  let url = `${uri}/getLine/?lineId=${line}`;
  return Vue.http.get(url).then(function (response) {
    return response.data;
  }, function (response) {
    return Promise.reject(response);
  })
}


function getLineRunning(name, from) {
  let url = `${uri}/getOnRoad/?lineName=${name}&fromStation=${from}`;
  return Vue.http.get(url).then(res => {
    return res.data
  }, res => {
    return Promise.reject(res)
  })

}
function getLineById(id) {
  let url = `${uri}/getStopList/?lineId=${id}&_=${timestamp}`
  return Vue.http.get(url).then(res => {
    return res.data
  }, res => {
    return Promise.reject(res)
  })

}
export  {
  search,
  getLineById,
  getLineRunning
}
