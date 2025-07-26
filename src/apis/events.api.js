import { api, apiDefault, apiDefaultUpload } from '.'
import { ApiConstants } from '../constants/api.constant'

const eventsApi = () => ({
  //   updateEvents: '/admin/event/',
  //   getDetaiEvents: '/admin/event',
  //   postEvents: 'adimn/event',
  getAllEvents: async (params) => api.get(ApiConstants.events.getAllEvents, {params}),
  // getDetaiEvents: async (id) => api.get(`${ApiConstants.events.getDetaiEvents}${id}`),
  getDetaiEvents: async (id) => api.get(`${ApiConstants.events.getDetaiEvents}?eventId=${id}`),
  createEvents: async (eventData) =>
    apiDefaultUpload.post(
      ApiConstants.events.createEvents,
      eventData, // du lieu gui len
    ),
  updateEvents: async (id, eventData) =>
    apiDefault.put(`${ApiConstants.events.updateEvents}${id}`, eventData),
})

export const { getAllEvents, createEvents, getDetaiEvents, updateEvents } = eventsApi()
