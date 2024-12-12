import axios from 'axios'
import { env } from '~/configs/environment'


const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null

export const createInvoice = async (invoiceData) => {
  const response = await axios.post(`${env.API_URL}/invoices/create`, invoiceData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data
}

// Hàm lấy danh sách hóa đơn theo motelId
export const fetchInvoices = async (motelId) => {
  const response = await axios.get(`${env.API_URL}/invoices/motel/${motelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

