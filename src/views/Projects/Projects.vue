<template>
  <section id="projects" class="section">
    <header class="section-header">
      <h1 class="section-header-title">Projekty</h1>
      <el-button type="danger" round @click="$router.push(`/projekty/dodaj-projekt`)">Dodaj</el-button>
    </header>
    <div class="indexButton" v-bind:style="{marginBottom: '25px'}">
      <el-button @click="editIndexes">{{this.isEditing ? 'Zapisz' : 'Edytuj'}} kolejność</el-button>
    </div>
    <el-table
      :data="projects.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      border
      empty-text="Brak projektów"
    >
      <el-table-column label="Kolejność" prop="index">
        <template slot-scope="scope">
          <!-- {{scope.row}} -->
          <el-input v-model="scope.row.index" :disabled="!isEditing"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="Tytuł" prop="title"></el-table-column>
      <el-table-column label="Podtytuł" prop="subtitle"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <!-- <el-input v-model="search" size="mini" placeholder="Znajdź instruktora"/> -->
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="$router.push(`/projekty/${scope.row._id}`)">Edytuj</el-button>
          <el-button size="mini" type="danger" @click="deleteProject(scope)">Usuń</el-button>
          <!-- <el-radio-group
            v-model="scope.row.status"
            size="mini"
            @change="changeProjectStatus(scope.row)"
          >
            <el-radio-button label="Aktywny"></el-radio-button>
            <el-radio-button label="Zakończony"></el-radio-button>
          </el-radio-group>-->
          <div class="p-check">
            <el-checkbox
              v-model="scope.row.status"
              @change="changeProjectStatus(scope.row)"
            >{{scope.row.status ? 'Aktywny' : 'Nieaktywny'}}</el-checkbox>
          </div>
          <!-- <el-button v-type="!scope.row.status" plain>Aktywny</el-button>
          <el-button :type="!scope.row.status" plain>Nieaktywny</el-button>-->
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import axios from "axios";
import { $API } from "@/main.js";

export default {
  name: "Projects",
  data: () => ({
    search: "",
    projects: [],
    isEditing: false
  }),
  methods: {
    async editIndexes() {
      if (this.isEditing) {
        this.projects.sort(function(a, b) {
          if (a.index < b.index) {
            return -1;
          }
          if (a.index > b.index) {
            return 1;
          }
          return 0;
        });
        try {
          const response = await axios.patch(
            `${$API}/projects`,
            this.projects
          );
          // this.$notify({
          //   index: "Sukces",
          //   message: "Pomyślnie usunięto instruktora",
          //   type: "success"
          // });
        } catch (error) {
          this.$notify({
            index: "Błąd",
            message: "Błąd serwera! Nie można usunąć instruktora",
            type: "error"
          });
        }
      }
      this.isEditing = !this.isEditing;
    },
    async changeProjectStatus(scope) {
      console.log(scope);

      try {
        const response = await axios.put(
          `${$API}/projects/${scope._id}/update`,
          scope
        );
      } catch (error) {
        console.log(error.message);
      }
    },
    async deleteProject(scope) {
      try {
        const response = await axios.delete(
          `${$API}/projects/${scope.row._id}`
        );

        if (response) {
          const filteredProjects = this.projects.filter(
            project => project._id !== scope.row._id
          );
          this.projects = filteredProjects;

          this.$notify({
            title: "Sukces",
            message: "Pomyślnie usunięto projekt",
            type: "success"
          });
        }
      } catch (error) {
        this.$notify({
          title: "Błąd",
          message: "Błąd serwera! Nie można usunąć projektu",
          type: "error"
        });
      }
    }
  },
  async created() {
    try {
      const response = await axios.get(`${$API}/projects`);
      response ? (this.projects = response.data) : false;
      console.log(this.projects);
      
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
<style scoped src="./Projects.scss" lang="scss" />