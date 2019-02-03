<template>
  <section class="section" id="vehicles">
    <header class="section-header">
      <h1 class="section-header-title">Pojazdy</h1>
      <el-button type="danger" round>Dodaj</el-button>
    </header>
    <el-table
      :data="vehicles.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      border
      empty-text="Nie znaleziono tego pojazdu"
    >
      <el-table-column label="Pojazd" prop="name"></el-table-column>
      <el-table-column label="Kategoria" prop="type"></el-table-column>
      <el-table-column label="Data" prop="date"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="Znajdź instruktora"/>
        </template>
       
        <template slot-scope="scope">
          <p>xd</p>
          <el-button size="mini">Edytuj</el-button>
          <el-button size="mini" type="danger">Usuń</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  name: "Vehicles",
  data: () => ({
    search: '',
    vehicles: [
      {
        id: 1,
        name: 'Toyouta III',
        type: 'B',
        date: '12-12-2018',
        status: true
      }, 
      {
        id: 2,
        name: 'Honda CB125',
        type: 'A1',
        date: '12-12-2018',
        status: false
      },
      {
        id: 3,
        name: 'Yamaha 350',
        type: 'A',
        date: '12-12-2018',
        status: true
      },
      {
        id: 4,
        name: 'Ford Mondeo',
        type: 'Taxi',
        date: '12-12-2018',
        status: false
      }
    ]
  })
};
</script>

<style>
</style>
