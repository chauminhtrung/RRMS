import axios from 'axios'
import { env } from '~/configs/environment'

export const getByIdTenant = async (editId) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.get(`${env.API_URL}/tenant/tenant-id?id=${editId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}
export const updateTenant = async (id) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null

  try {
    const response = await axios.put(`${env.API_URL}/tenant/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error updating tenant:', error)
    throw error
  }
}
