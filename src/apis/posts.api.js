import { apiDefault } from '.'
import { ApiConstants } from '../constants/api.constant'

const postApi = () => ({
  getPostsAPI: async (page = 1, limit = 10) => {
    try {
      const response = await apiDefault.get(ApiConstants.posts.getPosts, {
        params: { page, limit },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching posts:', error)
      throw error
    }
  },
})
export const { getPostsApi } = postApi()
