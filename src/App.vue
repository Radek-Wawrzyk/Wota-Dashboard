<template>
  <div id="app">
    <transition name="fade">
      <router-view/>
    </transition>
    <Preloader :loading="loading" v-if="!token"></Preloader>
  </div>
</template>

<script>
import Preloader from "./components/Preloader/Preloader.vue";
import { mapState } from "vuex";
export default {
  name: "App",
  data: () => ({
    loading: true
  }),
  components: {
    Preloader
  },
  computed: mapState({
    token: state => state.auth.token
  }),
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
};
</script>