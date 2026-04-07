<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import sanity from '@/sanity';
import { PortableText } from '@portabletext/vue';
import { getImageUrl } from '@/assets/converter';

interface Link {
  name: string;
  url: string;
}

interface Textfield {
  _id: string;
  title: string;
  body: any[];
}

interface Employee {
  _id: string;
  name: string;
  role: string;
  image: any;
  phone?: string;
  email?: string;
  order: number;
}

const link = ref<Link | null>(null);
const introField = ref<Textfield | null>(null);
const textfields = ref<Textfield[]>([]);
const ledelse = ref<Employee[]>([]);
const administrasjon = ref<Employee[]>([]);
const loading = ref(true);
const activeTab = ref<'historie' | 'ansatte'>('historie');

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
    const introQuery = `*[_type == "textfield" && textfieldtype == "Om oss, intro"][0] {
      _id, title, body
    }`;
    const textQuery = `*[_type == "textfield" && textfieldtype == "Om oss, innlegg"] | order(_createdAt asc){
      _id, title, body
    }`;
    const employeeQuery = `*[_type == "employee"] | order(order asc) {
      _id, name, role, image, phone, email, order, category
    }`;

    const [intro, posts, employees] = await Promise.all([
      sanity.fetch(introQuery),
      sanity.fetch(textQuery),
      sanity.fetch(employeeQuery),
    ]);

    introField.value = intro;
    textfields.value = posts;
    ledelse.value = employees.filter((e: any) => e.category === 'ledelse');
    administrasjon.value = employees.filter((e: any) => e.category === 'administrasjon');
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
  <div class="max-w-7xl mx-auto px-4">

    <!-- Page Title + Tabs -->
    <div class="flex items-center justify-between mb-12">
      <h1 class="text-5xl font-light text-white">Om oss</h1>
      <div class="bg-white/10 rounded-full p-1 flex gap-1">
        <button
          @click="activeTab = 'historie'"
          :class="activeTab === 'historie'
            ? 'bg-white text-neutral-900'
            : 'text-white hover:bg-white/10'"
          class="px-6 py-2 rounded-full transition-all duration-200 font-medium"
        >
          Vår historie
        </button>
        <button
          @click="activeTab = 'ansatte'"
          :class="activeTab === 'ansatte'
            ? 'bg-white text-neutral-900'
            : 'text-white hover:bg-white/10'"
          class="px-6 py-2 rounded-full transition-all duration-200 font-medium"
        >
          Ansatte
        </button>
      </div>
    </div>

    <!-- Vår historie tab -->
    <div v-if="activeTab === 'historie'" class="space-y-16">

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
        <div v-for="field in textfields" :key="field._id" class="mb-10">
          <h2 class="text-2xl font-light text-white mb-3">{{ field.title }}</h2>
          <div class="text-white/85 leading-relaxed prose prose-invert max-w-none">
            <PortableText :value="field.body" />
          </div>
        </div>
      </section>
      <div v-else class="text-center text-white">Laster...</div>

    </div>

    <!-- Ansatte tab -->
    <div v-if="activeTab === 'ansatte'">

      <!-- Ledelse -->
      <div v-if="ledelse.length" class="mb-12">
        <h3 class="text-xl font-light text-white/60 uppercase tracking-widest mb-6">Ledelse</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          <div v-for="employee in ledelse" :key="employee._id" class="flex flex-col items-center text-center gap-3">
            <div class="w-40 h-40 rounded-full overflow-hidden bg-white/10">
              <img
                v-if="employee.image"
                :src="getImageUrl(employee.image, 400)"
                :alt="employee.name"
                class="w-full h-full object-cover"
              />
            </div>
            <div>
              <p class="text-white font-medium text-lg">{{ employee.name }}</p>
              <p class="text-white/60">{{ employee.role }}</p>
              <a v-if="employee.phone" :href="`tel:${employee.phone}`" class="block text-white/50 hover:text-white transition-colors">{{ employee.phone }}</a>
              <a v-if="employee.email" :href="`mailto:${employee.email}`" class="block text-white/50 hover:text-white transition-colors">{{ employee.email }}</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Administrasjon -->
      <div v-if="administrasjon.length">
        <h3 class="text-xl font-light text-white/60 uppercase tracking-widest mb-6">Administrasjon</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          <div v-for="employee in administrasjon" :key="employee._id" class="flex flex-col items-center text-center gap-3">
            <div class="w-40 h-40 rounded-full overflow-hidden bg-white/10">
              <img
                v-if="employee.image"
                :src="getImageUrl(employee.image, 400)"
                :alt="employee.name"
                class="w-full h-full object-cover"
              />
            </div>
            <div>
              <p class="text-white font-medium text-lg">{{ employee.name }}</p>
              <p class="text-white/60">{{ employee.role }}</p>
              <a v-if="employee.phone" :href="`tel:${employee.phone}`" class="block text-white/50 hover:text-white transition-colors">{{ employee.phone }}</a>
              <a v-if="employee.email" :href="`mailto:${employee.email}`" class="block text-white/50 hover:text-white transition-colors">{{ employee.email }}</a>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!loading && !ledelse.length && !administrasjon.length" class="text-center text-white/50 py-12">
        Ingen ansatte lagt til ennå.
      </div>

    </div>

  </div>
</template>
