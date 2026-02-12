<script setup lang="ts">
import { ref, onMounted } from 'vue';
import sanity from '@/sanity';
import ServiceCard from '@/components/services/ServiceCard.vue';
import { getPlainText, getPlainTextPreview, getImageUrl } from '@/assets/converter';

interface Service {
  _id: string;
  name: string;
  body: any[];
  projectImage: string;
}

const services = ref<Service[]>([]);
const loading = ref(true);

const fetchServices = async () => {
  try {
    const query = `*[_type == "service"] {
      _id,
      name,
      body,
      "projectImage": projects[0]->mainImage,
    }`;

    const data = await sanity.fetch(query);
    services.value = data;
  } catch (err) {
    console.error('Error fetching services:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchServices();
});
</script>

<template>
  <!-- Header -->
  <div class="max-w-7xl mx-auto mb-12 text-center">
    <h1 class="text-5xl font-light text-white mb-4">Våre tjenester</h1>
  </div>

  <!-- Loading State -->
  <div v-if="loading" class="text-white text-center">Laster tjenester...</div>

  <!-- Services Grid -->
  <div v-else class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <ServiceCard
      v-for="service in services"
      :key="service._id"
      :id="service._id"
      :name="service.name"
      :body="getPlainTextPreview(service.body, 400)"
      :projectImage="getImageUrl(service.projectImage)"
    />
  </div>
</template>
