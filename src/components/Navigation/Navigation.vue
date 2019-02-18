<template>
  <nav class="navigation">
    <div class="navigation-column">
      <figure class="navigation-logo">
        <img src="../../assets/logoC.png" alt="Wota" />
      </figure>
      <button class="navigation-button" :class="{'active': menuStatus}" :aria-expanded="menuStatus ? 'true' : 'false'" @click="toggleMenu" aria-label="Open menu">
        <span class="navigation-button-bar"></span>
        <span class="navigation-button-bar"></span>
        <span class="navigation-button-bar"></span>
      </button>
    </div>
    <!-- <div class="navigation-column">
      <ul class="navigation-settings">
        <li class="navigation-settings-item">
          <span class="navigation-user">Admin Adminowski</span>
        </li>
        <li class="navigation-settings-item">
          <el-button type="danger" round>
            Wyloguj
          </el-button>
        </li>
      </ul>
    </div> -->
  </nav>
</template>

<script>

export default {
  name: 'Navigation',
  props: [
    'menuStatus'
  ],
  methods: {
    toggleMenu() {
      this.$emit('toggleMenu', this.menuStatus);
    }
  }
};

</script>

<style scoped src="./Navigation.scss" lang="scss" />
