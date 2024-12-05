import axios from 'axios'
import { env } from '~/configs/environment'

export const addHeartAPI = async (data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  return await axios.post(`${env.API_URL}/hearts/${data.username}/${data.bulletinBoardId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
}
