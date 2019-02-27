<template>
  <section id="courses" class="section">
    <header class="section-header">
      <h1 class="section-header-title">Kursy i szkolenia</h1>
      <el-button type="danger" round @click="$router.push(`/kurs/`)">Dodaj</el-button>
    </header>
    <el-table
      :data="courses.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      border
      empty-text="Brak kursów"
    >
      <el-table-column label="Kurs" prop="title"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <!-- <el-input v-model="search" size="mini" placeholder="Znajdź kurs"/> -->
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="$router.push(`/kurs/${scope.row._id}`)">Edytuj</el-button>
          <el-button size="mini" type="danger" @click="deleteCourse(scope)">Usuń</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import axios from 'axios';
import { $API } from '@/main.js';

export default {
  name: 'Courses',
  data: () => ({
    search: '',
    courses: []
  }),
  methods: {
    async deleteCourse(scope) {
      try {
        const response = await axios.delete(`${$API}/courseList/${scope.row._id}`);

        if (response) {
          const filteredCourses = this.courses.filter(course => course._id !== scope.row.id);
          this.courses = filteredCourses;

          this.$notify({
            title: "Sukces",
            message: "Pomyślnie usunięto kurs",
            type: "success"
          });
        }
      } catch(error) {
        this.$notify({
          title: "Błąd",
          message: "Błąd serwera! Nie można usunąć kursu",
          type: "error"
        });
      }
    }
  },
  async created() {
    try {
      const response = await axios.get(`${$API}/courseList`);
      response ? this.courses = response.data : false;
      console.log(response);
      
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
