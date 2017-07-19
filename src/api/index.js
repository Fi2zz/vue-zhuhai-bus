import Vue from 'vue'
import VueResource from  'vue-resource'

Vue.use(VueResource);
let locations = window.location,
  port = 3000;
const uri = `${locations.protocol}//${locations.hostname}:${port}`

const timestamp = (new Date()).getTime();
function search(line) {
  let url = `${uri}/search/?line=${line}&_=${timestamp}`;
  return Vue.http.get(url).then(function (response) {
    return response.data;
  }, function (response) {
    return Promise.reject(response);
  })
}


function getRunning(name, from) {
  let url = `${uri}/current/?name=${name}&from=${from}&_=${timestamp}`;
  return Vue.http.get(url).then(res => {
    return res.data
  }, res => {
    return Promise.reject(res)
  })

}
function getLine(id) {
  let url = `${uri}/line/?id=${id}&_=${timestamp}`
  return Vue.http.get(url).then(res => {
    return res.data
  }, res => {
    return Promise.reject(res)
  })

}
export  {
  search,
  getLine,
  getRunning
}
