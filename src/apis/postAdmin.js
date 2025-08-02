import { api, apiDefaultUpload } from '.'
import { ApiConstants } from '../constants/api.constant'
const adminPost = () => ({
  getAllPost: async () => api.get(ApiConstants.adminPost.getAllPost),
  getDetailpost: async (id) => api.get(`${ApiConstants.adminPost.getDetailpost}?id=${id}`),
})
export const { getAllPost, getDetailpost } = adminPost()
