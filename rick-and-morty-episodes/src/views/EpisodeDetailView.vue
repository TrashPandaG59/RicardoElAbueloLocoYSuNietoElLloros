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
  
  <style scoped>
  .episode-detail {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .back-button {
    margin-bottom: 20px;
  }
  
  .back-button button {
    background-color: #97ce4c;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .back-button button:hover {
    background-color: #86b743;
  }
  
  .episode-info {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .episode-info h2 {
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  .episode-info p {
    color: #666;
    margin: 8px 0;
  }
  
  .characters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .loading {
    text-align: center;
    padding: 20px;
    color: #666;
  }
  
  .error {
    color: #dc3545;
    padding: 20px;
    text-align: center;
    background-color: #ffe6e6;
    border-radius: 4px;
    margin: 20px 0;
  }
  
  @media (max-width: 768px) {
    .characters-grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
  }
  
  @media (max-width: 480px) {
    .episode-detail {
      padding: 10px;
    }
    
    .characters-grid {
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }
  }
  </style>
  