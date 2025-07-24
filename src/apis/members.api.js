import { api, apiDefaultUpload } from '.'
import { apiDefault } from '.'
import { ApiConstants } from '../constants/api.constant'

const membersApi = () => ({
  getAllMembers: async () => api.get(ApiConstants.members.getAllMembers),
  updateMembers: async (memberData, id) =>
    api.put(
      `${ApiConstants.members.updateMembers}${id}`,
      memberData, // gửi lên
    ),

  createMembers: async (memberData) =>
    api.post(
      ApiConstants.members.createMembers,
      memberData, // gửi lên
    ),

  deleteMembers: async (name) =>
    api.delete(
      ApiConstants.members.deleteMembers,
      name, // gửi lên
    ),

  importMembers: async (data) => apiDefaultUpload.post(ApiConstants.members.importMembers, data),
})

export const { getAllMembers, updateMembers, createMembers, deleteMembers, importMembers } =
  membersApi()
