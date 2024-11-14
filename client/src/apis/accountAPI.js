import axios from 'axios'
import { env } from '~/configs/environment'

export const getAccountByUsername = async (username) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  return await axios.get(`${env.API_URL}/api-accounts/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
}

export const introspect = async () => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  return await axios.post(
    `${env.API_URL}/authen/introspect`,
    {
      token: token
    },
    {
      headers: {
        'ngrok-skip-browser-warning': '69420'
      }
    }
  )
}
export const email_valid = async (email) => {
  const response = await axios.get(`${env.API_URL}/authen/checkMail?email=${email}`, {
    headers: {
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}
export const sendOTP = async (data) => {
  const response = await axios.post(`${env.API_URL}/authen/forgetpassword`, data, {
    headers: {
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}
export const acceptChangePassword = async (data) => {
  const response = await axios.post(`${env.API_URL}/authen/acceptChangePassword`, data, {
    headers: {
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}
