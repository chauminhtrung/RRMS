import axios from 'axios'
import { env } from '~/configs/environment'

export const getProfile = async (username) => {
  return await axios.get(`${env.API_URL}/api-accounts/profile?username=${username}`)
}

export const updateProfile = async (data) => {
  return await axios.put(`${env.API_URL}/api-accounts/profile`, data)
}

export const changePassword = async (data) => {
  return await axios.put(`${env.API_URL}/api-accounts/profile/change-password`, data)
}
