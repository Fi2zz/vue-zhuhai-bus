import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);


const NODE_ENV = process.env.NODE_ENV;
const timestamp = (new Date()).getTime();

let locations = window.location
let uri = '';

if (NODE_ENV === 'development') {
  uri = `${locations.protocol}//${locations.hostname}:8000/bus/`
} else if (NODE_ENV === 'production') {
  uri = `${locations.protocol}//${locations.host}/bus/`
}


export default function api(option) {
  let url = `${uri}?type=${option.type}&name=${option.name}&_=${timestamp}`;
  if (option.from) {
    url += `&from=${option.from}`
  }
  return Vue.http.get(url).then(res => {
    return res.data
  }, res => {
    return Promise.reject(res)
  })
}
