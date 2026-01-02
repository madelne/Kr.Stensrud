<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title: string;
  category: string;
  publishedAt: Date | string;
  body: string;
  mainImage: string;
}

const props = defineProps<Props>();

// Formate published date to Norwegian format
const formattedDate = computed(() => {
  const date = typeof props.publishedAt === 'string'
    ? new Date(props.publishedAt)
    : props.publishedAt;

  return date.toLocaleDateString('nb-NO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});
</script>
<template>
  <div class="max-w-md rounded-2xl overflow-hidden border border-white/10 bg-[#00253c]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
    <div class="h-60 w-full overflow-hidden bg-gradient-to-b from-[#FFD93D] to-[#FFA500]">
      <img
        :src="mainImage"
        :alt="title"
        class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>

    <div class="p-6">
      <h2 class="text-2xl font-light text-white mb-3">
        {{ title }}
      </h2>

      <div class="flex justify-between items-center mb-4 text-sm text-neutral-300">
        <span class="font-medium">
          {{ category }}
        </span>
        <span class="italic">
          {{ formattedDate }}
        </span>
      </div>


      <p class="text-white/85 leading-relaxed mb-6 text-[0.95rem]">
        {{ body }}
      </p>

      <button class="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full border border-white/20 transition-all duration-300 font-medium hover:translate-x-1">
        Les mer →
      </button>
    </div>
  </div>
</template>
