<template>
  <div class="episodes-container">
    <h2>Lista de episodios</h2>
    
    <!-- Controles superiores -->
    <div class="controls">
      <SearchBar @search="handleSearch" />
      <SeasonFilter @filter="handleSeasonFilter" />
      <button class="dimension-button" @click="goToDimensions">
        Explorar Dimensiones 🌍
      </button>
      <button @click="toggleDarkMode" class="theme-toggle">
        {{ isDarkMode ? '☀️' : '🌙' }}
      </button>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="loading">
      <SkeletonLoader />
    </div>

    <!-- Error state -->
    <div v-if="error" class="error">
      <ErrorBoundary :error="error" @retry="fetchEpisodes" />
    </div>

    <!-- Episodes list -->
    <TransitionGroup 
      v-if="paginatedEpisodes.length" 
      name="episode-list" 
      tag="div" 
      class="episodes-grid"
    >
      <div v-for="episode in paginatedEpisodes" 
           :key="episode.id" 
           class="episode-card"
           @click="goToEpisode(episode.id)">
        <div class="card-header">
          <h3>{{ episode.name }}</h3>
          <button @click.stop="toggleFavorite(episode.id)" class="favorite-btn">
            {{ isFavorite(episode.id) ? '❤️' : '🤍' }}
          </button>
        </div>
        <p>Episodio: {{ episode.episode }}</p>
        <p>Fecha: {{ episode.air_date }}</p>
        <ShareButtons 
          :episodeData="episode"
          @share="handleShare"
        />
      </div>
    </TransitionGroup>
<!-- Pagination -->
<div class="pagination" v-if="filteredEpisodes.length">
      <button 
        :disabled="currentPage === 1"
        @click="currentPage--">
        Anterior
      </button>
      <span>Página {{ currentPage }} de {{ totalFilteredPages }}</span>
      <button 
        :disabled="currentPage === totalFilteredPages"
        @click="currentPage++">
        Siguiente
      </button>
    </div>
  </div>
</template>

<script>
import '../assets/styles/episodeList.scss'
import '../assets/styles/transitions.scss';
import '../assets//styles/theme.scss';
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import SearchBar from './SearchBar.vue'
import SeasonFilter from './SeasonFilter.vue'
import ShareButtons from './ShareButtons.vue'
import SkeletonLoader from './SkeletonLoader.vue'
import ErrorBoundary from './ErrorBoundary.vue'
import { useDarkMode } from '@/composables/useDarkMOde';
import { useFavorites } from '../composables/useFavorites'
import { useToast } from "vue-toastification"
export default {
  name: 'EpisodeList',
  components: {
    SearchBar,
    SeasonFilter,
    ShareButtons,
    SkeletonLoader,
    ErrorBoundary
  },
  setup() {
    const router = useRouter()
    const toast = useToast()
    const { isDarkMode, toggleDarkMode } = useDarkMode()
    const { favorites, toggleFavorite, isFavorite } = useFavorites()

    return {
      router,
      toast,
      isDarkMode,
      toggleDarkMode,
      favorites,
      toggleFavorite,
      isFavorite
    }
  },
  data() {
    return {
      episodes: [],
      loading: true,
      error: null,
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 21,
      searchQuery: '',
      selectedSeason: ''
    }
  },
  computed: {
    filteredEpisodes() {
      return this.episodes.filter(episode => {
        const matchesSearch = !this.searchQuery || 
          episode.name.toLowerCase().includes(this.searchQuery.toLowerCase());

        const matchesSeason = !this.selectedSeason || 
          episode.episode.startsWith(`S${this.selectedSeason.toString().padStart(2, '0')}`);

        return matchesSearch && matchesSeason;
      });
    },
    totalFilteredPages() {
      return Math.ceil(this.filteredEpisodes.length / this.itemsPerPage);
    },
    paginatedEpisodes() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredEpisodes.slice(start, end);
    }
  },
  methods: {
    async fetchEpisodes() {
      this.loading = true;
      this.error = null;
      try {
        // Cargar todos los episodios de una vez
        const allEpisodes = [];
        let page = 1;
        
        while (true) {
          const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
          const data = await response.json();
          
          allEpisodes.push(...data.results);
          
          if (!data.info.next) break;
          page++;
        }
        
        this.episodes = allEpisodes;
        this.toast.success("Episodios cargados correctamente");
      } catch (err) {
        this.error = 'Error al cargar los episodios: ' + err.message;
        this.toast.error("Error al cargar los episodios");
      } finally {
        this.loading = false;
      }
    },
    goToEpisode(id) {
      this.router.push({ name: 'episode-detail', params: { id } })
      this.toast.info(`Yendo al episodio ${id}`);
    },
    handleSeasonFilter(season) {
      this.selectedSeason = season;
      this.currentPage = 1;
      if(season) {
        this.toast.info(`Mostrando temporada ${season}`);
      } else {
        this.toast.info("Mostrando todas las temporadas");
      }
    },
    handleSearch(query) {
      this.searchQuery = query;
      this.currentPage = 1;
      if(query) {
        this.toast.info(`Buscando: "${query}"`);
      }
    },
    handleShare(data) {
      console.log('Compartiendo:', data);
    },
    goToDimensions() {
      this.router.push('/locations');
      this.toast.info("Explorando dimensiones...");
    }
  },
  watch: {
    selectedSeason() {
      this.currentPage = 1;
    },
    searchQuery() {
      this.currentPage = 1;
    },
    currentPage(newPage) {
      this.toast.info(`Página ${newPage}`);
    }
  },
  mounted() {
    this.fetchEpisodes()
  }
}
</script>
