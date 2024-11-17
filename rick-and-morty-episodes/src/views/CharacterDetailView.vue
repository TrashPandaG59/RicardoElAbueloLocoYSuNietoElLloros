<template>
    <div class="character-detail">
      <div class="back-button">
        <button @click="$router.back()">Volver atrás</button>
      </div>
  
      <div v-if="loading" class="loading">
        <div class="loading-spinner">Cargando...</div>
      </div>
  
      <div v-if="error" class="error">
        {{ error }}
      </div>
  
      <div v-if="character" class="character-info-card">
        <div class="character-header">
          <img :src="character.image" :alt="character.name" class="character-image">
          <div class="character-main-info">
            <h2>{{ character.name }}</h2>
            <div class="status">
              <span :class="['status-dot', character.status.toLowerCase()]"></span>
              {{ character.status }} - {{ character.species }}
            </div>
          </div>
        </div>
  
        <div class="character-details">
          <div class="detail-section">
            <h3>Información Personal</h3>
            <p><strong>Género:</strong> {{ character.gender }}</p>
            <p><strong>Origen:</strong> {{ character.origin.name }}</p>
            <p><strong>Ubicación actual:</strong> {{ character.location.name }}</p>
            <p><strong>Especie:</strong> {{ character.species }}</p>
            <p v-if="character.type"><strong>Tipo:</strong> {{ character.type }}</p>
          </div>
  
          <div class="detail-section">
            <h3>Episodios en los que aparece</h3>
            <div v-if="loadingEpisodes" class="loading">
              Cargando episodios...
            </div>
            <div class="episodes-list">
              <div v-for="episode in episodes" 
                   :key="episode.id" 
                   class="episode-item"
                   @click="goToEpisode(episode.id)">
                <span class="episode-code">{{ episode.episode }}</span>
                <span class="episode-name">{{ episode.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CharacterDetailView',
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        character: null,
        episodes: [],
        loading: true,
        loadingEpisodes: false,
        error: null
      }
    },
    methods: {
      async fetchCharacterDetails() {
        this.loading = true
        try {
          const response = await fetch(`https://rickandmortyapi.com/api/character/${this.id}`)
          this.character = await response.json()
          await this.fetchEpisodes()
        } catch (err) {
          this.error = 'Error al cargar los detalles del personaje: ' + err.message
        } finally {
          this.loading = false
        }
      },
      async fetchEpisodes() {
        this.loadingEpisodes = true
        try {
          const episodeIds = this.character.episode.map(url => url.split('/').pop())
          const response = await fetch(`https://rickandmortyapi.com/api/episode/${episodeIds}`)
          const data = await response.json()
          this.episodes = Array.isArray(data) ? data : [data]
        } catch (err) {
          this.error = 'Error al cargar los episodios: ' + err.message
        } finally {
          this.loadingEpisodes = false
        }
      },
      goToEpisode(episodeId) {
        this.$router.push({
          name: 'episode-detail',
          params: { id: episodeId.toString() }
        })
      }
    },
    mounted() {
      this.fetchCharacterDetails()
    }
  }
  </script>
  
  <style lang="scss">
  @import '../assets/styles/views/CharacterDetailView.scss';
  </style>
  