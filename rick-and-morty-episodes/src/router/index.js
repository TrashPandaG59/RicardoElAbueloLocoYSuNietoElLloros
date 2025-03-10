import { createRouter, createWebHistory } from 'vue-router'
import EpisodesView from '../views/EpisodesView.vue'
import EpisodeDetailView from '../views/EpisodeDetailView.vue'
import CharacterDetailView from '../views/CharacterDetailView.vue'
import LocationsView from '../views/LocationsView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'episodes',
      component: EpisodesView
    },
    {
      path: '/episode/:id',
      name: 'episode-detail',
      component: EpisodeDetailView,
      props: true
    },
    {
      path: '/character/:id',
      name: 'character-detail',
      component: CharacterDetailView,
      props: true
    },
    {
      path: '/locations',
      name: 'locations',
      component: LocationsView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

export default router
