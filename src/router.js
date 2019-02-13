import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('./views/Dashboard.vue'),
      children: [
        {
          path: '/instruktorzy',
          name: 'Instructors',
          component: () => import('./views/Instructors/Instructors.vue')
        },
        {
          path: '/instruktorzy/dodaj',
          name: 'AddInstructor',
          component: () => import('./views/Instructors/AddInstructor.vue')
        },
        {
          path: '/instruktorzy/:id',
          name: 'editInstructor',
          component: () => import('./views/Instructors/editInstructors.vue'),
          props: true
        },
        {
          path: '/pojazdy',
          name: 'Vehicles',
          component: () => import('./views/Vehicles/Vehicles.vue')
        },
        {
          path: '/pojazdy/dodaj',
          name: 'AddVehicle',
          component: () => import('./views/Vehicles/AddVehicle.vue')
        },
        {
          path: '/pojazdy/:id',
          name: 'EditVehicle',
          component: () => import('./views/Vehicles/EditVehicle.vue'),
          props: true
        },
        {
          path: '/dane-kontaktowe',
          name: 'ContactData',
          component: () => import('./views/Contact/Contact.vue')
        },
        {
          path: '/galeria',
          name: 'Gallery',
          component: () => import('./views/Gallery/Gallery.vue')
        }
      ]
    },
    {
      path: '/logowanie',
      name: 'Login',
      component: () => import('./views/Login/Login.vue')
    }
  ]
});