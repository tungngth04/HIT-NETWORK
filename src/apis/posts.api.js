import { apiDefault, api, apiDefaultUpload } from '.'
import { ApiConstants } from '../constants/api.constant'

const postApi = () => ({
  getPostsApi: async (params) => apiDefault.get(ApiConstants.home.posts, { params }),
  createPostApi: async (formdata) => apiDefaultUpload.post(ApiConstants.users.createJob, formdata),
  getEventApi: async (params) => apiDefault.get(ApiConstants.posts.getEventPosts, { params }),
  getJobApi: async (params) => apiDefault.get(ApiConstants.posts.getEventPosts, { params }),
})
export const { getPostsApi, createPostApi, getEventApi, getJobApi } = postApi()
