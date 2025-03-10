import axios from 'axios'

const API_URL = 'http://localhost:3000/api/auth/'

class AuthService {
  async login(username, password) {
    const response = await axios.post(API_URL + 'login', {
      username,
      password
    })
    return response.data
  }

  logout() {
    localStorage.removeItem('token')
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'))
  }
}

export default new AuthService()