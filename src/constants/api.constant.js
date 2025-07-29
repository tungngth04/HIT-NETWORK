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
    getDetaiEvents: '/admin/event',
    createEvents: '/admin/event',
    getAllEvents: '/admin/events',
    deleteEvents: '/admin/event',
  },
  admin: {
    getAdmin: '/users/me',
  },
}
