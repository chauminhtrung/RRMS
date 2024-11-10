import axios from 'axios'
import { env } from '~/configs/environment'

//Motel-Service
export const createSerivceMotel = async (data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.post(`${env.API_URL}/motel-services/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const updateSerivceMotel = async (id, data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.put(`${env.API_URL}/motel-services/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const updateSerivceMotelbyMotelId = async (id, data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.put(`${env.API_URL}/motel-services/update-by-motel/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}
