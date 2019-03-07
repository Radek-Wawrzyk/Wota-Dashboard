<template>
  <section class="section section-one-column">
    <header class="section-header">
      <h1 class="section-header-title">Dodaj instruktora</h1>
    </header>
    <div class="instructor">
      <el-form class="instructor-tile">
        <el-form-item>
          <el-input
            type="text"
            v-model="instructor.fullname"
            placeholder="Imię i nazwisko"
            name="name"
            v-validate="'required'"
          ></el-input>
          <transition name="fade-down">
            <span class="el-form-item__error" v-if="errors.has('name')">{{errors.first('name')}}</span>
          </transition>
        </el-form-item>
        <el-form-item>
          <div class="instructor-img">
            <div class="instructor-img-tile">
              <h4 class="instructor-img-tile-header">Dodaj zdjęcie instruktora</h4>
              <img v-if="thumbnailImage" :src="thumbnailImage" width="150" height="150">
            </div>
            <div class="instructor-img-tile">
              <input type="file" @change="onFileChanged">
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-input
            type="textarea"
            rows="7"
            v-model="instructor.description"
            placeholder="Opis"
            name="description"
          ></el-input>
          <transition name="fade-down">
            <span
              class="el-form-item__error"
              v-if="errors.has('description')"
            >{{errors.first('description')}}</span>
          </transition>
        </el-form-item>
        <el-form-item>
          <el-input
            type="text"
            v-model="newCategory"
            placeholder="Przypisz instruktorowi kategorie np. B1 a następnie kliknij niebieski przycisk dodaj"
          >
            <template slot="append">
              <el-button type="danger" @click="addCategory" class="custom-button">Dodaj</el-button>
            </template>
          </el-input>
          <el-tag
            v-for="(category, index) in instructor.categories"
            :key="index"
            closable
            type="danger"
            @close="deleteCategory(category)"
          >{{category}}</el-tag>
        </el-form-item>
        <div class="submit-button">
          <el-button
            type="danger"
            round
            @click="addInstructor"
            :disabled="!this.instructor.fullname ||  !this.instructor.avatar || !this.instructor.categories"
          >Dodaj instruktora</el-button>
        </div>
      </el-form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { $API } from "@/main.js";

export default {
  name: "AddInstructors",
  data: () => ({
    instructor: {
      fullname: "",
      description: "",
      categories: [],
      avatar: null
    },
    thumbnailImage: null,
    newCategory: ""
  }),
  methods: {
    onFileChanged(event) {
      this.instructor.avatar = event.target.files[0];
      const oFReader = new FileReader();
      oFReader.readAsDataURL(event.target.files[0]);

      oFReader.onload = oFREvent => {
        this.thumbnailImage = oFREvent.target.result;
      };
    },
    addCategory() {
      this.instructor.categories.push(this.newCategory);
      this.newCategory = "";
    },
    deleteCategory(category) {
      this.instructor.categories.splice(
        this.instructor.categories.indexOf(category),
        1
      );
    },
    async addInstructor() {
      const valid = await this.$validator.validateAll();

      const request = async () => {
        try {
          const formData = new FormData();
          formData.append(
            "avatar",
            this.instructor.avatar,
            this.instructor.avatar.name
          );
          formData.append("fullname", this.instructor.fullname);
          formData.append("description", this.instructor.description || '');
          formData.append("categories", this.instructor.categories);
          const response = await axios.post(`${$API}/instructors`, formData);
          this.$router.push("/instruktorzy");

          this.$notify({
            title: "Sukces!",
            message: "Pomyślnie Dodano instruktora",
            type: "success"
          });
        } catch (error) {
          this.$notify({
            title: "Błąd",
            message: "Błąd serwera! Nie udało się dodać instruktora.",
            type: "error"
          });
        }
      };

      valid ? request() : false;
    }
  }
};
</script>

<style scoped src="./instructor.scss" lang="scss" />
