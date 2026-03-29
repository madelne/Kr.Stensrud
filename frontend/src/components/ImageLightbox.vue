<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const props = defineProps<{ src: string; alt?: string }>();
const emit = defineEmits<{ close: [] }>();

const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') emit('close'); };
onMounted(() => window.addEventListener('keydown', onKey));
onUnmounted(() => window.removeEventListener('keydown', onKey));
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-zoom-out"
    @click="emit('close')"
  >
    <img
      :src="src"
      :alt="alt || ''"
      class="max-w-[90vw] max-h-[90vh] rounded-xl object-contain shadow-2xl cursor-default"
      @click.stop
    />
  </div>
</template>
