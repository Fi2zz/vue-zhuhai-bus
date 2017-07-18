import Vue from 'vue'
import Router from 'vue-router'
import getLine from '../components/route.get.line.vue'
import showLine from '../components/route.show.line.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'get',
      component: getLine
    }, {
      path: '/line',
      name: 'view',
      component: showLine
    }

  ]
})
