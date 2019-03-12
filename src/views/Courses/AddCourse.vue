<template>
  <section id="add-courses" class="section section-one-column">
    <header class="section-header">
      <h1 class="section-header-title">Formularz kursu</h1>
    </header>
    <div class="course">
      <el-form>
        <el-form-item class="form-item-white">
          <h3 class="element-title">Kategoria kursu</h3>
          <el-input
            placeholder="Kategoria kursu"
            v-model="course.title"
            name="name"
            v-validate="'required'"
          ></el-input>
          <transition name="fade-down">
            <span class="el-form-item__error" v-if="errors.has('name')">{{errors.first('name')}}</span>
          </transition>
        </el-form-item>
        <el-form-item class="form-item-white">
          <h3 class="element-title">Uwagi</h3>
          <el-input placeholder="Uwagi" v-model="course.comments" name="comments"></el-input>
          <transition name="fade-down">
            <span class="el-form-item__error" v-if="errors.has('name')">{{errors.first('name')}}</span>
          </transition>
        </el-form-item>
        <el-form-item class="form-item-white">
          <h3 class="element-title">Ikona kursu</h3>
          <img
            v-if="coverImage || course.icon"
            :src="coverImage ? coverImage : course.icon"
            width="150"
            height="150"
          >
          <br v-if="coverImage || course.icon">
          <input type="file" ref="fileInput" @change="onFileChanged">
        </el-form-item>
        <el-form-item class="form-item-white">
          <h3 class="element-title">Opis kursu</h3>
          <el-input
            placeholder="Opis kursu"
            v-model="course.description"
            name="desc"
            v-validate="'required'"
            type="textarea"
            rows="5"
          ></el-input>
          <transition name="fade-down">
            <span class="el-form-item__error" v-if="errors.has('desc')">{{errors.first('desc')}}</span>
          </transition>
        </el-form-item>
        <el-form-item class="form-item-white">
          <h3 class="element-title">Parametry kursu</h3>
          <el-row :gutter="20" class="form-row">
            <el-col :span="12">
              <el-form-item label="Cena">
                <el-input v-model="course.parameters.price" v-validate="'required'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Praktyka">
                <el-input v-model="course.parameters.practise"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="form-row">
            <el-col :span="12">
              <el-form-item label="Teoria">
                <el-input v-model="course.parameters.theory"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Jazda dodatkowa">
                <el-input v-model="course.parameters.additional"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="form-item-white">
          <h3 class="element-title">Terminy kursu</h3>
          <h5 class="element-category-title">Piwna 3</h5>
          <el-row
            :gutter="20"
            class="form-row"
            v-for="(item, index) in course.schedule[0].values"
            :key="item.index"
          >
            <el-col :span="7">
              <el-form-item label="Termin kursu"></el-form-item>
              <el-date-picker
                v-model="item.dayFromTo"
                type="daterange"
                align="right"
                start-placeholder="OD"
                end-placeholder="DO"
                class="w-100"
                format="dd/MM/yyyy"
                value-format="dd/MM/yyyy"
                :disabled="true"
              ></el-date-picker>
            </el-col>
            <el-col :span="7">
              <el-form-item label="Godziny zajęć kursu"></el-form-item>
              <el-time-picker
                is-range
                arrow-control
                v-model="item.hoursFromTo"
                range-separator="-"
                start-placeholder="OD"
                end-placeholder="DO"
                class="w-100"
                format="HH:mm"
                value-format="HH:mm"
                :disabled="true"
              ></el-time-picker>
            </el-col>
            <el-col :span="7">
              <el-form-item label="Dni zajęć teoretycznych">
                <el-input class="w-100" v-model="item.theoryDays" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3" class="item-centered">
              <el-button type="danger" @click="removeScheduleItem(index, 0)">Usuń</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="form-row">
            <el-col :span="7">
              <el-form-item label="Termin kursu"></el-form-item>
              <el-date-picker
                v-model="course.scheduleNewDayFromTo"
                type="daterange"
                align="right"
                start-placeholder="OD"
                end-placeholder="DO"
                class="w-100"
                format="dd/MM/yyyy"
                value-format="dd/MM/yyyy"
              ></el-date-picker>
            </el-col>
            <el-col :span="7">
              <el-form-item label="Godziny zajęć kursu"></el-form-item>
              <el-time-picker
                v-model="course.scheduleNewHoursFromTo"
                is-range
                range-separator="-"
                start-placeholder="OD"
                end-placeholder="DO"
                format="HH:mm"
                value-format="HH:mm"
                class="w-100"
              ></el-time-picker>
            </el-col>
            <el-col :span="7">
              <el-form-item label="Dni zajęć teoretycznych">
                <el-input class="w-100" v-model="course.scheduleNewTheoryDays"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3" class="item-centered">
              <el-button
                type="primary"
                @click="addScheduleItem('adress1')"
                :disabled="!course.scheduleNewDayFromTo || !course.scheduleNewHoursFromTo || !course.scheduleNewTheoryDays"
              >Dodaj</el-button>
            </el-col>
          </el-row>
          <h5 class="element-category-title">Nowy Józefów 6</h5>
          <el-row
            :gutter="20"
            class="form-row"
            v-for="item in course.schedule[1].values"
            :key="item.index"
          >
            <el-col :span="7">
              <el-form-item label="Termin kursu"></el-form-item>
              <el-date-picker
                v-model="item.dayFromTo"
                type="daterange"
                align="right"
                start-placeholder="OD"
                end-placeholder="DO"
                class="w-100"
                format="dd/MM/yyyy"
                value-format="dd/MM/yyyy"
                :disabled="true"
              ></el-date-picker>
            </el-col>
            <el-col :span="7">
              <el-form-item label="Godziny zajęć kursu"></el-form-item>
              <el-time-picker
                is-range
                arrow-control
                v-model="item.hoursFromTo"
                range-separator="-"
                start-placeholder="OD"
                end-placeholder="DO"
                class="w-100"
                format="HH:mm"
                value-format="HH:mm"
                :disabled="true"
              ></el-time-picker>
            </el-col>
            <el-col :span="7">
              <el-form-item label="Dni zajęć teoretycznych">
                <el-input class="w-100" v-model="item.theoryDays" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3" class="item-centered">
              <el-button type="danger" @click="removeScheduleItem(index, 1)">Usuń</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="form-row">
            <el-col :span="7">
              <el-form-item label="Termin kursu"></el-form-item>
              <el-date-picker
                v-model="course.scheduleNewDayFromTo2"
                type="daterange"
                align="right"
                start-placeholder="OD"
                end-placeholder="DO"
                class="w-100"
                format="dd/MM/yyyy"
                value-format="dd/MM/yyyy"
              ></el-date-picker>
            </el-col>
            <el-col :span="7">
              <el-form-item label="Godziny zajęć kursu"></el-form-item>
              <el-time-picker
                v-model="course.scheduleNewHoursFromTo2"
                is-range
                range-separator="-"
                start-placeholder="OD"
                end-placeholder="DO"
                format="HH:mm"
                value-format="HH:mm"
                class="w-100"
              ></el-time-picker>
            </el-col>
            <el-col :span="7">
              <el-form-item label="Dni zajęć teoretycznych">
                <el-input class="w-100" v-model="course.scheduleNewTheoryDays2"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3" class="item-centered">
              <el-button
                type="primary"
                @click="addScheduleItem('adress2')"
                :disabled="!course.scheduleNewDayFromTo2 || !course.scheduleNewHoursFromTo2 || !course.scheduleNewTheoryDays2"
              >Dodaj</el-button>
            </el-col>
          </el-row>
          <h5 class="element-category-title">Retkińska 83</h5>
          <el-row
            :gutter="20"
            class="form-row"
            v-for="item in course.schedule[2].values"
            :key="item.index"
          >
            <el-col :span="7">
              <el-form-item label="Termin kursu"></el-form-item>
              <el-date-picker
                v-model="item.dayFromTo"
                type="daterange"
                align="right"
                start-placeholder="OD"
                end-placeholder="DO"
                class="w-100"
                format="dd/MM/yyyy"
                value-format="dd/MM/yyyy"
                :disabled="true"
              ></el-date-picker>
            </el-col>
            <el-col :span="7">
              <el-form-item label="Godziny zajęć kursu"></el-form-item>
              <el-time-picker
                is-range
                arrow-control
                v-model="item.hoursFromTo"
                range-separator="-"
                start-placeholder="OD"
                end-placeholder="DO"
                class="w-100"
                format="HH:mm"
                value-format="HH:mm"
                :disabled="true"
              ></el-time-picker>
            </el-col>
            <el-col :span="7">
              <el-form-item label="Dni zajęć teoretycznych">
                <el-input class="w-100" v-model="item.theoryDays" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3" class="item-centered">
              <el-button type="danger" @click="removeScheduleItem(index, 2)">Usuń</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="form-row">
            <el-col :span="7">
              <el-form-item label="Termin kursu"></el-form-item>
              <el-date-picker
                v-model="course.scheduleNewDayFromTo3"
                type="daterange"
                align="right"
                start-placeholder="OD"
                end-placeholder="DO"
                class="w-100"
                format="dd/MM/yyyy"
                value-format="dd/MM/yyyy"
              ></el-date-picker>
            </el-col>
            <el-col :span="7">
              <el-form-item label="Godziny zajęć kursu"></el-form-item>
              <el-time-picker
                v-model="course.scheduleNewHoursFromTo3"
                is-range
                range-separator="-"
                start-placeholder="OD"
                end-placeholder="DO"
                format="HH:mm"
                value-format="HH:mm"
                class="w-100"
              ></el-time-picker>
            </el-col>
            <el-col :span="7">
              <el-form-item label="Dni zajęć teoretycznych">
                <el-input class="w-100" v-model="course.scheduleNewTheoryDays3"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3" class="item-centered">
              <el-button
                type="primary"
                @click="addScheduleItem('adress3')"
                :disabled="!course.scheduleNewDayFromTo3 || !course.scheduleNewHoursFromTo3 || !course.scheduleNewTheoryDays3"
              >Dodaj</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-button
          type="primary"
          class="submit-button"
          @click="submitForm"
          :disabled="!course.title || !course.description"
        >Dodaj kurs</el-button>
      </el-form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { $API } from "@/main.js";
import uuid from "uuid";

export default {
  name: "AddCourses",
  props: {
    id: String
  },
  data: () => ({
    course: {
      title: "",
      description: "",
      comments: "",
      parameters: {
        price: "",
        practise: "",
        theory: "",
        additional: ""
      },
      schedule: [
        {
          type: "adress1",
          values: [],
          theoryDays: ""
        },
        { type: "adress2", values: [], theoryDays: "" },
        { type: "adress3", values: [], theoryDays: "" }
      ],
      scheduleNewDayFromTo: "",
      scheduleNewHoursFromTo: "",
      scheduleNewTheoryDays: "",
      scheduleNewDayFromTo2: "",
      scheduleNewHoursFromTo2: "",
      scheduleNewTheoryDays2: "",
      scheduleNewDayFromTo3: "",
      scheduleNewHoursFromTo3: "",
      scheduleNewTheoryDays3: "",
      icon: null
    },
    coverImage: null
  }),
  methods: {
    onFileChanged(event) {
      this.course.icon = event.target.files[0];
      const oFReader = new FileReader();
      oFReader.readAsDataURL(event.target.files[0]);

      oFReader.onload = oFREvent => {
        this.coverImage = oFREvent.target.result;
      };
    },
    removeScheduleItem(item, scheduleIndex) {
      this.course.schedule[scheduleIndex].values.splice(item, 1);
    },
    addScheduleItem(type) {
      let newValue;
      if (type === "adress1") {
        newValue = Object.assign({
          dayFromTo: this.course.scheduleNewDayFromTo,
          hoursFromTo: this.course.scheduleNewHoursFromTo,
          theoryDays: this.course.scheduleNewTheoryDays
        });
        this.course.schedule[0].values.push(newValue);
        this.course.scheduleNewDayFromTo = "";
        this.course.scheduleNewHoursFromTo = "";
        this.course.scheduleNewTheoryDays = "";
      } else if (type === "adress2") {
        newValue = Object.assign({
          dayFromTo: this.course.scheduleNewDayFromTo2,
          hoursFromTo: this.course.scheduleNewHoursFromTo2,
          theoryDays: this.course.scheduleNewTheoryDays2
        });
        this.course.schedule[1].values.push(newValue);
        this.course.scheduleNewDayFromTo2 = "";
        this.course.scheduleNewHoursFromTo2 = "";
        this.course.scheduleNewTheoryDays2 = "";
      } else {
        newValue = Object.assign({
          dayFromTo: this.course.scheduleNewDayFromTo3,
          hoursFromTo: this.course.scheduleNewHoursFromTo3,
          theoryDays: this.course.scheduleNewTheoryDays3
        });
        this.course.schedule[2].values.push(newValue);
        this.course.scheduleNewDayFromTo3 = "";
        this.course.scheduleNewHoursFromTo3 = "";
        this.course.scheduleNewTheoryDays3 = "";
      }
    },
    async submitForm() {
      const formData = new FormData();
      formData.append("title", this.course.title);
      formData.append("description", this.course.description);
      formData.append("comments", this.course.comments || "Brak");
      formData.append("price", this.course.parameters.price);
      formData.append("practise", this.course.parameters.practise);
      formData.append("theory", this.course.parameters.theory);
      formData.append("additional", this.course.parameters.additional);
      formData.append("schedule", JSON.stringify(this.course.schedule));
      formData.append("icon", this.course.icon, this.course.icon.name);

      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      try {
        let response;
        if (this.id) {
          response = await axios.put(
            `${$API}/courses/${this.id}/update`,
            formData
          );
        } else {
          response = await axios.post(`${$API}/courses`, formData, config);
        }
        this.$router.push("/kursy");
        console.log(response);

        this.$notify({
          title: "Sukces!",
          message: "Pomyślnie Dodano kurs!",
          type: "success"
        });
      } catch (error) {
        this.$notify({
          title: "Błąd",
          message: "Błąd serwera! Nie udało się dodać kursu.",
          type: "error"
        });
        console.log(error);
      }
    }
  },
  async created() {
    if (this.id) {
      try {
        const response = await axios.get(`${$API}/courses/${this.id}`);
        console.log(JSON.parse(response.data.course.schedule));

        this.course.title = response.data.course.title;
        this.course.description = response.data.course.description;
        this.course.comments = response.data.course.comments;
        this.course.comments = response.data.course.comments;
        this.course.schedule = JSON.parse(response.data.course.schedule);
        this.course.parameters.price = response.data.course.price;
        this.course.parameters.practise = response.data.course.practise;
        this.course.parameters.theory = response.data.course.theory;
        this.course.parameters.additional = response.data.course.additional;
        this.course.icon = response.data.course.icon;
      } catch (error) {
        this.$notify({
          title: "Błąd",
          message: "Błąd serwera!",
          type: "error"
        });
      }
    }
  }
};
</script>

<style scoped src="./Courses.scss" lang="scss" />