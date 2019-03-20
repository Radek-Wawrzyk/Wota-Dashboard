<template>
  <section id="instructors" class="section">
    <header class="section-header">
      <h1 class="section-header-index">Instruktorzy</h1>
      <el-button type="danger" round @click="$router.push(`/instruktorzy/dodaj-instruktora`)">Dodaj</el-button>
    </header>
    <div class="indexButton" v-bind:style="{marginBottom: '25px'}">
      <el-button @click="editIndexes">{{this.isEditing ? 'Zapisz' : 'Edytuj'}} kolejność</el-button>
    </div>
    <el-table
      :data="instructors.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      border
      empty-text="Brak instruktorów"
    >
      <el-table-column label="Kolejność" prop="index">
        <template slot-scope="scope">
          <!-- {{scope.row}} -->
          <el-input v-model="scope.row.index" :disabled="!isEditing"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="Instruktor" prop="fullname"></el-table-column>
      <el-table-column label="Kursy" prop="categories"></el-table-column>
      <el-table-column align="right" size="small">
        <!-- <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="Znajdź instruktora"/>
        </template>-->
        <template slot-scope="scope">
          <el-button size="mini" @click="$router.push(`/instruktorzy/${scope.row._id}`)">Edytuj</el-button>
          <el-button size="mini" type="danger" @click="deleteInstructor(scope)">Usuń</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import axios from "axios";
import { $API } from "@/main.js";

export default {
  name: "Instructors",
  data: () => ({
    search: "",
    instructors: [],
    isEditing: false
  }),
  methods: {
    async editIndexes() {
      if (this.isEditing) {
        this.instructors.sort(function(a, b) {
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
            `${$API}/instructors`,
            this.instructors
          );

          // this.$notify({
          //   index: "Sukces",
          //   message: "Pomyślnie usunięto instruktora",
          //   type: "success"
          // });
        } catch (error) {
          this.$notify({
            index: "Błąd",
            message: "Błąd serwera!",
            type: "error"
          });
        }
      }
      this.isEditing = !this.isEditing;
    },
    async deleteInstructor(scope) {
      try {
        const response = await axios.delete(
          `${$API}/instructors/${scope.row._id}`
        );

        if (response) {
          const response = await axios.get(`${$API}/instructors`);
          response ? (this.instructors = response.data) : false;
          this.instructors.sort(function(a, b) {
            if (a.index < b.index) {
              return -1;
            }
            if (a.index > b.index) {
              return 1;
            }
            return 0;
          });
          this.$notify({
            index: "Sukces",
            message: "Pomyślnie usunięto instruktora",
            type: "success"
          });
        }
      } catch (error) {
        this.$notify({
          index: "Błąd",
          message: "Błąd serwera! Nie można usunąć instruktora",
          type: "error"
        });
      }
    }
  },
  async created() {
    try {
      const response = await axios.get(`${$API}/instructors`);
      response ? (this.instructors = response.data) : false;
      this.instructors.sort(function(a, b) {
        if (a.index < b.index) {
          return -1;
        }
        if (a.index > b.index) {
          return 1;
        }
        return 0;
      });
    } catch (error) {
      this.$notify({
        index: "Błąd",
        message: "Błąd serwera!",
        type: "error"
      });
    }
  }
};
</script>
