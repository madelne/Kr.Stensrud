<script setup lang="ts">

interface Service {
  id?: string;
  name: string;
  body: string;
  projectImage: string;
}

const props = defineProps<Service>();
</script>
<template>
  <router-link v-if="id" :to="`/Tjenester/${id}`">
  <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#00253c]/40 to-[#040913]/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group">
    <div class="p-8 flex flex-col items-start gap-4">

      <!-- Service Name -->
      <h3 class="text-2xl font-light text-white">
        {{ props.name }}
      </h3>

      <!-- Service Description -->
      <div class="text-white/80 leading-relaxed flex-grow min-h-[4rem]">
        {{ props.body }}
      </div>

      <!-- Action Button/Link -->
      <button
        class="mt-2 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full border border-white/20 transition-all duration-300 font-medium hover:translate-x-1"
      >
        Les mer →
      </button>
    </div>
  </div>
  </router-link>
</template>
