<template>
  <aside class="menu" :class="menuStatus ? 'active' : ''">
    <ul class="menu-list">
      <li class="menu-list-item">
        <router-link to="/kursy" aria-label="Kursy/Szkolenia" title="Kursy/Szkolenia" class="menu-list-item-link">
          Kursy i Szkolenia
        </router-link>
      </li>
      <li class="menu-list-item">
        <router-link to="/instruktorzy" aria-label="Instruktorzy" title="Instruktorzy" class="menu-list-item-link">
          Instruktorzy
        </router-link>
      </li>
      <li class="menu-list-item">
        <router-link to="/galeria" aria-label="Galeria" title="Galeria" class="menu-list-item-link">
          Galeria
        </router-link>
      </li>
      <li class="menu-list-item">
        <router-link to="/pojazdy" aria-label="Pojazdy" title="Pojazdy" class="menu-list-item-link">
          Pojazdy
        </router-link>
      </li>
      <li class="menu-list-item">
        <router-link to="/dane-kontaktowe" aria-label="Dane kontaktowe" title="Dane kontaktowe" class="menu-list-item-link">
          Dane kontaktowe
        </router-link>
      </li>
      <li class="menu-list-item">
        <router-link to="/projekty" aria-label="Projekty" title="Projekty" class="menu-list-item-link">
          Projekty
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'Menu',
  props: [
    'menuStatus'
  ]
}
</script>

<style scoped src="./Menu.scss" lang="scss" />>
