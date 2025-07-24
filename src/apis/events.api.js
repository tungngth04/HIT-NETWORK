import { api, apiDefaultUpload } from '.'
import { ApiConstants } from '../constants/api.constant'

const eventsApi = () => ({
  //   updateEvents: '/admin/event/',
  //   getDetaiEvents: '/admin/event',
  //   postEvents: 'adimn/event',
  getAllEvents: async () => api.get(ApiConstants.events.getAllEvents),
  createEvents: async (eventData) =>
    apiDefaultUpload.post(
      ApiConstants.events.createEvents,
      eventData, // du lieu gui len
    ),
})

export const { getAllEvents, createEvents } = eventsApi()
