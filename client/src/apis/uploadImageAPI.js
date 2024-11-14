import axios from 'axios'
import { env } from '~/configs/environment'

export const getImages = async () => {
  return await axios.get(`${env.API_URL}/api/images`, {
    headers: {
      'ngrok-skip-browser-warning': '69420'
    }
  })
}

export const uploadImage = async (imageName, url) => {
  return await axios.post(`${env.API_URL}/api/images`, JSON.stringify({ name: imageName, url: url }), {
    headers: {
      'ngrok-skip-browser-warning': '69420'
    }
  })
}
