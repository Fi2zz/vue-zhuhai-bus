import Vue from "vue";
import App from "./App";
import router from "./router";
import "./stylus/style.styl";

import api from "./api";
Vue.prototype.$api = api;
Vue.prototype.$padding = number => {
  return number <= 9 ? `0${number}` : `${number}`;
};
new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: { App }
});
