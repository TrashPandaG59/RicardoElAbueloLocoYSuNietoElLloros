<template>
    <Transition name="fade">
      <div v-if="isIdle" class="idle-detector">
        <div class="idle-content">
          <img src="../assets/morty-sleeping.gif" alt="Morty durmiendo" class="idle-image">
          <h3>¿Sigues ahí? 🤔</h3>
          <p>Morty se está quedando dormido...</p>
          <button @click="handleWakeUp" class="wake-button">
            ¡Estoy despierto!
          </button>
        </div>
      </div>
    </Transition>
  </template>
  
  <script>
  import { useIdle } from '@vueuse/core'
  import { useToast } from 'vue-toastification'
  
  export default {
    name: 'IdleDetector',
    setup() {
      const toast = useToast()
      const { idle: isIdle } = useIdle(30000) // 30 segundos
  
      const handleWakeUp = () => {
        toast.info("¡Bienvenido de vuelta!")
      }
  
      return {
        isIdle,
        handleWakeUp
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .idle-detector {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  
    .idle-content {
      background-color: var(--card-bg);
      padding: 2rem;
      border-radius: 15px;
      text-align: center;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      max-width: 400px;
      width: 90%;
  
      .idle-image {
        width: 150px;
        height: 150px;
        margin-bottom: 1rem;
        border-radius: 50%;
        object-fit: cover;
      }
  
      h3 {
        color: var(--text-color);
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
      }
  
      p {
        color: var(--text-color);
        opacity: 0.8;
        margin-bottom: 1.5rem;
      }
  
      .wake-button {
        background-color: var(--primary-color);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 1.1rem;
        cursor: pointer;
        transition: all 0.3s ease;
  
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px var(--shadow-color);
        }
  
        &:active {
          transform: translateY(0);
        }
      }
    }
  }
  
  // Animaciones
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  // Responsive
  @media (max-width: 768px) {
    .idle-detector {
      .idle-content {
        width: 85%;
        padding: 1.5rem;
  
        .idle-image {
          width: 120px;
          height: 120px;
        }
  
        h3 {
          font-size: 1.2rem;
        }
      }
    }
  }
  </style>
  