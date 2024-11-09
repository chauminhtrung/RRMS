import axios from 'axios'
import { env } from '~/configs/environment'

export const getAccountByUsername = async (username) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  return await axios.get(`${env.API_URL}/api-accounts/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const introspect = async () => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  return await axios.post(`${env.API_URL}/authen/introspect`, {
    token: token
  })
}
