<template>
    <div class="episode-detail">
      <div class="back-button">
        <button @click="$router.push('/')">Volver a Episodios</button>
      </div>
  
      <div v-if="loading" class="loading">
        Cargando detalles del episodio...
      </div>
  
      <div v-if="error" class="error">
        {{ error }}
      </div>
  
      <div v-if="episode" class="episode-info">
        <h2>{{ episode.name }}</h2>
        <p>Episodio: {{ episode.episode }}</p>
        <p>Fecha de emisión: {{ episode.air_date }}</p>
  
        <h3>Personajes en este episodio:</h3>
        <div v-if="loadingCharacters" class="loading">
          Cargando personajes...
        </div>
        
        <div class="characters-grid">
          <CharacterCard 
            v-for="character in characters" 
            :key="character.id"
            :character="character"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import CharacterCard from '../components/CaracterCard.vue'
  import '../assets/styles/EpisodeDetailView.scss'
  export default {
    name: 'EpisodeDetailView',
    components: {
      CharacterCard
    },
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        episode: null,
        characters: [],
        loading: true,
        loadingCharacters: false,
        error: null
      }
    },
    methods: {
      async fetchEpisodeDetails() {
        this.loading = true
        try {
          const response = await fetch(`https://rickandmortyapi.com/api/episode/${this.id}`)
          this.episode = await response.json()
          await this.fetchCharacters()
        } catch (err) {
          this.error = 'Error al cargar el episodio: ' + err.message
        } finally {
          this.loading = false
        }
      },
      async fetchCharacters() {
        this.loadingCharacters = true
        try {
          const characterIds = this.episode.characters.map(url => url.split('/').pop())
          const response = await fetch(`https://rickandmortyapi.com/api/character/${characterIds}`)
          const data = await response.json()
          this.characters = Array.isArray(data) ? data : [data]
        } catch (err) {
          this.error = 'Error al cargar los personajes: ' + err.message
        } finally {
          this.loadingCharacters = false
        }
      }
    },
    mounted() {
      this.fetchEpisodeDetails()
    }
  }
  </script>
  