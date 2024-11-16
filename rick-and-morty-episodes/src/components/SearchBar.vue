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
  
  <style lang="scss" scoped>
  .search-container {
    margin: 20px 0;
    
    input {
      width: 100%;
      max-width: 400px;
      padding: 10px;
      border: 2px solid var(--border-color);
      border-radius: 8px;
      font-size: 16px;
      
      &:focus {
        outline: none;
        border-color: var(--primary-color);
      }
    }
  }
  </style>
  