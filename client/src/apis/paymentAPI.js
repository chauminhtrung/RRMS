import axios from 'axios'
import { toast } from 'react-toastify'
import { env } from '~/configs/environment'

export const paymentPaypal = async (totalPrice) => {
  const username = JSON.parse(sessionStorage.getItem('user')).username
  return await axios.post(`${env.API_URL}/payment/payment-paypal?totalPrice=${totalPrice}&userName=${username}`)
}

export const paymentVNPay = async (amount ) => {
  const username = JSON.parse(sessionStorage.getItem('user')).username

  try {
    const response = await axios.post(`${env.API_URL}/payment/create_payment`, {
      userName: username,
      totalPrice: amount 
    })

    if (response.status === 200) {
      const paymentUrl = response.data.url
      return { redirectUrl: paymentUrl }
    } else {
      throw new Error('Failed to get payment URL from server')
    }
  } catch {
    toast('Có lỗi xảy ra trong quá trình thanh toán.')
    return { redirectUrl: undefined }
  }
}

export const paymentMoMo = async (amount ) => {
  const username = JSON.parse(sessionStorage.getItem('user')).username
  try {
    const requestData = {
      totalPrice: amount,
      username
    }
    const response = await axios.post(`${env.API_URL}/payment/payMoMo`, requestData)

    if (response.data && response.data.payUrl) {
      window.location.href = response.data.payUrl
    } else {
      toast('Không nhận được URL thanh toán. Vui lòng thử lại.')
    }
  } catch {
    toast('Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.')
  }
}
export const paymentStripe = async (stripe) => {
  return await axios.post(`${env.API_URL}/payment/payment-stripe`, stripe)
}
