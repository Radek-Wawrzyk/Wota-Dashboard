<template>
  <section id="instructors" class="section">
    <header class="section-header">
      <h1 class="section-header-title">Instruktorzy</h1>
      <el-button type="danger" round>Dodaj</el-button>
    </header>
    <el-table :data="instructors.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" 
      style="width: 100%" border empty-text="Nie znaleziono tego instruktora"	>
      <el-table-column
        label="Instruktor"
        prop="name">
      </el-table-column>
      <el-table-column
        label="Kursy"
        prop="courses">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="Znajdź instruktora"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" >Edytuj</el-button>
          <el-button size="mini" type="danger" @click="deleteInstructor(scope)">Usuń</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Instructors',
  data: () => ({
    search: ''
  }),
  computed: mapState({
    instructors: state => state.instructors.instructorsList
  }),
  methods: {
    deleteInstructor(scope) {
      this.$store.dispatch('deleteInstructor', scope.row);
    }
  }
}
</script>
