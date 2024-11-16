<template>
    <div class="episodes-container">
      <h2>Lista de episodios</h2>
      
      <!-- Loading state -->
      <div v-if="loading" class="loading">
        Cargando episodios...
      </div>
  
      <!-- Error state -->
      <div v-if="error" class="error">
        {{ error }}
      </div>
  
      <!-- Episodes list -->
      <div v-if="episodes.length" class="episodes-grid">
        <div v-for="episode in episodes" 
             :key="episode.id" 
             class="episode-card">
          <h3>{{ episode.name }}</h3>
          <p>Episodio: {{ episode.episode }}</p>
          <p>Fecha: {{ episode.air_date }}</p>
        </div>
      </div>
  
      <!-- Pagination -->
      <div class="pagination">
        <button 
          :disabled="currentPage === 1"
          @click="fetchEpisodes(currentPage - 1)">
          Anterior
        </button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button 
          :disabled="currentPage === totalPages"
          @click="fetchEpisodes(currentPage + 1)">
          Siguiente
        </button>
      </div>
    </div>
  </template>
  
  <script>
import '../assets/styles/episodeList.scss'


  export default {
    name: 'EpisodeList',
    data() {
      return {
        episodes: [],
        loading: true,
        error: null,
        currentPage: 1,
        totalPages: 1
      }
    },
    methods: {
      async fetchEpisodes(page = 1) {
        this.loading = true
        this.error = null
        try {
          const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
          const data = await response.json()
          
          this.episodes = data.results
          this.totalPages = data.info.pages
          this.currentPage = page
        } catch (err) {
          this.error = 'Error al cargar los episodios: ' + err.message
        } finally {
          this.loading = false
        }
      }
    },
    mounted() {
      this.fetchEpisodes()
    }
  }
  </script>
  