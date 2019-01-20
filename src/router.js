import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('./views/Dashboard.vue')
    }
  ]
});