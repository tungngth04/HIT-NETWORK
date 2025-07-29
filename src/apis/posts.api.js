import { apiDefault, api, apiDefaultUpload } from '.'
import { ApiConstants } from '../constants/api.constant'

const postApi = () => ({
  getPostsApi: async (params) => apiDefault.get(ApiConstants.home.posts, { params }),
  createPostApi: async (formdata) => apiDefaultUpload.post(ApiConstants.users.createJob, formdata),
})
export const { getPostsApi, createPostApi } = postApi()
