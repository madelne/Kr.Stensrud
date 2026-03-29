<script setup lang="ts">
import { onMounted, ref } from 'vue';
import sanity from '@/sanity';
import { getImageUrl } from '@/assets/converter';

interface HeroImage {
  title: string;
  heroImage: any;
}

const images = ref<HeroImage[]>([]);
const loading = ref(false);
const error = ref();

onMounted(async () => {
  fetchImages();
});

const fetchImages = async () => {
  try {
    const query = `*[_type == "heroImage"] | order(_createdAt desc)
    {
      _id,
      title,
      heroImage {
        asset->  {
          _id,
          url
        }
      },
    }[0...3]`;
    loading.value = true;
    const data = await sanity.fetch(query);
    images.value = data;
  } catch (err) {
    error.value = err;
    console.error('Error fetching projects:', err);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="hero pb-10">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Stolte tradisjoner</h1>
        <p class="py-6">
          Byggeoppdrag for eiendomsforvaltere, kommunale og statlige kunder i Oslo og Akershus.
        </p>
        <router-link to="/Kontakt" class="contact-btn">Kontakt oss</router-link>
      </div>
    </div>
  </div>

  <div class="carousel rounded-box h-70 flex justify-center pb-10">
    <div v-for="(image, index) in images" :key="index" class="carousel-item">
      <img
        v-if="image.heroImage?.asset?.url"
        :src="image.heroImage.asset.url"
        :alt="image.title"
      />
    </div>
  </div>
</template>
