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
      state.userName = null;
      localStorage.removeItem('token');
      router.push('/logowanie');
    },
    LOGIN: (state, payload) => {
      state.token = payload.data.token;
      state.userName = payload.data.email;
      localStorage.setItem('token', state.token);
      router.push('/');
    }
  }
}