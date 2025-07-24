import { apiDefault } from '.'
import { ApiConstants } from '../constants/api.constant'

const authApi = () => ({
  login: async ({ username, password }) =>
    apiDefault.post(ApiConstants.auth.login, {
      username,
      password,
    }),
})

export const { login } = authApi()
