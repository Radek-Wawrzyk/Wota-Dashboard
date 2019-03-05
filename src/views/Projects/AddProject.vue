<template>
  <section class="section section-one-column">
    <header class="section-header">
      <h1 class="section-header-title">Dodaj projekt</h1>
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
            <span class="el-form-item__error" v-if="errors.has('name')">{{errors.first('name')}}</span>
          </transition>
        </el-form-item>
        <el-form-item>
          <el-input
            type="textarea"
            rows="3"
            cols="100"
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
          <wysiwyg v-model="project.content" placeholder="Treść projektu"/>
        </el-form-item>
      </el-form>
      <div class="project-img document-upload">
        <UploadFile/>
      </div>
      <div class="project-img">
        <div class="project-img-tile">
          <h4 class="project-img-tile-header">Dodaj okładkę projektu</h4>
          <img v-if="projectCoverImage" :src="projectCoverImage" width="150" height="150">
          <p class="project-img-tile-description">Grafika powinna mieć wymiaryt 1200px na 500px</p>
        </div>
        <div class="project-img-tile">
          <input type="file" @change="onFileChanged">
        </div>
      </div>
    </div>
    <footer class="section-footer">
      <el-button type="normal" round @click="$router.go(-1)">Anuluj</el-button>
      <el-button
        type="danger"
        round
        @click="addProject"
        :disabled="!this.project.title || !this.project.subTitle || !this.project.content || !this.project.coverImage"
      >Opublikuj</el-button>
    </footer>
  </section>
</template>

<script>
import axios from "axios";
import { $API } from "@/main.js";
import UploadFile from "../../components/UploadFile/UploadFile";

export default {
  name: "AddProject",
  components: {
    UploadFile
  },
  data: () => ({
    project: {
      title: "",
      subTitle: "",
      content: "",
      coverImage: null
    },
    projectCoverImage: null
  }),
  methods: {
    async addProject() {
      const valid = await this.$validator.validateAll();

      const formData = new FormData();
      formData.append("title", this.project.title);
      formData.append("subtitle", this.project.subTitle);
      formData.append("content", this.project.content);
      formData.append("image", this.project.coverImage);
      formData.append("status", true);

      const request = async () => {
        try {
          const response = await axios.post(`${$API}/projects`, formData);
          this.$router.push("/projekty");

          this.$notify({
            title: "Sukces!",
            message: "Pomyślnie Dodano projekt!",
            type: "success"
          });
        } catch (error) {
          this.$notify({
            title: "Błąd",
            message: "Błąd serwera! Nie udało się dodać projektu.",
            type: "error"
          });
        }
      };

      valid ? request() : false;
    },
    onFileChanged(event) {
      this.project.coverImage = event.target.files[0];
      const oFReader = new FileReader();
      oFReader.readAsDataURL(event.target.files[0]);

      oFReader.onload = oFREvent => {
        this.projectCoverImage = oFREvent.target.result;
      };
    }
  }
};
</script>

<style scoped src="./Projects.scss" lang="scss" />