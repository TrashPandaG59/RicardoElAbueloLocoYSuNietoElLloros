<!-- src/components/LoginModal.vue -->
<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-container">
      <button class="close-button" @click="$emit('close')">&times;</button>
      
      <div v-if="!isRegistering" class="form-container">
        <h2>Iniciar Sesión</h2>
        <form @submit.prevent="login">
          <div class="input-group">
            <input v-model="loginForm.email" type="email" id="login-email" required placeholder=" ">
            <label for="login-email">Email</label>
          </div>
          
          <div class="input-group">
            <input v-model="loginForm.password" type="password" id="login-password" required placeholder=" ">
            <label for="login-password">Contraseña</label>
          </div>
          
          <p v-if="loginError" class="error-message">{{ loginError }}</p>
          
          <button type="submit" class="submit-button" :disabled="isLoading">
            <span v-if="isLoading" class="loader"></span>
            <span v-else>Iniciar Sesión</span>
          </button>
        </form>
        <p class="switch-form">
          ¿No tienes cuenta? 
          <a href="#" @click.prevent="switchToRegister">Regístrate</a>
        </p>
      </div>
      
      <div v-else class="form-container">
        <h2>Registro</h2>
        <form @submit.prevent="register">
          <div class="input-group">
            <input v-model="registerForm.username" type="text" id="register-username" required placeholder=" ">
            <label for="register-username">username</label>
            <p v-if="errors.username" class="field-error">{{ errors.username }}</p>
          </div>
          
          <div class="input-group">
            <input v-model="registerForm.email" type="email" id="register-email" required placeholder=" ">
            <label for="register-email">Email</label>
            <p v-if="errors.email" class="field-error">{{ errors.email }}</p>
          </div>
          
          <div class="input-group">
            <input v-model="registerForm.password" type="password" id="register-password" required placeholder=" " 
                   minlength="8">
            <label for="register-password">Contraseña</label>
            <p v-if="errors.password" class="field-error">{{ errors.password }}</p>
          </div>
          
          <div class="input-group">
            <input v-model="registerForm.confirmPassword" type="password" id="register-confirm-password" 
                   required placeholder=" " minlength="8">
            <label for="register-confirm-password">Confirmar Contraseña</label>
            <p v-if="errors.confirmPassword" class="field-error">{{ errors.confirmPassword }}</p>
          </div>
          
          <p v-if="registerError" class="error-message">{{ registerError }}</p>
          
          <button type="submit" class="submit-button" :disabled="isLoading">
            <span v-if="isLoading" class="loader"></span>
            <span v-else>Registrarse</span>
          </button>
        </form>
        <p class="switch-form">
          ¿Ya tienes cuenta? 
          <a href="#" @click.prevent="switchToLogin">Inicia sesión</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/styles/components/LoginModal.scss';
import authService from '../services/authService';

export default {
  props: ['show'],
  data() {
    return {
      isRegistering: false,
      isLoading: false,
      loginError: null,
      registerError: null,
      errors: {
        username: null,
        email: null,
        password: null,
        confirmPassword: null
      },
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    async login() {
      this.loginError = null;
      
      if (!this.loginForm.email || !this.loginForm.password) {
        this.loginError = 'Por favor, completa todos los campos';
        return;
      }
      
      try {
        this.isLoading = true;
        
        const response = await authService.login({
          email: this.loginForm.email,
          password: this.loginForm.password
        });
        
        if (response.success) {
          // No necesitamos guardar token porque el servidor actual no lo envía
          localStorage.setItem('user', JSON.stringify(response.user));
          
          this.$emit('login-success', response.user);
          this.$emit('close');
        }
      } catch (error) {
        console.error('Error de inicio de sesión:', error);
        this.loginError = error.response?.data?.error || 'Credenciales inválidas';
      } finally {
        this.isLoading = false;
      }
    },
    
    async register() {
      this.resetErrors();
      
      if (!this.validateForm()) return;
      
      try {
        this.isLoading = true;
        
        const response = await authService.register({
          username: this.registerForm.username,
          email: this.registerForm.email,
          password: this.registerForm.password
        });
        
        if (response.success) {
          // Usar la respuesta del servidor actual
          this.$toast.success(response.message);
          this.switchToLogin();
        }
      } catch (error) {
        console.error('Error de registro:', error);
        this.registerError = error.response?.data?.error || 'Error al registrarse';
      } finally {
        this.isLoading = false;
      }
    },

    resetErrors() {
      this.registerError = null;
      this.errors = {
        username: null,
        email: null,
        password: null,
        confirmPassword: null
      };
    },

    validateForm() {
      let isValid = true;
      
      if (!this.registerForm.username) {
        this.errors.username = 'El username es obligatorio';
        isValid = false;
      }
      
      if (!this.registerForm.email) {
        this.errors.email = 'El email es obligatorio';
        isValid = false;
      } else if (!this.validateEmail(this.registerForm.email)) {
        this.errors.email = 'Email inválido';
        isValid = false;
      }
      
      if (!this.registerForm.password) {
        this.errors.password = 'La contraseña es obligatoria';
        isValid = false;
      } else if (this.registerForm.password.length < 8) {
        this.errors.password = 'Mínimo 8 caracteres';
        isValid = false;
      }
      
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        this.errors.confirmPassword = 'Las contraseñas no coinciden';
        isValid = false;
      }
      
      return isValid;
    },
    
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    
    switchToRegister() {
      this.isRegistering = true;
      this.loginError = null;
    },
    
    switchToLogin() {
      this.isRegistering = false;
      this.registerError = null;
      this.errors = {
        username: null,
        email: null,
        password: null,
        confirmPassword: null
      };
    },
    
    resetForms() {
      this.loginForm = { email: '', password: '' };
      this.registerForm = { username: '', email: '', password: '', confirmPassword: '' };
      this.loginError = null;
      this.registerError = null;
      this.errors = {
        username: null,
        email: null,
        password: null,
        confirmPassword: null
      };
    }
  },
  watch: {
    show(newVal) {
      // Resetear formularios cuando se cierra el modal
      if (!newVal) {
        this.resetForms();
        this.isRegistering = false;
      }
    }
  }
}
</script>