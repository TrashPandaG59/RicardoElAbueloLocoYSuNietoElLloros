<template>
    <div class="search-container">
      <input 
        type="text"
        v-model="searchQuery"
        placeholder="Buscar episodios..."
        @input="emitSearch"
      >
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import '../assets/styles/components/SearchBar.scss'
  export default {
    name: 'SearchBar',
    emits: ['search'],
    setup(props, { emit }) {
      const searchQuery = ref('')
  
      const emitSearch = () => {
        emit('search', searchQuery.value)
      }
  
      return {
        searchQuery,
        emitSearch
      }
    }
  }
  </script>
  
