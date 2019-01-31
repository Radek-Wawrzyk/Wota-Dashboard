import Vue from 'vue';
import Vuex from 'vuex';

//Modules
import instructors from './modules/instructors.js';
import auth from './modules/auth.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    instructors,
    auth
  }
});
