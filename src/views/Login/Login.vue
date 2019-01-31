<template>
  <main id="login">
    <header class="login-logo">
      <img src="@/assets/logoC.png" alt="Wota">
    </header>
    <el-form class="login-form">
      <el-form-item label="Email" :class="{'is-error': errors.has('email')}">
        <el-input
          v-model="credentials.email"
          type="email"
          placeholder="przykładowy@email.pl"
          name="email"
          v-validate="'required|email'"
        ></el-input>
        <transition name="fade-down">
          <span class="el-form-item__error" v-if="errors.has('email')">{{errors.first('email')}}</span>
        </transition>
      </el-form-item>
      <el-form-item label="Hasło" :class="{'is-error': errors.has('password')}">
        <el-input
          v-model="credentials.password"
          type="password"
          placeholder="przykładowe hasło"
          name="password"
          v-validate="'required|min:8'"
        ></el-input>
        <transition name="fade-down">
          <span
            class="el-form-item__error"
            v-if="errors.has('password')"
          >{{errors.first('password')}}</span>
        </transition>
      </el-form-item>
      <el-form-item class="login-form-submit">
        <el-button type="danger" @click="submitForm" round :loading="loading">Zaloguj się</el-button>
      </el-form-item>
    </el-form>
    <footer class="login-footer">
      Panel wykonany przez
      <a
        href="http://radek-wawrzyk.pl/"
        aria-label="Radosław Wawrzyk - Front End Developer"
        title="Radosław Wawrzyk - Front End Developer"
      >Radziu</a>
    </footer>
  </main>
</template>

<script>
import { $API } from '@/main.js';
import axios from 'axios';

export default {
  name: "Login",
  data: () => ({
    credentials: {
      email: "",
      password: ""
    },
    loading: false
  }),
  methods: {
    async submitForm() {
      const valid = await this.$validator.validateAll();

      const request = async () => {
        this.loading = true;
        try {
          const response = await axios.post(`${$API}/login`, this.credentials);
          response ? this.$store.commit('LOGIN', this.credentials) : false;
        } catch(error) {
          this.loading = false;

          this.$notify({
            title: "Błąd",
            message: "Nie ma takiego użytkownika!",
            type: "error"
          });
        }
      }

      valid ? request() : false;
    }
  }
};
</script>

<style scoped src="./Login.scss" lang="scss" />