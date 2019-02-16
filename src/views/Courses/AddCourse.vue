<template>
  <section id="add-courses" class="section section-one-column">
    <header class="section-header">
      <h1 class="section-header-title">Dodaj kurs</h1>
      <el-button type="danger" round @click="AddCourse">Zapisz</el-button>
    </header>
    <div class="course">
      <el-form>
        <el-form-item>
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
         <el-form-item>
          <input type="file" ref="fileInput" @change="onFileSelected"/>
        </el-form-item>
        <el-form-item>
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
        <el-form-item>
          <h3 class="">Parametry kursu</h3>
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
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AddCourses',
  data: () => ({
    course: {
      title: '',
      description: '',
      parameters: [],
      parameter: '',
      schedule: [],
      icon: null
    }
  }),
  methods: {
    onFileSelected() {

    }

  }
};

</script>
