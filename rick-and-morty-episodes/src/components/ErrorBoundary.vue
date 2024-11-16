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
  
  <style lang="scss" scoped>
  .error-boundary {
    width: 100%;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
  
    .error-content {
      background-color: var(--bg-secondary);
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 2px 8px var(--shadow);
      max-width: 400px;
      width: 100%;
  
      .error-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        animation: shake 0.5s ease-in-out;
      }
  
      h3 {
        color: var(--text-primary);
        margin-bottom: 1rem;
        font-size: 1.5rem;
      }
  
      .error-message {
        color: var(--text-secondary);
        margin-bottom: 1.5rem;
        font-size: 1rem;
        line-height: 1.5;
      }
  
      .error-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
  
        button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
  
          &.retry-button {
            background-color: var(--primary-color);
            color: white;
  
            &:hover {
              background-color: darken($color: #97ce4c, $amount: 10%);
            }
          }
  
          &.home-button {
            background-color: var(--bg-primary);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
  
            &:hover {
              background-color: var(--hover-bg);
            }
          }
  
          &:active {
            transform: scale(0.95);
          }
        }
      }
    }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  // Responsive
  @media (max-width: 480px) {
    .error-boundary {
      padding: 1rem;
  
      .error-content {
        padding: 1.5rem;
  
        .error-actions {
          flex-direction: column;
        }
      }
    }
  }
  </style>
  