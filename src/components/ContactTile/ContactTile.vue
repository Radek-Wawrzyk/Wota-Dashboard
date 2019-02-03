<template>
  <el-form class="contact-tile">
    <el-form-item label="Tytuł Adresu">
      <el-input
        v-model="tile.title"
        type="text"
        placeholder="Szkoła Wota "
        name="address name"
        v-validate="'required'"
      ></el-input>
      <transition name="fade-down">
        <span
          class="el-form-item__error"
          v-if="errors.has('address name')"
        >{{errors.first('address name')}}</span>
      </transition>
    </el-form-item>
    <el-form-item label="Nr. tel. kontaktowy">
      <el-input
        v-model="tile.phone"
        type="text"
        placeholder="+48 123 456 789"
        name="phone"
        v-validate="'required'"
      ></el-input>
      <transition name="fade-down">
        <span class="el-form-item__error" v-if="errors.has('phone')">{{errors.first('phone')}}</span>
      </transition>
    </el-form-item>
    <el-form-item label="Adres słownie">
      <el-input
        v-model="tile.adress"
        type="text"
        placeholder="ul. Nawrot 46, Łódź "
        name="address location"
        v-validate="'required'"
      ></el-input>
      <transition name="fade-down">
        <span
          class="el-form-item__error"
          v-if="errors.has('address location')"
        >{{errors.first('address location')}}</span>
      </transition>
    </el-form-item>
    <el-form-item label="Link do Google Maps">
      <el-input
        v-model="tile.link"
        type="text"
        placeholder="google.maps/123"
        name="map link"
        v-validate="'required'"
      ></el-input>
      <transition name="fade-down">
        <span class="el-form-item__error" v-if="errors.has('map link')">{{errors.first('map link')}}</span>
      </transition>
    </el-form-item>
    <el-form-item label="Godziny Otwarcia" class="contact-tile-row">
      <el-row :gutter="15">
        <el-col :span="12">
          <el-input
            v-model="tile.openHours.from"
            type="text"
            placeholder="8:00"
            name="hours min"
            v-validate="'required'"
          ></el-input>
        </el-col>
        <el-col :span="12">
          <el-input
            v-model="tile.openHours.to"
            type="text"
            placeholder="16:00"
            name="hours max"
            v-validate="'required'"
          ></el-input>
        </el-col>
      </el-row>
      <transition name="fade-down">
        <span
          class="el-form-item__error"
          v-if="errors.has('hours max') && errors.has('hours min')"
        >Hours fields are required.</span>
      </transition>
    </el-form-item>
    <el-form-item label="Dni otwarcia">
      <el-row :gutter="15">
        <el-col :span="12">
          <el-input
            v-model="tile.openDays.from"
            type="text"
            placeholder="Pt"
            name="days min"
            v-validate="'required'"
          ></el-input>
        </el-col>
        <el-col :span="12">
          <el-input
            v-model="tile.openDays.to"
            type="text"
            placeholder="Pon"
            name="days max"
            v-validate="'required'"
          ></el-input>
        </el-col>
      </el-row>
       <transition name="fade-down">
        <span
          class="el-form-item__error"
          v-if="errors.has('days max') && errors.has('days min')"
        >Days fields are required.</span>
      </transition>
    </el-form-item>
    <el-form-item class="contact-tile-center">
      <el-button type="danger" round @click="submitForm" :loading="loading">Zapisz</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
import { $API } from "@/main.js";

export default {
  name: "ContactTile",
  props: {
    index: String
  },
  data: () => ({
    tile: {
      title: "",
      phone: "",
      adress: "",
      link: "",
      openHours: {
        from: "",
        to: ""
      },
      openDays: {
        from: "",
        to: ""
      }
    },
    loading: false
  }),
  methods: {
    async submitForm() {
      const valid = await this.$validator.validateAll();

      const request = async () => {
        this.loading = true;

        try {
          const response = await axios.put(`${$API}/contact/${this.tile._id}/update`, this.tile);
          this.loading = false;
          
          this.$notify({
            title: "Sukces!",
            message: "Pomyślnie zapisano dane!",
            type: "success"
          });
        } catch (error) {
          this.loading = false;

          this.$notify({
            title: "Błąd",
            message: "Błąd serwera",
            type: "error"
          });
        }
      }

      valid ? request(): false;
    }
  },
  async created() {
    try {
      const response = await axios.get(`${$API}/contact`);
      response.data ? this.tile = response.data[this.index] : false;
    } catch(error) {
      this.$notify({
        title: "Błąd",
        message: "Błąd serwera!",
        type: "error"
      });
    }
  }
};
</script>

<style src="./ContactTile.scss" lang="scss" />