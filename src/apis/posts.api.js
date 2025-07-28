import { apiDefault, api } from '.'
import { ApiConstants } from '../constants/api.constant'

const postApi = () => ({
  getPostsApi: async () => apiDefault.get(ApiConstants.home.posts),
  createPostApi: async ({ title, description }) =>
    apiDefault.post(ApiConstants.users.createJob, { title, description }),
})
export const { getPostsApi, createPostApi } = postApi()
