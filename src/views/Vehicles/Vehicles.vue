<template>
  <section class="section" id="vehicles">
    <header class="section-header">
      <h1 class="section-header-title">Pojazdy</h1>
      <el-button type="danger" round @click="$router.push(`/pojazdy/dodaj-pojazd`)">Dodaj</el-button>
    </header>
    <el-table
      :data="vehicles.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      border
      empty-text="Nie znaleziono tego pojazdu"
    >
      <el-table-column label="Pojazd" prop="title"></el-table-column>
      <el-table-column label="Kategoria">
        <template slot-scope="scope">
          <span v-for="(category, index) in scope.row.categories" :key="index">{{category}} </span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="$router.push(`/pojazdy/${scope.row._id}`)">Edytuj</el-button>
          <el-button size="mini" type="danger" @click="deleteVehicle(scope)">Usuń</el-button>
          <!-- <el-radio-group v-model="scope.row.visible" size="mini" @change="changeVehicleStatus(scope.row)">
            <el-radio-button label="On"></el-radio-button>
            <el-radio-button label="Off"></el-radio-button>
          </el-radio-group>-->
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>
<script>
import axios from "axios";
import { $API } from "@/main.js";

export default {
  name: "Vehicles",
  data: () => ({
    search: "",
    vehicles: []
  }),
  methods: {
    async deleteVehicle(scope) {
      try {
        const response = await axios.delete(
          `${$API}/vehicles/${scope.row._id}`
        );

        if (response) {
          const filteredVehicles = this.vehicles.filter(
            vehicle => vehicle._id !== scope.row._id
          );
          this.vehicles = filteredVehicles;

          this.$notify({
            title: "Sukces",
            message: "Pomyślnie usunięto pojazd",
            type: "success"
          });
        }
      } catch (error) {
        this.$notify({
          title: "Błąd",
          message: "Błąd serwera! Nie można usunąć Pojazdu",
          type: "error"
        });
      }
    },
    async changeVehicleStatus(scope) {
      try {
        const response = await axios.put(
          `${$API}/vehicles/${scope._id}/update`,
          scope
        );
      } catch (error) {
        console.log(error.message);
      }
    }
  },
  async created() {
    try {
      const response = await axios.get(`${$API}/vehicles`);
      response ? (this.vehicles = response.data) : false;
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

<style>
</style>
