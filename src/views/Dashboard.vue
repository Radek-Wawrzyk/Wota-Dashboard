<template>
  <div class="home">
    <Navigation v-on:toggleMenu="toggleMenu($event)" :menuStatus="menuStatus"></Navigation>
    <Menu :menuStatus="menuStatus"></Menu>
    <Overflow :menuStatus="menuStatus" v-on:closeMenu="toggleMenu($event)"></Overflow>
    <main class="main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Navigation from '../components/Navigation/Navigation.vue';
import Menu from '../components/Menu/Menu.vue';
import Overflow from '../components/Overflow/Overflow.vue';

export default {
  name: 'Dashboard',
  components: { 
    Navigation,
    Menu,
    Overflow
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