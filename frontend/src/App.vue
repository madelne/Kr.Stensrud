<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Footer from '@/components/Footer.vue';
import Navbar from '@/components/Navbar.vue';

const route = useRoute();
const showScrollTop = ref(false);

const routeKey = computed(() => route.path);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const handleScroll = () => {
 showScrollTop.value = window.scrollY > 300
}

onMounted(() => {
 window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
 window.removeEventListener('scroll', handleScroll)
})
</script>
<template>
  <div id="App">
    <Navbar id="top"/>
    <div class="min-h-screen p-3">
      <router-view :key="routeKey" />

      <!-- Scroll to top button -->
      <button
        v-if="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 bg-neutral-300 hover:bg-neutral-100 text-blue-300 py-3 px-4.5 rounded-full shadow-lg transition-all duration-300 z-50"
      >
        ↑
      </button>
    </div>
    <Footer/>
  </div>
</template>
