<script lang="ts" setup>
import router from '@/router';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

interface NavItem {
  name: string;
  route: string;
  sectionId: string;
}

const route = useRoute();
const inMobileView = ref(window.innerWidth <= 1127);

const navItems: NavItem[] = [
  { name: 'Om oss',     route: '/Om-oss',     sectionId: 'om-oss' },
  { name: 'Prosjekter', route: '/Prosjekter', sectionId: 'prosjekter' },
  { name: 'Tjenester',  route: '/Tjenester',  sectionId: 'tjenester' },
  { name: 'HMS',        route: '/HMS',        sectionId: 'hms' },
];

const checkScreenSize = () => {
  inMobileView.value = window.innerWidth <= 1127;
};

onMounted(() => {
  window.addEventListener('resize', checkScreenSize);
});

const handleNavClick = (item: NavItem) => {
  if (route.path === '/') {
    document.getElementById(item.sectionId)?.scrollIntoView({ behavior: 'smooth' });
  } else {
    router.push(item.route);
  }
};
</script>

<template>
<div class="relative flex justify-between items-center pb-4">

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
              :key="item.route"
              class="text-neutral-200/75 hover:text-neutral-100 hover:underline underline-offset-10 px-7 py-3 rounded-full transition-all duration-200 cursor-pointer"
              @click="handleNavClick(item)"
            >
              {{ item.name }}
          </button>
      </div>
    </div>
    <div class="p-10">
      <button class="contact-btn" @click="router.push('/Kontakt')">Kontakt →</button>
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
              :key="item.route"
              class="text-neutral-200/75 hover:text-neutral-100 hover:underline underline-offset-10 p-3 rounded-full transition-all duration-200"
              @click="handleNavClick(item)"
            >
              {{ item.name }}
            </button>
        </ul>
      </div>
    </div>
  </template>
</div>
</template>
