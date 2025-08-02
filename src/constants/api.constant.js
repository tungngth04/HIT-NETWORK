export const ApiConstants = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    user: '/auth/home',
    admin: '/auth/admin',
  },
  events: {
    updateEvents: '/admin/event/',
    // getDetaiEvents: '/admin/event/',
    getDetaiEvents: '/user/event',
    createEvents: '/admin/event',
    getAllEvents: '/user/events',
    deleteEvents: '/admin/event',
  },
  admin: {
    getAdmin: '/users/me',
  },
}
