<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const inMobileView = ref(window.innerWidth <= 768);
const isOpen = ref(false);

// Check screen size
const checkScreenSize = () => {
  inMobileView.value = window.innerWidth <= 768;
  if (!inMobileView.value) isOpen.value = false;
};

// Toggle mobile menu
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

// Detect screen resize
onMounted(() => {
  window.addEventListener('resize', checkScreenSize);
});
</script>

<template>
<div class="navbar">
  <!-- logo -->
  <div class="logo">
    <router-link to="/" id="header">Logo</router-link>
    Entreprenør Kr Stensrud
  </div>

  <!-- Desktop Menu -->
  <template v-if="!inMobileView">
    <div class="desktop-navbar">
      <div class="options">
          <router-link to="/om-oss" id="router-link">Om oss</router-link>
          <router-link to="/prosjekter" id="router-link">Prosjekter</router-link>
          <router-link to="/tjenester" id="router-link">Tjenester</router-link>
          <router-link to="/hms" id="router-link">HMS</router-link>
          <router-link to="/kontakt" id="router-link">Kontakt</router-link>
      </div>
    </div>
  </template>

  <!-- Mobile Dropdown Menu -->
  <template v-else>
    <div class="mobile-navbar">
      <button class="menu-btn" @click="toggleMenu">☰</button>
      <div class="options">

        <ul v-show="isOpen" class="dropdown">
            <li><router-link to="/om-oss" id="router-link">Om oss</router-link></li>
            <li><router-link to="/prosjekter" id="router-link">Prosjekter</router-link></li>
            <li><router-link to="/tjenester" id="router-link">Tjenester</router-link></li>
            <li><router-link to="/hms" id="router-link">HMS</router-link></li>
            <li><router-link to="/kontakt" id="router-link">Kontakt</router-link></li>
        </ul>

      </div>
    </div>
  </template>
</div>
</template>
