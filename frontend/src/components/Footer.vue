<script setup lang="ts">
import { ref, onMounted } from 'vue';
import sanity from '@/sanity';

interface Certification {
  _id: string;
  name: string;
  url: string | null;
  logo: string;
}

const certifications = ref<Certification[]>([]);

onMounted(async () => {
  try {
    certifications.value = await sanity.fetch(`*[_type == "certification"] | order(_createdAt asc) {
      _id, name, url, "logo": logo.asset->url
    }`);
  } catch (err) {
    console.error('Error fetching certifications:', err);
  }
});
</script>

<template>
<footer class="footer sm:footer-horizontal bg-blue-300 text-base-content p-10">

  <!-- Sertifiseringer -->
  <nav class="flex flex-col max-w-110">
    <h6 class="footer-title">Sertifiseringer og godkjenninger</h6>
    <div class="flex flex-wrap gap-10 mt-2">
      <a
        v-for="cert in certifications"
        :key="cert._id"
        :href="cert.url ?? undefined"
        :target="cert.url ? '_blank' : undefined"
        rel="noopener"
        :title="cert.name"
        :class="cert.url ? 'hover:opacity-75 transition-opacity cursor-pointer' : 'cursor-default pointer-events-none'"
        class="flex flex-col items-center gap-1"
      >
        <img :src="cert.logo" :alt="cert.name" class="h-16 w-auto object-contain" />
        <span v-if="cert.url" class="text-xs text-white/50 hover:text-white/80">Les mer →</span>
      </a>
    </div>
  </nav>

  <!-- Kontakt -->
  <nav class="flex flex-col">
    <h6 class="footer-title">Kontakt</h6>
    <a>Kr Stensrud & Søn AS
      <br>
      Brobekkveien 115
      <br>
      0582 Oslo
    </a>
    <div class="divider my-0"></div>
    <a>Org.nr. 930 200 794 MVA</a>
    <div class="divider my-0"></div>
    <a href="tel:+4722807470" class="link link-hover">22 80 74 70</a>
    <div class="divider my-0"></div>
    <a href="mailto:post@ssv.no" class="link link-hover">post@ssv.no</a>
  </nav>

  <!-- Åpningstider -->
  <nav>
    <h6 class="footer-title">Åpningstider</h6>
    <pre>Mandag - Torsdag:     07:00 - 15:30</pre>
    <pre>Fredag:               07:00 - 13:30</pre>
  </nav>

  <!-- Sosiale medier -->
  <nav>
    <h6 class="footer-title">Følg oss</h6>
    <div class="grid grid-flow-col gap-4">
      <a href="https://www.facebook.com/stensrudvedlikehold/?fref=ts" target="_blank" rel="noopener">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
        </svg>
      </a>
      <a href="https://www.instagram.com/krstensrud/" target="_blank" rel="noopener">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </a>
    </div>
  </nav>

</footer>
</template>
