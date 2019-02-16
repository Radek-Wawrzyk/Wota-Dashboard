<template>
  <section id="projects" class="section">
    <el-table
      :data="projects.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      border
      empty-text="Brak projektów"
    >
      <el-table-column label="Instruktor" prop="fullname"></el-table-column>
      <el-table-column label="Kursy" prop="categories"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="Znajdź instruktora"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="$router.push(`/instruktorzy/${scope.row._id}`)">Edytuj</el-button>
          <el-button size="mini" type="danger" @click="deleteInstructor(scope)">Usuń</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
  
</template>

<script>
import axios from 'axios';
import { $API } from '@/main.js';

export default {
  name: 'Projects',
  data: () => ({
    search: '',
    projects: []
  }),
  methods: {

  },
  // async created() {
  //   try {
  //     const response = await axios.get(`${$API}/instructors`);
  //     response ? this.instructors = response.data : false;
  //   } catch (error) {
  //     this.$notify({
  //       title: "Błąd",
  //       message: "Błąd serwera!",
  //       type: "error"
  //     });
  //   }
  // },
};

</script>
