import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import SingleProjectView from '@/views/SingleProjectView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
  ],
})

export default router
