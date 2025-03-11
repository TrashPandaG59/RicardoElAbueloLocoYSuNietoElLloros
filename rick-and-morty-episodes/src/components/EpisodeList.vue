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
      <button @click="showLoginModal = true">
      {{ isLoggedIn ? 'Mi Cuenta' : 'Iniciar Sesión' }}
    </button>
    <LoginModal 
      :show="showLoginModal" 
      @close="showLoginModal = false"
      @login-success="handleLoginSuccess"
    />
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
import LoginModal from './LoginModal.vue'
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
    LoginModal,
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
      showLoginModal: false,
      isLoggedIn: false,
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
  // Métodos existentes para episodios
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
    this.router.push({ name: 'episode-detail', params: { id } });
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
  },
  
  // Nuevos métodos para autenticación
  handleLoginSuccess(user) {
    this.isLoggedIn = true;
    this.currentUser = user;
    console.log('Usuario conectado:', user);
    this.toast.success(`¡Bienvenido, ${user.username || user.email}!`);
    // Actualizar el estado de la aplicación según sea necesario
  },
  
  checkAuthStatus() {
    // Verificar si hay un token guardado al cargar la página
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      this.isLoggedIn = true;
      this.currentUser = JSON.parse(user);
      console.log('Sesión recuperada para:', this.currentUser);
    }
  },
  
  logout() {
    // Eliminar token y datos de usuario
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.currentUser = null;
    this.toast.info("Has cerrado sesión");
    // Opcional: redirigir a la página principal
    if (this.router.currentRoute.name !== 'home') {
      this.router.push('/');
    }
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
  },
  isLoggedIn(newValue) {
    // Opcional: realizar acciones cuando cambia el estado de autenticación
    if (newValue) {
      console.log('Usuario ha iniciado sesión');
      // Puedes cargar datos específicos del usuario aquí
    } else {
      console.log('Usuario ha cerrado sesión');
    }
  }
},

mounted() {
  this.fetchEpisodes();
  this.checkAuthStatus();
},}
</script>
