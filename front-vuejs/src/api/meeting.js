import apiService from '../services/api-service'

const MeetingApi = {

  meet({ id }) {
    return apiService.get(`tasks/${id}/meeting`)
  },

  differ({ id }) {
    return apiService.get(`tasks/${id}/meeting/differ`)
  },

  reject({ id }) {
    return apiService.get(`tasks/${id}/meeting/reject`)
  },
}

export default MeetingApi
