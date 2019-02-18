import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './store/index.js';
import './registerServiceWorker';

//CSS libraries and CSS files
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/main.scss';
import locale from 'element-ui/lib/locale/lang/pl'

//Validate librabry
import VeeValidate from 'vee-validate';



Vue.use(ElementUI, { locale })
//Use libraries
Vue.use(ElementUI);
Vue.use(VeeValidate);

export const $API = Vue.prototype.$API = 'http://hubertkuzdak.com';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
