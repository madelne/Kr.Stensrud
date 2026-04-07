<script setup lang="ts">
import { ref, onMounted } from 'vue';
import sanity from '@/sanity';
import { PortableText } from '@portabletext/vue';
import ImageLightbox from '@/components/ImageLightbox.vue';

const lightboxSrc = ref<string | null>(null);

interface Textfield {
  _id: string;
  title: string;
  body: any[];
}

interface HmsImage {
  _id: string;
  title: string;
  url: string;
}

const introField = ref<Textfield | null>(null);
const textfields = ref<Textfield[]>([]);
const images = ref<HmsImage[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const [intro, posts, imgs] = await Promise.all([
      sanity.fetch(`*[_type == "textfield" && textfieldtype == "HMS, intro"][0] {
        _id, title, body
      }`),
      sanity.fetch(`*[_type == "textfield" && textfieldtype == "HMS, innlegg"] | order(_createdAt asc){
        _id, title, body
      }`),
      sanity.fetch(`*[_type == "hmsImage"] | order(_createdAt asc) {
        _id, title, "url": image.asset->url
      }[0...4]`),
    ]);

    introField.value = intro;
    textfields.value = posts;
    images.value = imgs;
  } catch (err) {
    console.error('Error fetching HMS data:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 space-y-16">

    <!-- Page Title -->
    <div class="text-center">
      <h1 class="text-5xl font-light text-white mb-4">HMS</h1>
    </div>

    <!-- Intro -->
    <section class="flex flex-col md:flex-row gap-10 items-start">
      <div class="flex-1">
        <h2 class="text-2xl font-light text-white mb-6">{{ introField?.title }}</h2>
        <div v-if="introField?.body" class="text-white/85 leading-relaxed prose prose-invert max-w-none">
          <PortableText :value="introField.body" />
        </div>
      </div>
    </section>

    <!-- Image Carousel -->
    <section v-if="images.length" class="flex gap-4 overflow-x-auto pb-2">
      <div
        v-for="image in images"
        :key="image._id"
        class="shrink-0 w-96 rounded-xl overflow-hidden aspect-video cursor-zoom-in"
        @click="lightboxSrc = image.url"
      >
        <img :src="image.url" :alt="image.title" class="w-full h-full object-cover" />
      </div>
    </section>

    <ImageLightbox v-if="lightboxSrc" :src="lightboxSrc" @close="lightboxSrc = null" />

    <!-- Innlegg -->
    <section v-if="!loading">
      <div
        v-for="field in textfields"
        :key="field._id"
        class="mb-10"
      >
        <h2 class="text-2xl font-light text-white mb-3">{{ field.title }}</h2>
        <div class="text-white/85 leading-relaxed prose prose-invert max-w-none">
          <PortableText :value="field.body" />
        </div>
      </div>
    </section>

  </div>
</template>
