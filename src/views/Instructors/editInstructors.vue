<template>
  <section class="section">
    <header class="section-header">
      <h1 class="section-header-title">Edytuj instruktora</h1>
      <el-button type="danger" round @click="edit">Zapisz</el-button>
    </header>
    <div class="instructor">
      <el-row :gutter="60">
        <el-col :md="12">
          <el-form class="instructor-tile">
            <el-form-item>
              
            </el-form-item>
            <el-form-item>
              <el-input type="text" v-model="instructor.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input type="textarea" rows="7" v-model="instructor.description"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :md="12">
          <div class="instructor-categories">
            <el-input type="text" v-model="newCategory" placeholder="Dodaj kategorię">
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
      <el-button type="success" round @click="edit">Zapisz</el-button>
      <el-button type="danger" round @click="deleteInstructor">Usuń instruktora</el-button>
    </footer>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "editInstructors",
  props: {
    id: Number
  },
  data: () => ({
    instructor: {
      name: "Jan Kowalski",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. A voluptate eaque laboriosam impedit sunt quibusdam fugiat, provident odio consectetur ratione optio ullam! Dolore nihil repudiandae voluptatem inventore maiores a ratione!",
      opinions: 16,
      avg: 4.5,
      categories: ["A1", "A2"]
    },
    imageUrl: '',
    newCategory: ""
  }),
  methods: {
    addCategory() {
      this.instructor.categories.push(this.newCategory);
      this.newCategory = "";
    },
    deleteCategory(category) {
      this.instructor.categories.splice(this.instructor.categories.indexOf(category));
    },
    async deleteInstructor() {
      try {
        const response = await axios.delete(`${$API}/instructors/delete/:${this.instructor.id}`);

        if (response) {
          this.$router.push("/instruktorzy");

          this.$notify({
            title: "Sukces",
            message: "Usunięto instruktora!",
            type: "success"
          });
        }
      } catch(error) {
        this.$notify({
          title: "Błąd",
          message: "Błąd serwera! Nie można usunąć instruktora",
          type: "error"
        });
      }
    },
    async edit() {
      try {
        const response = await axios.put(`${API}/instructors/:${this.id}`);
        response.data ? (this.instructor = response.data) : false;
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
      const response = await axios.get(`${$API}/instructors/:${this.id}`);
      response.data ? (this.instructor = response.data) : false;
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
