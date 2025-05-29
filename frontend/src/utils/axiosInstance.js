// Importamos o axios
import axios from 'axios'

// Criamos uma instância com a URL base da API
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // Substitua se for diferente
  headers: {
    'Content-Type': 'application/json'
  }
})

// Adicionamos um interceptor para incluir o token em cada requisição
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // Pegamos o token armazenado
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}` // Adicionamos o token no header
    }
    return config
  },
  (error) => {
    return Promise.reject(error) // Caso ocorra erro na requisição
  }
)

export default axiosInstance
