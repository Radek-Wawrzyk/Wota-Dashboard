<template>
  <div>
    <header class="section-header">
      <h1 class="section-header-title">Opinie do zaakceptiowania</h1>
    </header>
    <table>
      <tr>
        <th>Wystawił</th>
        <th>Email</th>
        <th>Tytuł</th>
        <th>Ocena</th>
        <th>Komentarz</th>
        <th>Opcje</th>
      </tr>
      <tr v-for="opinion in rejectedOpinions" :key="opinion._id">
        <td>{{opinion.name}} {{opinion.surrname}}</td>
        <td>{{opinion.email}}</td>
        <td>{{opinion.title}}</td>
        <td>{{opinion.rate}}</td>
        <td>{{opinion.comment}}</td>
        <td>
          <el-button @click="acceptComment(opinion._id, opinion)">Akceptuj</el-button>
        </td>
      </tr>
    </table>
    <header class="section-header mt-1">
      <h1 class="section-header-title">Opinie zaakceptowane</h1>
    </header>
    <table>
      <tr>
        <th>Wystawił</th>
        <th>Email</th>
        <th>Tytuł</th>
        <th>Ocena</th>
        <th>Komentarz</th>
      </tr>
      <tr v-for="opinion in acceptedOpinions" :key="opinion._id">
        <td>{{opinion.name}} {{opinion.surrname}}</td>
        <td>{{opinion.email}}</td>
        <td>{{opinion.title}}</td>
        <td>{{opinion.rate}}</td>
        <td>{{opinion.comment}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { $API } from "@/main.js";

export default {
  name: "Opinions",
  data: () => ({
    rates: []
  }),
  computed: {
    acceptedOpinions() {
      return this.rates.filter(rate => rate.isAccepted);
    },
    rejectedOpinions() {
      return this.rates.filter(rate => !rate.isAccepted);
    }
  },
  methods: {
    async acceptComment(id, opinion) {
      try {
        const acceptedOpinion = { ...opinion, ...{ isAccepted: true } };
        const response = await axios.put(`${$API}/rate/${id}`, acceptedOpinion);
        this.$notify({
          title: "Sukces",
          message: "Opinia została zaakceptowana",
          type: "success"
        });
        const responseForData = await axios.get(`${$API}/rate`);
        this.rates = responseForData.data;
      } catch (error) {
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
      const response = await axios.get(`${$API}/rate`);
      this.rates = response.data;
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

<style lang="scss" scoped>
table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

table td,
table th {
  border: 1px solid #ddd;
  padding: 8px;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}

table tr:hover {
  background-color: #ddd;
}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #dd2700;
  color: white;
}
.bg-white {
  padding: 25px;
  background: white;
  border: 1px solid #ebeef5;
  margin: 0 0 25px 0;
}
.mt-1 {
  margin-top: 25px;
}
</style>

