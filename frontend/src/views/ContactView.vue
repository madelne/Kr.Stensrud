<template>
  <div class="max-w-7xl mx-auto px-4 space-y-16">

    <!-- Page Title -->
    <div class="text-center">
      <h1 class="text-5xl font-light text-white mb-4">Kontakt oss</h1>
    </div>

    <!-- Contact Info -->
    <section class="grid grid-cols-2 md:grid-cols-3 gap-6 text-white/85 text-lg">

      <div>
        <p class="text-white/50 text-sm uppercase tracking-widest mb-2">Adresse</p>
        <p>Kr Stensrud & Søn AS</p>
        <p>Brobekkveien 115</p>
        <p>0582 Oslo</p>
      </div>

      <div>
        <p class="text-white/50 text-sm uppercase tracking-widest mb-2">Telefon</p>
        <a href="tel:+4722807470" class="hover:text-white transition-colors">22 80 74 70</a>
      </div>

      <div>
        <p class="text-white/50 text-sm uppercase tracking-widest mb-2">E-post</p>
        <a href="mailto:post@ssv.no" class="hover:text-white transition-colors">post@ssv.no</a>
      </div>

      <div>
        <p class="text-white/50 text-sm uppercase tracking-widest mb-2">Åpningstider</p>
        <p>Mandag – Torsdag: 07:00 – 15:30</p>
        <p>Fredag: 07:00 – 13:30</p>
      </div>

      <div>
        <p class="text-white/50 text-sm uppercase tracking-widest mb-2">Org.nr.</p>
        <p>930 200 794 MVA</p>
      </div>

      <div>
        <p class="text-white/50 text-sm uppercase tracking-widest mb-2">Følg oss</p>
        <div class="flex gap-4">
          <a href="https://www.facebook.com/stensrudvedlikehold/?fref=ts" target="_blank" rel="noopener" class="hover:text-white transition-colors">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/krstensrud/" target="_blank" rel="noopener" class="hover:text-white transition-colors">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </div>

    </section>

    <!-- Map -->
    <section class="rounded-xl overflow-hidden shadow-xl h-80">
      <iframe
        src="https://maps.google.com/maps?q=Brobekkveien+115,+0582+Oslo,+Norway&output=embed"
        class="w-full h-full"
        style="border:0;"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      />
    </section>

  </div>
</template>
