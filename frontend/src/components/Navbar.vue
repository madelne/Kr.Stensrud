<script lang="ts" setup>
import router from '@/router';
import { onMounted, ref } from 'vue';

interface NavItem {
  name: string;
  id: string;
}

const inMobileView = ref(window.innerWidth <= 1127);

const navItems: NavItem[] = [
  { name: 'Om oss', id: 'Om-oss' },
  { name: 'Prosjekter', id: 'Prosjekter' },
  { name: 'Tjenester', id: 'Tjenester' },
  { name: 'HMS', id: 'HMS' },
];

// Check screen size
const checkScreenSize = () => {
  inMobileView.value = window.innerWidth <= 1127;
};

// Detect screen resize
onMounted(() => {
  window.addEventListener('resize', checkScreenSize);
});

// Route to page
const routeToPage = (sectionId: string) => {
  router.push('/' + sectionId);

  // document.getElementById(sectionId)?.scrollIntoView({
  //   behavior: 'smooth'
  // });
}
</script>

<template>
<div class="relative flex justify-between items-center pb-10">

  <!-- logo -->
  <router-link to="/">
    <div class="text-xl p-5 light flex gap-5 items-center">
      <img src="/stensrud-logo.png" alt="Logo" class="h-20 w-auto" />
      <p>Entreprenør Kr Stensrud</p>
    </div>
  </router-link>

  <!-- Desktop Menu -->
  <template v-if="!inMobileView">
    <div class="absolute left-1/2 transform -translate-x-1/2">
      <div class="lg:menu-horizontal bg-neutral-300/25 rounded-full">
          <button
              v-for="item in navItems"
              :key="item.id"
              :to="item.id"
              class="text-neutral-200/75 hover:text-neutral-100 hover:underline underline-offset-10 px-7 py-3 rounded-full transition-all duration-200 cursor-pointer"
              @click="routeToPage(item.id)"
            >
              {{ item.name }}
          </button>
      </div>
    </div>
    <div class="p-10">
      <button class="contact-btn">Kontakt →</button>
    </div>
  </template>

  <!-- Mobile Dropdown Menu -->
  <template v-else>
    <div class="dropdown dropdown-left">
      <div class="dropdown-toggle">


        <div tabindex="0" role="button" class="px-3 -my-4"><p class="text-5xl light">☰</p></div>
        <ul tabindex="0" class="dropdown-content menu bg-neutral-300/25 rounded-box z-1 w-35 shadow-sm" >
            <button
              v-for="item in navItems"
              :key="item.id"
              :to="item.id"
              class="text-neutral-200/75 hover:text-neutral-100 hover:underline underline-offset-10 p-3 rounded-full transition-all duration-200"
              @click="routeToPage(item.id)"
            >
              {{ item.name }}
            </button>
        </ul>
      </div>
    </div>
  </template>
</div>
</template>
