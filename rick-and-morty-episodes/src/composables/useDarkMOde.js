import { ref, watch } from 'vue'

export function useDarkMode() {
  const isDarkMode = ref(localStorage.getItem('darkMode') === 'true')

  const applyDarkMode = (value) => {
    // Aplicar la clase al body
    document.body.classList.toggle('dark-mode', value)
    // Aplicar la clase al html también
    document.documentElement.classList.toggle('dark-mode', value)
    localStorage.setItem('darkMode', value)
    
    // Forzar el color de fondo
    document.body.style.backgroundColor = value ? '#1a1a1a' : '#fff'
  }

  // Aplicar el modo inicial
  applyDarkMode(isDarkMode.value)

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    applyDarkMode(isDarkMode.value)
  }

  watch(isDarkMode, (newValue) => {
    applyDarkMode(newValue)
  })

  return {
    isDarkMode,
    toggleDarkMode
  }
}
