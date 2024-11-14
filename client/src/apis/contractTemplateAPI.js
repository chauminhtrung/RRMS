import axios from 'axios'
import { env } from '~/configs/environment'

// muc mau hop dong
// Tạo mới một Contract Template
export const createContractTemplate = async (data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.post(`${env.API_URL}/contract-templates`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}

// Lấy thông tin của một Contract Template theo ID
export const getContractTemplateById = async (id) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.get(`${env.API_URL}/contract-templates/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}

// Lấy danh sách tất cả Contract Templates
export const getAllContractTemplates = async () => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.get(`${env.API_URL}/contract-templates`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}

// Lấy danh sách Contract Templates theo Motel ID
export const getContractTemplatesByMotelId = async (motelId) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.get(`${env.API_URL}/contract-templates/motel/${motelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}

// Cập nhật thông tin của một Contract Template
export const updateContractTemplate = async (id, data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.put(`${env.API_URL}/contract-templates/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}

// Xóa một Contract Template theo ID
export const deleteContractTemplate = async (id) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  await axios.delete(`${env.API_URL}/contract-templates/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
}
