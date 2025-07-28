import axios from 'axios'

const fakeUser = {
  id: 'user-123',
  hoten: 'Vishnu Kumar Agrawal',
  gioitinh: 'Nam',
  ngaysinh: '1999-11-25T00:00:00.000Z',
  email: 'abc@gmail.com',
  tentaikhoan: 'Agrawa',
  stats: {
    posts: 12,
    recruitments: 207,
    applies: 64,
  },
}

const apiClient = axios.create({
  baseURL: 'https://api.yourdomain.com/v1',
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getUserProfileApi = async () => {
  console.log('Fetching user profile...')
  return new Promise((resolve) => setTimeout(() => resolve(fakeUser), 500))
}
export const updateUserProfileApi = async (userData) => {
  console.log('Updating user profile with:', userData)
  return new Promise((resolve) => setTimeout(() => resolve({ ...fakeUser, ...userData }), 1000))
}
export const changePasswordApi = async (passwordData) => {
  console.log('Changing password with:', passwordData)
  return new Promise((resolve) =>
    setTimeout(() => resolve({ message: 'Password changed successfully' }), 1000),
  )
}
