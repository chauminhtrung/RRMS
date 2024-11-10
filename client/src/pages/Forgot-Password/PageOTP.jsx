import React, { useState } from 'react'
const OTPInput = ({ length, onChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''))

  const handleChange = (value, index) => {
    if (isNaN(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    onChange(newOtp.join(''))

    if (value && index < length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus()
    }
  }

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus()
    }
  }

  return (
    <div className="otp-inputs">
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          id={`otp-input-${index}`}
          className="otp-input"
          maxLength="1"
          value={value}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleBackspace(e, index)}
        />
      ))}
    </div>
  )
}

export default OTPInput
