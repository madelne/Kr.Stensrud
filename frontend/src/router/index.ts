import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectsView from '@/views/projects/ProjectsView.vue'
import SingleProjectView from '@/views/projects/SingleProjectView.vue'
import ServicesView from '@/views/services/ServicesView.vue'
import SingleServiceView from '@/views/services/SingleServiceView.vue'
import AboutView from '@/views/AboutView.vue'
import HMSView from '@/views/HMSView.vue'
import ContactView from '@/views/ContactView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/Om-oss',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/Prosjekter',
      name: 'projects',
      component: ProjectsView,
    },
    {
      path: '/Prosjekter/:_id',
      name: 'project',
      component: SingleProjectView,
    },
    {
      path: '/Tjenester',
      name: 'services',
      component: ServicesView,
    },
    {
      path: '/Tjenester/:_id',
      name: 'service',
      component: SingleServiceView,
    },
    {
      path: '/HMS',
      name: 'hms',
      component: HMSView,
    },
    {
      path: '/Kontakt',
      name: 'contact',
      component: ContactView,
    },
  ],
})

export default router
