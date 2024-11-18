import axios from 'axios'
import { env } from '~/configs/environment'

export const createBroker = async (data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  return await axios.post(`${env.API_URL}/broker`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
}

export const getBrokers = async (motelId) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  return await axios.get(`${env.API_URL}/broker/${motelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
}
