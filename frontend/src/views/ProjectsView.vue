<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import Footer from '@/components/Footer.vue';
import ProjectCard from '@/components/projects/ProjectCard.vue';
import sanity from '@/sanity';
import { getPlainTextPreview, getImageUrl, getCategory } from '@/assets/converter';

const query = `*[_type == "project" ] | order(releaseDate desc)
{
  title,
  "category": categories[0]->{
    title
  },
  publishedAt,
  body,
  mainImage,
}[0...29]`;
interface Project {
  title: string;
  category: {
    title: string;
  };
  publishedAt: string;
  body: string;
  mainImage: string;
}

const projects = ref<Project[]>([]);
const loading = ref(true);
const error = ref();

// Fetch projects on mount
onMounted(async () => {
  fetchProjects();
});

// Fetch projects from Sanity
const fetchProjects = async () => {
  try {
    const data = await sanity.fetch(query);
    projects.value = data;
    loading.value = false;
  } catch (err) {
    error.value = err;
    console.error('Error fetching projects:', err);
    loading.value = false;
  }
};
</script>

<template>
    <!-- List projects -->
    <div v-if="loading" class="text-white text-center p-8">Loading...</div>
    <ul v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      <ProjectCard v-for="project in projects" :key="project.title"
        :title="project.title"
        :category="getCategory(project.category)"
        :published-at="project.publishedAt"
        :body="getPlainTextPreview(project.body)"
        :main-image="getImageUrl(project.mainImage)"
        v-bind:project="project"
      />
    </ul>
</template>
