import axios from 'axios'
import { env } from '~/configs/environment'

// const apiClient = axios.create({
//   baseURL: "https://dummyjson.com", // Base URL chung
//   timeout: 5000, // Thời gian chờ
// });

export const getDetail = async (roomId) => {
  return await axios.get(`${env.API_URL}/room/${roomId}`)
}

export const postReview = async (data) => {
  return await axios.post(`${env.API_URL}/room-reviews`, data)
}

export const getProfile = async (username) => {
  return await axios.get(`${env.API_URL}/api-accounts/profile?username=${username}`)
}

export const updateProfile = async (data) => {
  return await axios.put(`${env.API_URL}/api-accounts/profile`, data)
}

export const changePassword = async (data) => {
  return await axios.put(`${env.API_URL}/api-accounts/profile/change-password`, data)
}

export const searchByName = async (keyword) => {
  return await axios.get(`${env.API_URL}/searchs/name?name=${keyword}`)
}

export const getImages = async () => {
  return await axios.get(`${env.API_URL}/api/images`)
}

export const uploadImage = async (imageName, url) => {
  return await axios.post(`${env.API_URL}/api/images`, JSON.stringify({ name: imageName, url: url }))
}

export const postRoom = async (data) => {
  return await axios.post(`${env.API_URL}/room`, data)
}

export const getPostRoomTable = async (username) => {
  return await axios.get(`${env.API_URL}/room/post-room-table?username=${username}`)
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

export const listMotel = async () => {
  return await axios.get(`${env.API_URL}/motels`)
}
export const createMotel = async (Motel) => {
  return await axios.post(`${env.API_URL}/motels`, Motel)
}
export const getMotelByname = async (motelName) => {
  return await axios.get(`${env.API_URL}/motels/${motelName}`)
}
export const updateMotel = async (motelId, Motel) => {
  return await axios.put(`${env.API_URL}/motels/${motelId}`, Motel)
}
export const deleteMotel = async (motelId) => {
  return await axios.delete(`${env.API_URL}/motels/${motelId}`)
}
export const getMotelByUsername = async (username) => {
  return await axios.get(`${env.API_URL}/motels/get-motel-account?username=${username}`)
}
