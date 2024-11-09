import axios from 'axios'
import { env } from '~/configs/environment'

export const CreateTRC = async (TRC) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  return await axios.post(`${env.API_URL}/TemRC/insert-TemRC`, TRC, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const getTRCByusername = async (username) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  if (!username) {
    throw new Error('username không hợp lệ')
  }
  return await axios.get(`${env.API_URL}/TemRC/get-TemRC-account?username=${username}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const updateTRCById = async (id, TRC) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  if (!TRC && !id) {
    throw new Error('id va TRC không hợp lệ')
  }
  return await axios.put(`${env.API_URL}/TemRC/update-TemRC/${id}`, TRC, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
