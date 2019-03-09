<template>
  <section id="add-courses" class="section section-one-column">
    <header class="section-header">
      <h1 class="section-header-title">Formularz edycji kursu</h1>
    </header>
    <div class="course">
      <el-form>
        <el-form-item class="form-item-white">
          <h3 class="element-title">Nazwa kursu</h3>
          <el-input
            placeholder="Nazwa kursu"
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
                <el-input v-model="course.price" v-validate="'required'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Praktyka">
                <el-input v-model="course.practise"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="form-row">
            <el-col :span="12">
              <el-form-item label="Teoria">
                <el-input v-model="course.theory"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Jazda dodatkowa">
                <el-input v-model="course.additional"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="form-item-white">
          <h3 class="element-title">Terminy kursu</h3>
          <h5 class="element-category-title">Retkińska 83</h5>
          <el-row
            :gutter="20"
            class="form-row"
            v-for="item in course.schedule[0].values"
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
              <el-button type="danger">Usuń</el-button>
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
                is-range
                arrow-control
                v-model="course.scheduleNewHoursFromTo"
                range-separator="-"
                start-placeholder="OD"
                end-placeholder="DO"
                class="w-100"
                format="HH:mm"
                value-format="HH:mm"
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
          <h5 class="element-category-title">Nowy Józefów 86</h5>
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
              <el-button type="danger">Usuń</el-button>
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
                is-range
                arrow-control
                v-model="course.scheduleNewHoursFromTo2"
                range-separator="-"
                start-placeholder="OD"
                end-placeholder="DO"
                class="w-100"
                format="HH:mm"
                value-format="HH:mm"
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
        </el-form-item> 
        <el-button
          type="primary"
          class="submit-button"
          @click="submitForm"
          :disabled="!course.title || !course.description"
        >Dodajcvghdf kurs</el-button>
      </el-form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { $API } from "@/main.js";
export default {
  name: "EditCourse",
  props: {
    id: String
  },
  async created() {
    try {
      const response = await axios.get(
        `${$API}/courses/5c746027e880f9429f2d3d92`
      );
      this.course = response.data.course;
      console.log('KURS', this.course);
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
