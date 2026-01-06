<template>
<div id="om-oss">
  <div class="card bg-neutral-300/25 shadow-sm px-4 py-20 m-5 mt-0">
    <div class="flex items-center justify-between h-full">
      <router-link to="/">
        <h2 class="text-5xl justify-start ml-5 w-50">Om oss</h2>
      </router-link>
      <p class="flex-1 text-left ml-50 text-lg text-neutral-200/75">Over 130 år med byggkompetanse</p>
      <div class="ml-6">
        <button class="contact-btn">Les mer→</button>
      </div>
    </div>
    <ul class="text-neutral-100/75 text-lg m-5 flex flex-col gap-2">
        <li>Ansatte</li>
        <li>Nyheter</li>
        <li>Personvernerklæring</li>
        <li>Vår ansvarlighet og respekt for menneskerettigheter</li>
      </ul>
  </div>
</div>

<div id="prosjekter">
  <router-link to="/Prosjekter">
  <div class="card bg-neutral-300/25 shadow-sm px-4 py-20 m-5">
    <div class="flex items-center justify-between h-full">
        <h2 class="text-5xl justify-start ml-5 w-50">Prosjekter</h2>
      <p class="flex-1 text-left ml-50 text-lg text-neutral-200/75">Se et utvalg av våre prosjekter</p>
      <div class="ml-6">
        <button class="contact-btn">Les mer→</button>
      </div>
    </div>
  </div>
  </router-link>
</div>

<div id="tjenester">
  <router-link to="/Tjenester">
  <div class="card bg-neutral-300/25 shadow-sm px-4 py-20 m-5">
    <div class="flex items-center justify-between h-full">
        <h2 class="text-5xl justify-start ml-5 w-50">Tjenester</h2>
      <p class="flex-1 text-left ml-50 text-lg text-neutral-200/75">Tilbygg, nybygg, rehabilitering, ombygging av kontor- og næringslokaler</p>
      <div class="ml-6">
        <button class="contact-btn">Les mer→</button>
      </div>
    </div>
  </div>
  </router-link>
</div>

<div id="hms">
  <div class="card bg-neutral-300/25 shadow-sm px-4 py-20 m-5">
    <div class="flex items-center justify-between h-full">
      <router-link to="/">
        <h2 class="text-5xl justify-start ml-5 w-50">HMS</h2>
      </router-link>
      <p class="flex-1 text-left ml-50 text-lg text-neutral-200/75">Kr Stensrud & Søn AS jobber kontinuerlig etter en «null-skade» visjon</p>
      <div class="ml-6">
        <button class="contact-btn">Les mer→</button>
      </div>
    </div>
  </div>
</div>
</template>
