<template>
  <div class="overflow" :class="{'active': menuStatus}" @click="closeMenu"></div>
</template>

<script>
export default {
  name: 'overflow',
   props: [
    'menuStatus'
  ],
  methods: {
    closeMenu() {
      this.$emit('closeMenu', this.menuStatus);
    }
  }
};
</script>

<style src="./Overflow.scss" scoped lang="scss" />