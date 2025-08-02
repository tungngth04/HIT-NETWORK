export const ApiConstants = {
  auth: {
    login: '/auth/login',
    forgotpassword: '/auth/forgot-password',
    admin: '/auth/admin',
  },
  members: {
    updateMembers: '/admin/update',
    importMembers: '/admin/import',
    createMembers: '/admin/create',
    getAllMembers: '/admin/select-all',
    deleteMembers: '/admin/delete',
    detailMembers: '/admin/get-detail',
    restoreMembers: '/admin/restore',
  users: {
    changePassword: '/users/change-password',
    createJob: '/user/job',
    users: '/users/me',
  },
  home: {
    posts: '/auth/home',
  },
  posts: {
    getEventPosts: '/user/events',
    getJobPosts: '/user/jobs',
    like: '/reaction/react',
    getlike: '/reaction/get-all',
    dellike: '/reaction/delete',
    getdetail: '/user/event',
  },
  user: {
    info: '/users/me',
    update: '/users/me',
  },
}
