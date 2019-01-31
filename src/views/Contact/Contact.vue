<template>
  <section class="section" id="contact">
    <header class="section-header">
      <h1 class="section-header-title">Dane kontaktowe</h1>
    </header>
    <el-row :gutter="60">
      <el-col :md="12">
        <ContactTile location="school"></ContactTile>
      </el-col>
      <el-col :md="12">
        <ContactTile location="place"></ContactTile>
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
