import axios from 'axios'
import { env } from '~/configs/environment'

export const ValidCaptchaAPI = async (token) => {
  return await axios.post(
    `${env.API_URL}/api/verify-captcha`,
    { token },
    {
      headers: {
        'ngrok-skip-browser-warning': '69420'
      }
    }
  )
}
