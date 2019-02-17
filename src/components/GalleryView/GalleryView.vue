<template>
  <div class="gallery-wrapper" v-if="items.length > 0">
    <el-row>
      <el-col :span="24">
        <h4>{{this.galleryTitle}}</h4>
      </el-col>
    </el-row>
    <div class="gallery-items">
      <div class="gallery-item" v-for="item in items" :key="item._id">
        <img :src="item.image" alt="img">
        <p v-if="editing" @click="handleDelete(item._id)">Usuń</p>
      </div>
    </div>
    <div class="gallery-buttons">
      <el-button round @click="handleEdit">{{this.editing ? 'Zapisz' : 'Edytuj'}}</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { $API } from "@/main.js";

export default {
  name: "GalleryView",
  props: {
    galleryTitle: String,
    items: Array
  },
  data: () => ({
    editing: false
  }),
  methods: {
    handleEdit: function(event) {
      this.editing = !this.editing;
    },
    handleDelete: async function(id) {
      try {
        const response = await axios.delete(`${$API}/galery/${id}`);
        this.items = this.items.filter(item => item._id !== id);
        
        this.$notify({
          title: "Sukces!",
          message: "Zdjęcie zostało usunięte",
          type: "success"
        });
      } catch (error) {
        this.$notify({
          title: "Błąd",
          message: "Błąd serwera! Nie udało się pobrać zdjęć.",
          type: "error"
        });
      }
    }
  }
};
</script>


<style scoped src="./GalleryView.scss" lang="scss" />