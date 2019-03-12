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
import "vue-wysiwyg/dist/vueWysiwyg.css";

//Validate librabry
import VeeValidate from 'vee-validate';



Vue.use(ElementUI, { locale })
//Wysiwyg libray
import wysiwyg from "vue-wysiwyg";

//Use libraries
Vue.use(ElementUI);
Vue.use(VeeValidate);
Vue.use(wysiwyg, {});

// export const $API = Vue.prototype.$API = 'https://hubertkuzdak.com';
export const $API = Vue.prototype.$API = 'http://localhost:3000';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
