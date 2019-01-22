import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './store/index.js';
import './registerServiceWorker';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/main.scss';

//Use libraries
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
