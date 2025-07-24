import axios from 'axios'
import { LocalStorage } from '../constants/localStorage.constant'
import { useNavigate } from 'react-router-dom'

// const api = axios.create({
//   baseURL: `${import.meta.env.VITE_API_SERVER}/api/v1`,
//   headers: {
//     'Content-Type': 'Application/json',
//   },
// })

// Axios config
const apiDefault = axios.create({
  baseURL: `${import.meta.env.VITE_API_SERVER}/api/v1`,
  headers: {
    'Content-Type': 'Application/json',
  },
})
apiDefault.interceptors.request.use((config) => {
  console.log(import.meta.env.VITE_API_SERVER)
  const accessToken = JSON.parse(localStorage.getItem(LocalStorage.auth))?.token
  config.headers.Authorization = `Bearer ${accessToken}`
  return config
}, Promise.reject)

apiDefault.interceptors.response.use(
  (value) => value.data,
  (error) => {
    if (error.code === 401) {
      const navigate = useNavigate()
      localStorage.removeItem(LocalStorage.auth)
      navigate('/login')
    }
    return Promise.reject(error)
  },
)

export { apiDefault }
