<template>
  <section id="gallery" class="section">
    <header class="section-header">
      <h1 class="section-header-title">Galeria</h1>
    </header>
    <div class="gallery-wrapper">
      <h2>Nowe zdjęcie</h2>
      <div class="image-form">
        <el-select v-model="value" placeholder="Galeria">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <input type="file" @change="onFileChanged">
        <el-button type="success" round @click="onUpload" :disabled="!value || !selectedFile">Dodaj</el-button>
      </div>
    </div>
    <GalleryView
      v-if="galeryHall.length > 0"
      galleryTitle="Galeria Sali Edukacyjnej (wnętrze):"
      v-bind:items="galeryHall"
    />
    <GalleryView
      v-if="galeryPlace.length > 0"
      galleryTitle="Plac manewrowy (teren, samochody, przeszkody):"
      v-bind:items="galeryPlace"
    />
  </section>
</template>

<script>
import GalleryView from "@/components/GalleryView/GalleryView.vue";
import axios from "axios";
import { $API } from "@/main.js";

export default {
  name: "Gallery",
  components: {
    GalleryView
  },
  data: () => ({
    selectedFile: null,
    options: [
      {
        value: "sala",
        label: "Sala szkoleniowa"
      },
      {
        value: "plac",
        label: "Plac manewrowy"
      }
    ],
    value: "",
    galeryPlace: null,
    galeryHall: null
  }),
  methods: {
    onFileChanged(event) {
      const file = event.target.files[0];
      this.selectedFile = file;
    },
    async onUpload() {
      const formData = new FormData();
      formData.append("image", this.selectedFile, this.selectedFile.name);
      formData.append("category", this.value);
      try {
        const response = await axios.post(`${$API}/galery/`, formData);

        const newData = await axios.get(`${$API}/galery/`);
        this.galeryPlace = newData.data.filter(
          galery => galery.category === "plac"
        );
        this.galeryHall = newData.data.filter(
          galery => galery.category === "sala"
        );
        this.selectedFile = null;
        this.value = "";

        this.$notify({
          title: "Sukces!",
          message: "Pomyślnie dodano nowe zdjęcie do galerii",
          type: "success"
        });
      } catch (error) {
        console.log(error.data);
        this.$notify({
          title: "Błąd",
          message: "Błąd serwera! Nie udało się dodać zdjęcia.",
          type: "error"
        });
      }
    }
  },
  async mounted() {
    try {
      const response = await axios.get(`${$API}/galery/`);
      this.galeryPlace = response.data.filter(
        galery => galery.category === "plac"
      );
      this.galeryHall = response.data.filter(
        galery => galery.category === "sala"
      );
    } catch (error) {
      this.$notify({
        title: "Błąd",
        message: "Błąd serwera! Nie udało się pobrać zdjęć.",
        type: "error"
      });
    }
  }
};
</script>


<style scoped src="./Gallery.scss" lang="scss" />