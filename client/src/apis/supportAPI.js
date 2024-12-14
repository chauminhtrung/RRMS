import axios from 'axios'
import { env } from '~/configs/environment'
export const insertSupport = async (data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.post(`${env.API_URL}/support/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}
