<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import sanity from '@/sanity';
import { getFormattedDate, getImageUrl, getPlainText, getAuthorName, getCategory } from '@/assets/converter';

const route = useRoute();

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
      mainImage
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
  project.value ? getImageUrl(project.value.mainImage) : ''
);

const formattedDate = computed(() =>
  project.value ? getFormattedDate(project.value.publishedAt) : ''
);

const bodyText = computed(() =>
  project.value ? getPlainText(project.value.body) : ''
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
    <!-- Hero Image Section -->
    <div class="w-full h-[60vh] relative overflow-hidden">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="project.title"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full bg-gradient-to-b from-[#FFD93D] to-[#FFA500]"></div>

      <!-- Gradient overlay for better text readability -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#040913] via-transparent to-transparent"></div>
    </div>

    <!-- Content Section -->
    <div class="max-w-4xl mx-auto px-6 md:px-8 -mt-32 relative z-10">
      <!-- Title -->
      <h1 class="text-5xl md:text-6xl font-light text-white mb-8 drop-shadow-lg">
        {{ project.title }}
      </h1>

      <!-- Meta Info -->
      <div class="flex flex-wrap gap-6 mb-12 text-neutral-300">
        <div class="flex items-center gap-2">
          <span class="text-sm">Publisert av:</span>
          <span class="text-white font-medium">{{ authorName }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm">Sist endret:</span>
          <span class="text-white">{{ formattedDate }}</span>
        </div>
        <div v-if="category" class="px-3 py-1 bg-white/10 rounded-full text-white text-sm">
          {{ category }}
        </div>
      </div>

      <!-- Body Content -->
      <div class="prose prose-invert prose-lg max-w-none mb-16">
        <div v-html="bodyText" class="text-white/90 leading-relaxed text-lg"></div>
      </div>

      <!-- Back Button -->
      <div class="pb-16 border-t border-white/10 pt-8">
        <router-link
          to="/Prosjekter"
          class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full border border-white/20 transition-all duration-300 font-medium"
        >
          ← Tilbake til prosjekter
        </router-link>
      </div>
    </div>
  </article>
</template>
