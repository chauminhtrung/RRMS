import axios from 'axios'
import { env } from '~/configs/environment'

export const searchByName = async (keyword) => {
  return await axios.get(`${env.API_URL}/searchs/addressBullet?address=${keyword}`, {
    headers: {
      'ngrok-skip-browser-warning': '69420'
    }
  })
}

export const roomASC = async (sortOrder = 'ASC') => {
  try {
    const response = await axios.get(`${env.API_URL}/searchs/asc`, {
      params: {
        sortOrder: sortOrder
      },
      headers: {
        'ngrok-skip-browser-warning': '69420'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
