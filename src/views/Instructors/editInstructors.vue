<template>
  <section class="section">
    <header class="section-header">
      <h1 class="section-header-title">Edytuj instruktora</h1>
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
              <img :src="thumbnailImage ? thumbnailImage : instructor.avatar" height="150">
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
            @click="edit"
            :disabled="!this.instructor.fullname ||  !this.instructor.avatar || !this.instructor.categories"
          >Zapisz zmiany</el-button>
        </div>
      </el-form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { $API } from "@/main.js";

export default {
  name: "editInstructors",
  props: {
    id: String
  },
  data: () => ({
    instructor: {},
    imageUrl: "",
    newCategory: "",
    thumbnailImage: null
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
    async deleteInstructor() {
      try {
        const response = await axios.delete(
          `${$API}/instructors/${this.instructor._id}`
        );

        if (response) {
          this.$router.push("/instruktorzy");

          this.$notify({
            title: "Sukces",
            message: "Usunięto instruktora!",
            type: "success"
          });
        }
      } catch (error) {
        this.$notify({
          title: "Błąd",
          message: "Błąd serwera! Nie można usunąć instruktora",
          type: "error"
        });
      }
    },
    async edit() {
      try {
        console.log(this.instructor);
        
        const formData = new FormData();
        formData.append(
          "avatar",
          this.instructor.avatar,
          this.instructor.avatar.name
        );
        formData.append("fullname", this.instructor.fullname);
        formData.append("description", this.instructor.description || '');
        formData.append("categories", this.instructor.categories);
        const response = await axios.put(
          `${$API}/instructors/${this.instructor._id}/update`,
          formData
        );
        this.$router.push("/instruktorzy");

        this.$notify({
          title: "Sukces!",
          message: "Pomyślnie zaktualizowano instruktora",
          type: "success"
        });
      } catch (error) {
        this.$notify({
          title: "Błąd",
          message: "Błąd serwera! Nie udało się zaktualizował instruktora.",
          type: "error"
        });
      }
    }
  },
  async created() {
    try {
      const response = await axios.get(`${$API}/instructors/${this.id}`);

      response.data ? (this.instructor = response.data.instructor) : false;

      console.log(this.instructor);
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

<style src="./instructor.scss" scoped lang="scss" />
