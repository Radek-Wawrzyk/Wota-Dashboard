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
          <el-button size="mini" @click="$router.push(`/vehicles/${scope.row.id}`)">Edytuj</el-button>
          <el-button size="mini" type="danger" @click="deleteVehicle(scope)" >Usuń</el-button>
          <el-radio-group v-model="scope.row.status" size="mini" @change="changeVehicleStatus(scope.row)">
            <el-radio-button label="On"></el-radio-button>
            <el-radio-button label="Off"></el-radio-button>
          </el-radio-group>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import axios from 'axios';
import { $API } from '@/main.js';

export default {
  name: "Vehicles",
  data: () => ({
    search: "",
    vehicles: [
      {
        id: 1,
        name: "Toyouta III",
        type: "B",
        date: "12-12-2018",
        status: 'On'
      },
      {
        id: 2,
        name: "Honda CB125",
        type: "A1",
        date: "12-12-2018",
        status: 'On'
      },
      {
        id: 3,
        name: "Yamaha 350",
        type: "A",
        date: "12-12-2018",
        status: 'Off'
      },
      {
        id: 4,
        name: "Ford Mondeo",
        type: "Taxi",
        date: "12-12-2018",
        status: 'On'
      }
    ]
  }),
  methods: {
    async deleteVehicle(scope) {
      try {
        const response = await axios.delete(`${$API}/vehicles/delete/:${scope.row.id}`);

        if (response) {
          const filteredIvehicles = this.vehicles.filter(instructor => vehicle.id !== scope.row.id);
          this.vehicles = filteredInstructors
        }
      } catch(error) {
        this.$notify({
          title: "Błąd",
          message: "Błąd serwera! Nie można usunąć Pojazdu",
          type: "error"
        });
      }
    },
    async changeVehicleStatus(scope) {
      const response = await axios.put(`${$API}/vehicles/edit/:${scope.id}`, scope);
    }
  },
  async created() {
    try {
      const response = await axios.get(`${$API}/vehicles`);
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

<style>
</style>
