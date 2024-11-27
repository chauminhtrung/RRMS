import axios from 'axios'
import { env } from '~/configs/environment'

export const paymentPaypal = async (totalPrice) => {
  const username = JSON.parse(sessionStorage.getItem('user')).username
  return await axios.post(`${env.API_URL}/payment/payment-paypal?totalPrice=${totalPrice}&userName=${username}`)
}
