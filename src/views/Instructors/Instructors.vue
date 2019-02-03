<template>
  <section id="instructors" class="section">
    <header class="section-header">
      <h1 class="section-header-title">Instruktorzy</h1>
      <el-button type="danger" round>Dodaj</el-button>
    </header>
    <el-table
      :data="instructors.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      border
      empty-text="Nie znaleziono tego instruktora"
    >
      <el-table-column label="Instruktor" prop="name"></el-table-column>
      <el-table-column label="Kursy" prop="courses"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="Znajdź instruktora"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="$router.push(`/instruktorzy/${scope.row.id}`)">Edytuj</el-button>
          <el-button size="mini" type="danger" @click="deleteInstructor(scope)">Usuń</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Instructors",
  data: () => ({
    search: "",
    instructors: [
      {
        id: 1,
        name: "Tom Krabson",
        courses: "A1, B1, B2"
      },
      {
        id: 2,
        name: "Andrzej Sieka",
        courses: "A1, B1, B2, C1, C3"
      },
      {
        id: 3,
        name: "Morgan Wpierdziel",
        courses: "C1, C2, B2"
      },
      {
        id: 4,
        name: "Jessy Hamilton",
        courses: "A1, B1"
      }
    ]
  }),
  methods: {
    async deleteInstructor(scope) {
      try {
        const response = await axios.delete(`${$API}/instructors/delete/:${scope.row.id}`);

        if (response) {
          const filteredInstructors = this.instructors.filter(instructor => instructor.id !== scope.row.id);
          this.instructors = filteredInstructors
        }
      } catch(error) {
        this.$notify({
          title: "Błąd",
          message: "Błąd serwera! Nie można usunąć instruktora",
          type: "error"
        });
      }
     }
  },
  async created() {
    try {
      const response = await axios.get(`${$API}/instructors`);
      response ? this.instructors = response.data : false;
    } catch (error) {
      this.$notify({
        title: "Błąd",
        message: "Błąd serwera!",
        type: "error"
      });
    }
  },
};
</script>
