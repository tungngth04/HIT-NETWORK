import axios from 'axios'

// Giả sử bạn có một instance axios đã được cấu hình
// Bạn nên lấy token từ localStorage hoặc nơi bạn lưu trữ nó
const apiClient = axios.create({
  baseURL: 'https://api.yourdomain.com/v1', // <-- THAY THẾ BẰNG URL API THỰC TẾ
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor để tự động thêm token vào mỗi request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken') // Hoặc lấy từ Redux/Context
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/**
 * Hàm gọi API để tạo bài đăng mới
 * @param {{content: string}} postData - Dữ liệu bài đăng, chứa thuộc tính content.
 * @returns {Promise<object>} Dữ liệu bài đăng vừa được tạo từ server.
 */
export const createPostApi = async (postData) => {
  const response = await apiClient.post('/posts', postData) // <-- THAY THẾ BẰNG ENDPOINT CỦA BẠN
  return response.data
}
