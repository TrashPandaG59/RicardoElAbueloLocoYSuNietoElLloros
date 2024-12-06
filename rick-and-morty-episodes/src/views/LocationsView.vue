<template>
    <div class="locations-container">
      <h2>Dimensiones y Ubicaciones</h2>
      <div class="back-button">
      <button @click="$router.push('/')">
        Volver a Episodios
      </button>
    </div>
      <!-- Loading state -->
      <div v-if="loading" class="loading">
        <SkeletonLoader />
      </div>
  
      <!-- Error state -->
      <div v-if="error" class="error">
        {{ error }}
      </div>
  
      <!-- Locations grid -->
      <div v-if="locations.length" class="locations-grid">
        <div v-for="location in locations" 
             :key="location.id" 
             class="location-card">
          <h3>{{ location.name }}</h3>
          <p><strong>Tipo:</strong> {{ location.type }}</p>
          <p><strong>Dimensión:</strong> {{ location.dimension }}</p>
          <p><strong>Residentes:</strong> {{ location.residents.length }}</p>
        </div>
      </div>
  
      <!-- Pagination -->
      <div class="pagination" v-if="locations.length">
        <button 
          :disabled="currentPage === 1"
          @click="currentPage--">
          Anterior
        </button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button 
          :disabled="currentPage === totalPages"
          @click="currentPage++">
          Siguiente
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import '../assets/styles/views/LocationsView.scss'
  import { ref, watch } from 'vue'
  import SkeletonLoader from '../components/SkeletonLoader.vue'
  
  export default {
    name: 'LocationsView',
    components: {
      SkeletonLoader
    },
    setup() {
      const locations = ref([])
      const loading = ref(true)
      const error = ref(null)
      const currentPage = ref(1)
      const totalPages = ref(0)
  
      const fetchLocations = async (page) => {
        loading.value = true
        error.value = null
        try {
          const response = await fetch(`https://rickandmortyapi.com/api/location?page=${page}`)
          const data = await response.json()
          locations.value = data.results
          totalPages.value = data.info.pages
        } catch (err) {
          error.value = 'Error al cargar las ubicaciones: ' + err.message
        } finally {
          loading.value = false
        }
      }
  
      watch(currentPage, (newPage) => {
        fetchLocations(newPage)
      })
  
      // Cargar datos iniciales
      fetchLocations(1)
  
      return {
        locations,
        loading,
        error,
        currentPage,
        totalPages
      }
    }
  }
  </script>
  
