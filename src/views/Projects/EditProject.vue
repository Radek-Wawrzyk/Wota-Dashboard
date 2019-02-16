<template>
  <section class="section section-one-column">
    <header class="section-header">
      <h1 class="section-header-title">Edytuj projekt</h1>
      <el-button type="danger" round @click="editProject">Zapisz</el-button>
    </header>
    <div class="project">
      <el-form class="instructor-tile">
        <el-form-item>
          <el-input
            type="text"
            v-model="project.title"
            placeholder="Tytuł"
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
            rows="3"
            v-model="project.subTitle"
            placeholder="Podtytuł"
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
        <el-form-item>
          <el-input
            type="textarea"
            rows="7"
            v-model="project.content"
            placeholder="Treść"
            name="content"
            v-validate="'required'"
          ></el-input>
          <transition name="fade-down">
            <span
              class="el-form-item__error"
              v-if="errors.has('content')"
            >{{errors.first('content')}}</span>
          </transition>
        </el-form-item>
      </el-form>
      <div class="project-img">
        <div class="project-img-tile">
          <h4 class="project-img-tile-header">Dodaj okładkę projektu</h4>
          <p class="project-img-tile-description">Grafika powinna mieć wymiaryt 1200px na 500px</p>
        </div>
        <div class="project-img-tile">
          <input type="file" />
        </div>
      </div>
    </div>
    <footer class="section-footer">
      <el-button type="normal" round @click="$router.go(-1)">Anuluj</el-button>
      <el-button type="danger" round @click="editProject">Opublikuj</el-button>
    </footer>
  </section>
</template>

<script>
import axios from 'axios';
import { $API } from '@/main.js';

export default {
  name: "editProject",
  data: () => ({
    project: {}
  }),
  props: {
    id: String
  },
  methods: {
    async editProject() {
      const valid = await this.$validator.validateAll();

      const request = async () => {
        try {
          const response = await axios.put(`${$API}/projects/${this.id}/update`, this.project);
          this.$router.push("/projekty");

          this.$notify({
            title: "Sukces!",
            message: "Pomyślnie zaktualizowano projekt!",
            type: "success"
          });
        } catch (error) {
          this.$notify({
            title: "Błąd",
            message: "Błąd serwera! Nie udało się zaktualizować projektu.",
            type: "error"
          });
        }
      };

      valid ? request() : false;
    }
  },
  async created() {
    try {
      const response = await axios.get(`${$API}/projects/${this.id}`);
      response ? this.project = response.data : false;
    } catch (error) {
      console.log(error);
      this.$notify({
        title: "Błąd",
        message: "Błąd serwera!",
        type: "error"
      });
    }
  },
};
</script>

<style scoped src="./Projects.scss" lang="scss" />