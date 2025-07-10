import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.yourdomain.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/**
 *
 * @param {{content: string}} postData -.
 * @returns {Promise<object>}
 */
export const createPostApi = async (postData) => {
  const response = await apiClient.post('/posts', postData)
  return response.data
}
