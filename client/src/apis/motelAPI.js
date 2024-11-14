import axios from 'axios'
import { env } from '~/configs/environment'

export const createMotel = async (Motel) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  return await axios.post(`${env.API_URL}/motels/create`, Motel, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
}
export const getMotelByname = async (motelName) => {
  return await axios.get(`${env.API_URL}/motels/${motelName}`)
}
export const updateMotel = async (motelId, Motel) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  return await axios.put(`${env.API_URL}/motels/${motelId}`, Motel, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
}
export const deleteMotel = async (motelId) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  return await axios.delete(`${env.API_URL}/motels/${motelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
}

export const getMotelByUsername = async (username) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  return await axios.get(`${env.API_URL}/motels/get-motel-account?username=${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
}

export const getMotelById = async (Id) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  return await axios.get(`${env.API_URL}/motels/get-motel-id?id=${Id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
}
