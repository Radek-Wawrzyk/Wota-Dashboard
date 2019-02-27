<template>
  <section class="section section-one-column">
    <header class="section-header">
      <h1 class="section-header-title">Edytuj pojazd</h1>
      <el-button type="danger" round @click="editVehicle">Zapisz</el-button>
    </header>
    <div class="vehicle">
      <!-- {{this.vehicle}} -->
      <!-- <hr> -->
      <!-- {{this.vehicle.image}} -->
      <el-form>
        <el-form-item>
          <el-input
            placeholder="Nazwa pojazdu"
            v-model="vehicle.title"
            name="name"
            v-validate="'required'"
          ></el-input>
          <transition name="fade-down">
            <span class="el-form-item__error" v-if="errors.has('name')">{{errors.first('name')}}</span>
          </transition>
        </el-form-item>
        <el-form-item>
          <img :src="thumbnailImage ? thumbnailImage : vehicle.image" height="150">
          <br>
          <input type="file" @change="onFileChanged">
        </el-form-item>
        <el-form-item>
          <div class="vehicle-categories">
            <el-input
              type="text"
              v-model="newCategory"
              placeholder="Po wpisaniu kategorii np. A należy kliknąć niebieski przycisk po prawo aby dodać kategorię"
            >
              <template slot="append">
                <el-button type="danger" @click="addCategory" class="custom-button">Dodaj</el-button>
              </template>
            </el-input>
            <div class="vehicle-tags">
              <el-tag
                v-for="(category, index) in vehicle.categories"
                :key="index"
                closable
                type="danger"
                @close="deleteCategory(category)"
              >{{category}}</el-tag>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <footer class="section-footer section-footer-center">
      <el-button type="normal" round @click="$router.go(-1)">Anuluj</el-button>
      <el-button type="danger" round @click="editVehicle">Zapisz</el-button>
    </footer>
  </section>
</template>

<script>
import axios from "axios";
import { $API } from "@/main.js";

export default {
  name: "AddVehicle",
  data: () => ({
    vehicle: {},
    newCategory: "",
    thumbnailImage: null,
  }),
  props: {
    id: String
  },
  methods: {
    addCategory() {
      this.vehicle.categories.push(this.newCategory);
      this.newCategory = "";
    },
    deleteCategory(category) {
      this.vehicle.categories.splice(
        this.vehicle.categories.indexOf(category),
        1
      );
    },
    onFileChanged(event) {
      this.vehicle.image = event.target.files[0];
      const oFReader = new FileReader();
      oFReader.readAsDataURL(event.target.files[0]);

      oFReader.onload = oFREvent => {
        this.thumbnailImage = oFREvent.target.result;
      };
    },
    async editVehicle() {
      // const valid = await this.$validator.validateAll();
      const formData = new FormData();
      formData.append("title", this.vehicle.title);
      formData.append("categories", this.vehicle.categories);
      formData.append("image", this.vehicle.image, this.vehicle.image.name);
      formData.append("visible", this.vehicle.visible);

      try {
        await axios.put(`${$API}/vehicles/${this.id}/update`, formData);
        this.$router.push("/pojazdy");
        this.$notify({
          title: "Sukces!",
          message: "Pomyślnie zaktualizowano pojazd",
          type: "success"
        });
      } catch (error) {
        this.$notify({
          title: "Błąd",
          message: "Błąd serwera! Nie udało się edytować pojazdu.",
          type: "error"
        });
      }

      // const request = async () => {
      //   try {
      //     const response = await axios.put(`${$API}/vehicles/${this.id}/update`, this.vehicle);
      //     this.$router.push("/pojazdy");

      //     this.$notify({
      //       title: "Sukces!",
      //       message: "Pomyślnie zaktualizowano pojazd",
      //       type: "success"
      //     });
      //   } catch (error) {
      //     console.log(error.message);
      //     this.$notify({
      //       title: "Błąd",
      //       message: "Błąd serwera! Nie udało się edytować pojazdu.",
      //       type: "error"
      //     });
      //   }
      // };

      // valid ? request() : false;
    }
  },
  async created() {
    try {
      const response = await axios.get(`${$API}/vehicles/${this.id}`);
      response.data ? (this.vehicle = response.data.vehicle) : false;
    } catch (error) {
      this.$notify({
        title: "Błąd",
        message: "Błąd serwera!",
        type: "error"
      });
    }
  }
};
</script>

<style scoped src="./Vehicle.scss" lang="scss" />
