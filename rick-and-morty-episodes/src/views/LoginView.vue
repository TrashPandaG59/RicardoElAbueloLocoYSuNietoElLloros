<template>
  <div class="login-container">
    <form @submit.prevent="handleSubmit" class="login-form">
      <h2>Login</h2>
      <div class="form-group">
        <input 
          v-model="username" 
          type="text" 
          placeholder="Username"
          required
        >
      </div>
      <div class="form-group">
        <input 
          v-model="password" 
          type="password" 
          placeholder="Password"
          required
        >
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import authService from '../services/auth.service'

export default {
  name: 'LoginView',
  setup() {
    const username = ref('')
    const password = ref('')
    const router = useRouter()

    const handleSubmit = async () => {
      try {
        const response = await authService.login(username.value, password.value)
        localStorage.setItem('token', response.token)
        router.push('/')
      } catch (error) {
        console.error('Login error:', error)
      }
    }

    return {
      username,
      password,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}
</style>