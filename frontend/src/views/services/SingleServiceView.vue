<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import sanity from '@/sanity';
import { getPlainText } from '@/assets/converter';
import { getPlainTextPreview, getImageUrl, getCategory } from '@/assets/converter';
import { useRouter } from 'vue-router';
import { useProjectStore } from '@/stores/project';
import ProjectCard from '@/components/projects/ProjectCard.vue';

const route = useRoute();

interface Service {
  _id: string;
  name: string;
  body: any[];
  projects?: {
    _id: string;
    title: string;
    mainImage: string;
    category: {
      title: string;
    };
    publishedAt: string;
    body: any[];
  }[];
}

const service = ref<Service | null>(null);
const loading = ref(true);
const error = ref('');

// Fetch service details
const fetchService = async () => {
  try {
    loading.value = true;

    const query = `*[_type == "service" && _id == $_id][0]{
      _id,
      name,
      body,
      projects[]->{
        _id,
        title,
        mainImage,
        "category": categories[0]->{
          title
        },
        publishedAt,
        body
      }
    }`;

    const data = await sanity.fetch(query, { _id: route.params._id });

    if (!data) {
      error.value = 'Tjeneste ikke funnet';
    } else {
      service.value = data;
    }
  } catch (err) {
    console.error('Error fetching service:', err);
    error.value = 'Kunne ikke laste tjeneste';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchService();
});

// Convert data for display
const bodyText = computed(() =>
  service.value ? getPlainText(service.value.body) : ''
);

const nameText = computed(() =>
  service.value ? service.value.name : ''
);

// Route to single project
const projectStore = useProjectStore();
const router = useRouter();
const toProjectView = (id: string) => {
  try {
    projectStore.setProject(id);
    router.push('/Prosjekter/' + id);
  } catch (err) {
    console.error('Error navigating to listing view:', err);
  }
};
</script>

<template>
  <div v-if="loading" class="text-white text-center text-xl py-20">Loading...</div>

  <div v-else-if="error" class="text-white text-center text-xl py-20">
    {{ error }}
  </div>

  <div v-else-if="service" class="max-w-7xl mx-auto px-6 md:px-8">
    <!-- Title -->
    <h1 class="text-5xl md:text-6xl font-light text-white mb-8">
      {{ nameText }}
    </h1>

    <!-- Body Content -->
    <div class="prose prose-invert prose-lg max-w-none mb-16">
      <div v-html="bodyText" class="text-white/90 leading-relaxed text-lg"></div>
    </div>

    <!-- Projects Section -->
    <div v-if="service.projects && service.projects.length > 0">
      <h2 class="text-3xl font-light text-white mb-8">Eksempler på prosjekter</h2>

      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <ProjectCard
          v-for="project in service.projects"
          :key="project._id"
          @click="toProjectView(project._id)"
          :title="project.title"
          :category="getCategory(project.category)"
          :published-at="project.publishedAt"
          :body="getPlainTextPreview(project.body, 200)"
          :main-image="getImageUrl(project.mainImage)"
          class="cursor-pointer"
        />
      </ul>
    </div>

    <div v-else class="text-neutral-300 text-center py-12 mb-16">
      Ingen prosjekter tilknyttet denne tjenesten ennå.
    </div>

    <!-- Back Button -->
    <div class="border-t border-white/10 p-8">
      <button
        @click="router.back()"
        class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full border border-white/20 transition-all duration-300 font-medium"
      >
        ← Tilbake
      </button>
    </div>
  </div>
</template>
