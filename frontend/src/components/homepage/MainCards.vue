<script setup lang="ts">
import { ref, onMounted } from 'vue';
import sanity from '@/sanity';
import { getPlainTextPreview } from '@/assets/converter';
import { useRouter } from 'vue-router';

const router = useRouter();

const omOssIntro = ref('');
const recentProjects = ref<{ _id: string; title: string }[]>([]);
const recentServices = ref<{ _id: string; name: string }[]>([]);
const hmsIntro = ref('');

onMounted(async () => {
  const [omOss, projects, services, hms] = await Promise.all([
    sanity.fetch(`*[_type == "textfield" && textfieldtype->textfieldtype == "Om oss, intro"][0] { body }`),
    sanity.fetch(`*[_type == "project"] | order(publishedAt desc) [0...3] { _id, title }`),
    sanity.fetch(`*[_type == "service"] | order(_createdAt desc) [0...3] { _id, name }`),
    sanity.fetch(`*[_type == "textfield" && textfieldtype->textfieldtype == "HMS, intro"][0] { body }`),
  ]);

  omOssIntro.value = getPlainTextPreview(omOss?.body, 300);
  recentProjects.value = projects;
  recentServices.value = services;
  hmsIntro.value = getPlainTextPreview(hms?.body, 300);
});
</script>

<template>

<div id="om-oss">
  <div class="card bg-neutral-300/25 shadow-sm p-8 m-5 mt-0">
    <div class="flex justify-between items-start mb-4">
      <h2 class="text-5xl font-light">Om oss</h2>
      <button class="contact-btn" @click="router.push('/Om-oss')">Les mer →</button>
    </div>
    <p class="text-neutral-200/75 text-lg leading-relaxed">{{ omOssIntro }}</p>
  </div>
</div>

<div id="prosjekter">
  <div class="card bg-neutral-300/25 shadow-sm p-8 m-5">
    <div class="flex justify-between items-start mb-4">
      <h2 class="text-5xl font-light">Prosjekter</h2>
      <button class="contact-btn" @click="router.push('/Prosjekter')">Se alle →</button>
    </div>
    <ul class="flex flex-col gap-2">
      <li
        v-for="project in recentProjects"
        :key="project._id"
        class="text-neutral-200/75 text-lg cursor-pointer hover:text-white transition-colors"
        @click="router.push('/Prosjekter/' + project._id)"
      >
        {{ project.title }}
      </li>
    </ul>
  </div>
</div>

<div id="tjenester">
  <div class="card bg-neutral-300/25 shadow-sm p-8 m-5">
    <div class="flex justify-between items-start mb-4">
      <h2 class="text-5xl font-light">Tjenester</h2>
      <button class="contact-btn" @click="router.push('/Tjenester')">Se alle →</button>
    </div>
    <ul class="flex flex-col gap-2">
      <li
        v-for="service in recentServices"
        :key="service._id"
        class="text-neutral-200/75 text-lg cursor-pointer hover:text-white transition-colors"
        @click="router.push('/Tjenester/' + service._id)"
      >
        {{ service.name }}
      </li>
    </ul>
  </div>
</div>

<div id="hms">
  <div class="card bg-neutral-300/25 shadow-sm p-8 m-5">
    <div class="flex justify-between items-start mb-4">
      <h2 class="text-5xl font-light">HMS</h2>
      <button class="contact-btn" @click="router.push('/HMS')">Les mer →</button>
    </div>
    <p class="text-neutral-200/75 text-lg leading-relaxed">{{ hmsIntro }}</p>
  </div>
</div>

</template>
