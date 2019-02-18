<template>
  <section class="section section-one-column">
    <header class="section-header">
      <h1 class="section-header-title">Dodaj pojazd</h1>
      <el-button type="danger" round @click="addVehicle">Zapisz</el-button>
    </header>
    <div class="vehicle">
      <el-form>
        {{this.vehicle}}
        <el-form-item>
          <el-input
            placeholder="Nazwa pojazdu"
            v-model="vehicle.name"
            name="name"
            v-validate="'required'"
          ></el-input>
          <transition name="fade-down">
            <span class="el-form-item__error" v-if="errors.has('name')">{{errors.first('name')}}</span>
          </transition>
        </el-form-item>
        <el-form-item>
          <input type="file" @change="onFileChanged">
        </el-form-item>
        <el-form-item>
          <div class="vehicle-categories">
            <el-input type="text" v-model="newCategory" placeholder="Dodaj kategorię">
              <template slot="append">
                <el-button type="danger" @click="addCategory">Dodaj</el-button>
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
      <el-button type="danger" round @click="addVehicle">Zapisz</el-button>
    </footer>
  </section>
</template>

<script>
import axios from "axios";
import { $API } from "@/main.js";

export default {
  name: "AddVehicle",
  data: () => ({
    vehicle: {
      name: "",
      categories: [],
      status: true,
      img: null
    },
    newCategory: ""
  }),
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
      const file = event.target.files[0];
      this.vehicle.img = file;
    },
    async addVehicle() {
      // const valid = await this.$validator.validateAll();
      
      const formData = new FormData();
      formData.append("image", this.vehicle.img, this.vehicle.img.name);
      formData.append("title", this.vehicle.name);
      formData.append("visible", true);
      formData.append("categories", this.vehicle.categories);
      try {
        const response = await axios.post(`${$API}/vehicles/`, formData);
        this.$router.push("/pojazdy");
        this.$notify({
          title: "Sukces!",
          message: "Pomyślnie dodano pojazd",
          type: "success"
        });
      } catch (error) {
        console.log(error.data);
        this.$notify({
          title: "Błąd",
          message: "Błąd serwera! Nie udało się dodać pojazdu.",
          type: "error"
        });
      }

      // valid ? request() : false;
    }
  }
};
</script>

<style scoped src="./Vehicle.scss" lang="scss" />
