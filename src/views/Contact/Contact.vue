<template>
  <section class="section" id="contact">
    <header class="section-header">
      <h1 class="section-header-title">Dane kontaktowe</h1>
    </header>
    <el-row :gutter="60">
      <el-col :md="12">
        <ContactTile index="0"></ContactTile>
      </el-col>
      <el-col :md="12">
        <ContactTile index="1"></ContactTile>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import ContactTile from '@/components/ContactTile/ContactTile.vue';

export default {
  name: "Contact",
  components: {
    ContactTile
  }
};
</script>
