import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import './assets/styles/main.scss'

// Aplicar modo oscuro inicial si está guardado
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode')
}

// Opciones de configuración para Toast
const toastOptions = {
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false,
    transition: "Vue-Toastification__bounce",
    maxToasts: 5,
    newestOnTop: true,
    // Personalización de colores para que coincida con tu tema
    toastDefaults: {
        // Toasts por defecto
        success: {
            containerClass: "custom-toast",
            bodyClassName: ["custom-toast-body"],
            icon: "✅"
        },
        error: {
            containerClass: "custom-toast",
            bodyClassName: ["custom-toast-body"],
            icon: "❌"
        },
        warning: {
            containerClass: "custom-toast",
            bodyClassName: ["custom-toast-body"],
            icon: "⚠️"
        },
        info: {
            containerClass: "custom-toast",
            bodyClassName: ["custom-toast-body"],
            icon: "ℹ️"
        }
    }
}

const app = createApp(App)
app.use(router)
app.use(Toast, toastOptions)
app.mount('#app')
