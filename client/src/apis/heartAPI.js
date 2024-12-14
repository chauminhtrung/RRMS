import axios from 'axios'
import { env } from '~/configs/environment'

export const getHeartByUsername = async (data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  return await axios.get(`${env.API_URL}/hearts/${data}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
}
export const insertHeart = async (username, idbull) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.post(
    `${env.API_URL}/hearts/${username}/${idbull}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': '69420'
      }
    }
  )
  return response.data
}
