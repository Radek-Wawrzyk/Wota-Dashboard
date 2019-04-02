import router from "../../router.js";
export default {
  state: {
    userName: null,
    token: localStorage.getItem('token') || null,
    loginError: null
  },
  mutations: {
    LOGOUT: state => {
      state.token = null;
      localStorage.removeItem('token');
      router.push('/logowanie');
    },
    LOGIN: (state, payload) => {
      state.token = payload;
      localStorage.setItem('token', state.token);
      router.push('/');
    }
  }
}