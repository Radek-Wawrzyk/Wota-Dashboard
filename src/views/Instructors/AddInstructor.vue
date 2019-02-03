<template>
  <section class="section">
    <header class="section-header">
      <h1 class="section-header-title">Dodaj instruktora</h1>
      <el-button type="danger" round @click="addInstructor">Zapisz</el-button>
    </header>
    <div class="instructor">
      <el-row :gutter="60">
        <el-col :md="12">
          <el-form class="instructor-tile">
            <el-form-item></el-form-item>
            <el-form-item>
              <el-input
                type="text"
                v-model="instructor.name"
                placeholder="Imię i nazwisko"
                name="name"
                v-validate="'required'"
              ></el-input>
              <transition name="fade-down">
                <span
                  class="el-form-item__error"
                  v-if="errors.has('name')"
                >{{errors.first('name')}}</span>
              </transition>
            </el-form-item>
            <el-form-item>
              <el-input
                type="textarea"
                rows="7"
                v-model="instructor.description"
                placeholder="Opis"
                name="description"
                v-validate="'required'"
              ></el-input>
              <transition name="fade-down">
                <span
                  class="el-form-item__error"
                  v-if="errors.has('description')"
                >{{errors.first('description')}}</span>
              </transition>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :md="12">
          <div class="instructor-categories">
            <el-input type="text" v-model="newCategory" placeholder="Dodaj kategorię" >
              <template slot="append">
                <el-button type="danger" @click="addCategory">Dodaj</el-button>
              </template>
            </el-input>
            <el-tag
              v-for="(category, index) in instructor.categories"
              :key="index"
              closable
              type="danger"
              @close="deleteCategory(category)"
            >{{category}}</el-tag>
          </div>
        </el-col>
      </el-row>
    </div>
    <footer class="section-footer">
      <el-button type="normal" round @click="$router.go(-1)">Anuluj</el-button>
      <el-button type="danger" round @click="addInstructor">Zapisz</el-button>
    </footer>
  </section>
</template>

<script>
import axios from 'axios';
import { $API } from '@/main.js';

export default {
  name: "AddInstructors",
  data: () => ({
    instructor: {
      name: "",
      description: "",
      opinions: 0,
      avg: 0,
      categories: ["A1", "A2"]
    },
    imageUrl: "",
    newCategory: ""
  }),
  methods: {
    addCategory() {
      this.instructor.categories.push(this.newCategory);
      this.newCategory = "";
    },
    deleteCategory(category) {
      this.instructor.categories.splice(
        this.instructor.categories.indexOf(category)
      );
    },
    async addInstructor() {
      const valid = await this.$validator.validateAll();

      const request = async () => {
        try {
          const response = await axios.post(`${API}/instructors/add-instructor`);
          response.data ? (this.instructor = response.data) : false;
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
