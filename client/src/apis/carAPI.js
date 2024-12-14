import axios from 'axios'
import { env } from '~/configs/environment'

export const createCar = async (Car) => {
    const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
    return await axios.post(`${env.API_URL}/cars`, Car, {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': '69420'
      }
    })
  }

  export const updateCar = async (carId, car) => {
    const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
    return await axios.put(`${env.API_URL}/cars/${carId}`, car, {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': '69420'
      }
    })
  }
  export const deleteCar= async (carId) => {
    const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
    return await axios.delete(`${env.API_URL}/cars/${carId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': '69420'
      }
    })
  }

  export const getCarByRoomId= async (roomId) => {
    const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
    return await axios.get(`${env.API_URL}/cars/room/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': '69420'
      }
    })
  }

  export const getCarByCarId= async (carId) => {
    const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
    return await axios.get(`${env.API_URL}/cars/${carId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': '69420'
      }
    })
  }