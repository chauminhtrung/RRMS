import axios from 'axios'
import { env } from '~/configs/environment'

export const searchByName = async (keyword) => {
  return await axios.get(`${env.API_URL}/searchs/addressBullet?address=${keyword}`)
}
