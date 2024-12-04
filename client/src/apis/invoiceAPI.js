import axios from 'axios'
import { env } from '~/configs/environment'
export const createInvoice = async (invoiceData) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null

  const response = await axios.post(`${env.API_URL}/invoices/create`, invoiceData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data
}
