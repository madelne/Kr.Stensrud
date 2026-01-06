<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ProjectCard from '@/components/projects/ProjectCard.vue';
import sanity from '@/sanity';
import { getPlainTextPreview, getImageUrl, getCategory } from '@/assets/converter';
import { useRouter } from 'vue-router';
import { useProjectStore } from '@/stores/project';

const query = `*[_type == "project" ] | order(releaseDate desc)
{
  _id,
  title,
  "category": categories[0]->{
    title
  },
  publishedAt,
  body,
  mainImage,
}[0...29]`;
interface Project {
  _id: string;
  title: string;
  category: {
    title: string;
  };
  publishedAt: string;
  body: string;
  mainImage: string;
}

const projects = ref<Project[]>([]);
const loading = ref(false);
const error = ref();

// Fetch projects on mount
onMounted(async () => {
  fetchProjects();
});

// Fetch projects from Sanity
const fetchProjects = async () => {
  try {
    loading.value = true;
    const data = await sanity.fetch(query);
    projects.value = data;
  } catch (err) {
    error.value = err;
    console.error('Error fetching projects:', err);
  }finally {
    loading.value = false;
  }
};

// Route to single project
const projectStore = useProjectStore();
const router = useRouter();
const toProjectView = (id: string) => {
  try{
    projectStore.setProject(id);
    router.push('/Prosjekter/' + id);
  } catch (err) {
    console.error('Error navigating to listing view:', err);
  }
}
</script>

<template>
    <!-- List projects -->
    <div v-if="loading" class="text-white text-center p-8">Loading...</div>
    <ul v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      <ProjectCard v-for="project in projects" :key="project._id" @click="toProjectView(project._id)"
        :title="project.title"
        :category="getCategory(project.category)"
        :published-at="project.publishedAt"
        :body="getPlainTextPreview(project.body)"
        :main-image="getImageUrl(project.mainImage)"
        v-bind:project="project"
      />
    </ul>
</template>
