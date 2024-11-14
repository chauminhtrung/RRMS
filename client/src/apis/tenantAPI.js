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
export const updateTenant = async (id, tenant) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null

  if (!token) {
    console.error('No token found, unable to authenticate')
    throw new Error('Unauthorized')
  }

  console.log('Updating tenant with data:', tenant) // Kiểm tra dữ liệu tenant trước khi gửi

  try {
    const response = await axios.put(
      `${env.API_URL}/tenant/${id}`,
      tenant, // Truyền dữ liệu tenant vào đây
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error updating tenant:', error)
    throw error
  }
}
