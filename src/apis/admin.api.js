import { api } from '.'
import { apiDefault } from '.'
import { adminApi } from '.'
import { ApiConstants } from '../constants/api.constant'

const userApi = () => ({
  selectAllUser: () => adminApi.get(ApiConstants.admin.selectAllUser),
  updateUser: async ({ username, passwordHash, gender, dob, fullname, email }) =>
    adminApi.put(ApiConstants.admin.updateUser, {
      username,
      passwordHash,
      gender,
      dob,
      fullname,
      email,
    }),
  importUsers: async ({ fullName, gender, dateOfBirth, email }) =>
    adminApi.post(ApiConstants.admin.importUsers, {
      fullName,
      gender,
      dateOfBirth,
      email,
    }),
  createUsers: async ({ username, passwordHash, gender, dob, fullName, email }) =>
    adminApi.post(ApiConstants.admin.createUsers, {
      username,
      passwordHash,
      gender,
      dob,
      fullName,
      email,
    }),
})

export const { selectAllUser, importUsers, createUsers, updateUser } = userApi()
