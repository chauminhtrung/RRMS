import axios from 'axios'
import { env } from '~/configs/environment'

//type room
//lay danh sach type room
export const getAllTypeRoom = async () => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.get(`${env.API_URL}/type-rooms`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}
