<template>
  <div class="home">
    <Navigation v-on:toggleMenu="toggleMenu($event)" :menuStatus="menuStatus"></Navigation>
    <Menu :menuStatus="menuStatus"></Menu>
    <Overflow :menuStatus="menuStatus" v-on:closeMenu="toggleMenu($event)"></Overflow>
    <Preloader :loading="loading" v-if="token"></Preloader>
    <main class="main">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Navigation from '../components/Navigation/Navigation.vue';
import Menu from '../components/Menu/Menu.vue';
import Overflow from '../components/Overflow/Overflow.vue';
import Preloader from '../components/Preloader/Preloader.vue';
import Footer from '../components/Footer/Footer.vue';
import { mapState } from 'vuex';

export default {
  name: 'Dashboard',
  components: { 
    Navigation,
    Menu,
    Overflow,
    Preloader,
    Footer
  },
  data: () => ({
    menuStatus: false,
    loading: true
  }),
  computed: mapState({
    token: state => state.auth.token
  }),
  methods: {
    toggleMenu(menuStatus) {
      this.menuStatus =! menuStatus;
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
};
</script>