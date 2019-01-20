<template>
  <div class="home">
    <Navigation v-on:toggleMenu="toggleMenu($event)" :menuStatus="menuStatus"></Navigation>
    <!-- <Menu></Menu> -->
    <main class="main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Navigation from '../components/Navigation/Navigation.vue';
//import Menu from '../components/Menu/Menu.vue';

export default {
  name: 'Dashboard',
  components: { 
    Navigation,
   // Menu
  },
  data: () => ({
    menuStatus: false
  }),
  methods: {
    toggleMenu(menuStatus) {
      this.menuStatus =! menuStatus;
    }
  }
};
</script>