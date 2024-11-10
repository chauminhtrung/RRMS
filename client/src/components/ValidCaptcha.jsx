/* eslint-disable no-unused-vars */
import { Turnstile } from '@marsidev/react-turnstile'
import axios from 'axios'
import { useState } from 'react'
import { ValidCaptchaAPI } from '~/apis/captchaAPI'

import { env } from '~/configs/environment'

const ValidCaptcha = ({ setValidCaptcha }) => {
  const [captchaToken, setCaptchaToken] = useState()
  const handleTokenReceived = async (token) => {
    setCaptchaToken(token)
    try {
      ValidCaptchaAPI(token).then((response) => {
        setValidCaptcha(response.data.success)
        if (response.data.success) {
          console.log('CAPTCHA passed!')
        } else {
          console.log('CAPTCHA failed. Try again.')
        }
      })
    } catch (error) {
      console.error('Error verifying CAPTCHA:', error)
    }
  }

  return (
    <div>
      <Turnstile
        siteKey={env.SITE_KEY}
        options={{ theme: 'light', action: 'login', execution: 'render' }}
        onSuccess={(token) => handleTokenReceived(token)}
        onError={() => setCaptchaToken(null)}
      />
    </div>
  )
}

export default ValidCaptcha
