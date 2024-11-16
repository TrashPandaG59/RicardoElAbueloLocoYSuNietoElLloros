<template>
    <div class="error-boundary">
      <div class="error-content">
        <div class="error-icon">❌</div>
        <h3>¡Ups! Algo salió mal</h3>
        <p class="error-message">{{ error }}</p>
        <div class="error-actions">
          <button @click="$emit('retry')" class="retry-button">
            🔄 Intentar de nuevo
          </button>
          <button @click="goHome" class="home-button">
            🏠 Volver al inicio
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router'
  import '../assets/styles/components/ErrorBoundary.scss'
  export default {
    name: 'ErrorBoundary',
    props: {
      error: {
        type: String,
        required: true
      }
    },
    setup() {
      const router = useRouter()
  
      const goHome = () => {
        router.push({ name: 'episodes' })
      }
  
      return {
        goHome
      }
    }
  }
  </script>
  
  