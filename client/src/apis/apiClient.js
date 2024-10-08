import axios from 'axios'
import { env } from '~/configs/environment'

// const apiClient = axios.create({
//   baseURL: "https://dummyjson.com", // Base URL chung
//   timeout: 5000, // Thời gian chờ
// });

export const getDetail = async (roomId) => {
  return await axios.get(`${env.API_URL}/room/${roomId}`)
}

export const getProfile = async (username) => {
  return await axios.get(`${env.API_URL}/profile?username=${username}`)
}

export const updateProfile = async (data) => {
  return await axios.put(`${env.API_URL}/profile`, data)
}

export const getImages = async () => {
  return await axios.get(`${env.API_URL}/api/images`)
}

export const uploadImage = async (imageName, url) => {
  return await axios.post(`${env.API_URL}/api/images`, JSON.stringify({ name: imageName, url: url }))
}

export const getTinhThanh = async () => {
  return await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm')
}

export const getQuanHuyen = async (selectedProvince) => {
  console.log('selectedProvince', selectedProvince)

  return await axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`)
}

export const getPhuongXa = async (selectedDistrict) => {
  return await axios.get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`)
}
