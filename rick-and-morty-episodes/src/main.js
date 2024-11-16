import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.scss'

// Aplicar modo oscuro inicial si está guardado
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode')
}

const app = createApp(App)
app.use(router)
app.mount('#app')
