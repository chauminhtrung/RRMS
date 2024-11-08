import { useNavigate } from 'react-router-dom'
import './Button.css'

const GoBackButton = () => {
  const navigate = useNavigate() // Khởi tạo useNavigate để dùng điều hướng

  // Hàm xử lý khi người dùng nhấn nút
  const handleGoBack = () => {
    navigate('/') // Chuyển hướng về trang chính (root page)
  }

  return (
    <button className="cssbuttons-io-button" onClick={handleGoBack}>
      Quay về
      <div className="icon">
        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M7.828 13l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414L7.828 11H20v2z"
            fill="currentColor"></path>
        </svg>
      </div>
    </button>
  )
}

export default GoBackButton
