<script setup lang="ts">
import { ref, computed, onMounted, h } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import sanity from '@/sanity';
import { PortableText } from '@portabletext/vue';
import ImageLightbox from '@/components/ImageLightbox.vue';

const lightboxSrc = ref<string | null>(null);
import { getFormattedDate, getImageUrl, getAuthorName, getCategory } from '@/assets/converter';
import ImageUrlBuilder from '@sanity/image-url';

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const builder = ImageUrlBuilder(sanity);
      const url = builder.image(value).width(900).url();
      return h('span', { class: 'portable-image' }, [
        h('img', { src: url, alt: value.alt || '', class: 'rounded-lg max-w-xs' })
      ]);
    },
  },
};

const route = useRoute();
const router = useRouter();

interface Project {
  _id: string;
  title: string;
  author: {
    name: string;
  };
  publishedAt: string;
  projectCategory: {
    title: string;
  };
  body: any[];
  mainImage: any;
  images: any[];
}

const project = ref<Project | null>(null);
const loading = ref(true);
const error = ref('');

// Fetch project details
const fetchProject = async () => {
  try {
    loading.value = true;

    const query = `*[_type == "project" && _id == $_id][0]{
      _id,
      title,
      author->{ name },
      publishedAt,
      "projectCategory": projectCategories[0]->{
        title
      },
      body,
      mainImage,
      "images": images[].asset->url
    }`;

    const data = await sanity.fetch(query, { _id: route.params._id });

    if (!data) {
      error.value = 'Prosjekt ikke funnet';
    } else {
      project.value = data;
    }
  } catch (err) {
    console.error('Error fetching project:', err);
    error.value = 'Kunne ikke laste prosjekt';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProject();
});

// Convert data for display
const imageUrl = computed(() =>
  project.value ? getImageUrl(project.value.mainImage, 1200) : ''
);

const formattedDate = computed(() =>
  project.value ? getFormattedDate(project.value.publishedAt) : ''
);


const authorName = computed(() =>
  project.value ? getAuthorName(project.value.author) : ''
);

const category = computed(() =>
  project.value ? getCategory(project.value.projectCategory) : ''
);
</script>

<template>
  <div v-if="loading" class="text-white text-center text-xl py-20">Loading...</div>

  <div v-else-if="error" class="text-white text-center text-xl py-20">
    {{ error }}
  </div>

  <article v-else-if="project">
    <div class="max-w-4xl mx-auto px-6 md:px-8">

      <!-- Title -->
      <h1 class="text-5xl font-light text-white mb-4">{{ project.title }}</h1>
      <div v-if="category" class="px-3 py-1 bg-white/10 rounded-full text-white text-sm inline-block mb-6">
        {{ category }}
      </div>

      <!-- Main Image -->
      <div v-if="imageUrl" class="w-full h-80 rounded-xl overflow-hidden mb-10">
        <img
          :src="imageUrl"
          :alt="project.title"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Meta Info -->
      <div class="flex flex-wrap gap-6 mb-10 text-neutral-300">
        <div class="flex items-center gap-2">
          <span class="text-sm">Publisert av:</span>
          <span class="text-white font-medium">{{ authorName }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm">Sist endret:</span>
          <span class="text-white">{{ formattedDate }}</span>
        </div>
      </div>

      <!-- Body Content -->
      <div class="prose prose-invert prose-lg max-w-none mb-16 text-white/90 leading-relaxed text-lg">
        <PortableText v-if="project.body" :value="project.body" :components="portableTextComponents" />
      </div>

      <!-- Image Gallery -->
      <div v-if="project.images?.length" class="flex gap-4 overflow-x-auto pb-2 mb-10">
        <div
          v-for="(url, i) in project.images"
          :key="i"
          class="shrink-0 w-80 rounded-xl overflow-hidden aspect-video cursor-zoom-in"
          @click="lightboxSrc = url"
        >
          <img :src="url" class="w-full h-full object-cover" />
        </div>
      </div>

      <ImageLightbox v-if="lightboxSrc" :src="lightboxSrc" @close="lightboxSrc = null" />

      <!-- Back Button -->
      <div class="pb-16 border-t border-white/10 pt-8">
        <button
          @click="router.back()"
          class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full border border-white/20 transition-all duration-300 font-medium"
        >
          ← Tilbake
        </button>
      </div>
    </div>
  </article>

</template>

<style scoped>
.prose :deep(.portable-image) {
  display: inline-block;
  vertical-align: top;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
