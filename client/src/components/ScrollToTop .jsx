import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation() // Lấy pathname từ URL

  useEffect(() => {
    window.scrollTo(0, 0) // Cuộn lên trên cùng
  }, [pathname]) // Mỗi khi pathname thay đổi

  return null
}

export default ScrollToTop
