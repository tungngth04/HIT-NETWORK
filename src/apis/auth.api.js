import { apiDefault } from '.'
import { ApiConstants } from '../constants/api.constant'

const authApi = () => ({
  login: async ({ username, password }) =>
    apiDefault.post(ApiConstants.auth.login, {
      username,
      password,
    }),
  forgotPassword: ({ username, email }) =>
    apiDefault.post(ApiConstants.auth.forgotpassword, {
      username,
      email,
    }),
})

export const { login, forgotPassword } = authApi()