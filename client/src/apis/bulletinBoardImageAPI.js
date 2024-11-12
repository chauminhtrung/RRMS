import axios from 'axios'
import { env } from '~/configs/environment'

export const deleteImageFromApi = async (id) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.delete(`${env.API_URL}/bulletin-board-image/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}
