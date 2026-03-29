<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import sanity from '@/sanity';
import { PortableText } from '@portabletext/vue';

interface Link {
  name: string;
  url: string;
}

interface Textfield {
  _id: string;
  title: string;
  body: any[];
}

const link = ref<Link | null>(null);
const introField = ref<Textfield | null>(null);
const textfields = ref<Textfield[]>([]);
const loading = ref(true);

const youtubeEmbedUrl = computed(() => {
  if (!link.value?.url) return null;
  const match = link.value.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}?rel=0` : null;
});

const fetchLink = async () => {
  try {
    const query = `*[_type == "link"][0] { name, url }`;
    link.value = await sanity.fetch(query);
  } catch (err) {
    console.error('Error fetching link:', err);
  }
};

const fetchTextfields = async () => {
  try {
    const introQuery = `*[_type == "textfield" && textfieldtype->textfieldtype == "Om oss, intro"][0] {
      _id, title, body
    }`;
    const textQuery = `*[_type == "textfield" && textfieldtype->textfieldtype == "Om oss, innlegg"] | order(_createdAt asc){
      _id, title, body
    }`;

    const [intro, posts] = await Promise.all([
      sanity.fetch(introQuery),
      sanity.fetch(textQuery),
    ]);

    introField.value = intro;
    textfields.value = posts;
  } catch (err) {
    console.error('Error fetching textfields:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchTextfields();
  fetchLink();
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 space-y-16">

    <!-- Page Title -->
    <div class="text-center">
      <h1 class="text-5xl font-light text-white mb-4">Om oss</h1>
    </div>

    <!-- Intro + Video -->
    <section class="flex flex-col md:flex-row gap-10 items-start">
      <div class="flex-1">
        <h2 class="text-2xl font-light text-white mb-6">{{ introField?.title }}</h2>
        <div v-if="introField?.body" class="text-white/85 leading-relaxed prose prose-invert max-w-none">
          <PortableText :value="introField.body" />
        </div>
      </div>
      <div v-if="youtubeEmbedUrl" class="w-full md:w-96 shrink-0 rounded-xl overflow-hidden shadow-xl aspect-video">
        <iframe
          :src="youtubeEmbedUrl"
          class="w-full h-full"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
    </section>

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
    <div v-else class="text-center text-white">Laster...</div>

  </div>
</template>
