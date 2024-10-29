import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { env } from '~/configs/environment'

const GoogleLoginRedirect = ({ setUsername, setAvatar }) => {
  const navigate = useNavigate()
  const location = useLocation() 

  useEffect(() => {
    const fetchGoogleLogin = async () => {
      try {
        const response = await axios.get(`${env.API_URL}/authen/login/oauth2${location.search}`) 
        if (response.status === 200) {
          const { token, username, avatar } = response.data
          
          // Store user data in session storage
          const userData = { username, avatar, token }
          sessionStorage.setItem('user', JSON.stringify(userData))

          // Update global app state
          setUsername(username)
          setAvatar(avatar)
          
          Swal.fire({
            icon: 'success',
            title: 'Đăng nhập thành công!',
            text: 'Chào mừng bạn quay trở lại!',
          })

          navigate('/')
        }
      } catch (error) {
        console.error('Error during Google login:', error)
        Swal.fire({
          icon: 'error',
          title: 'Đăng nhập thất bại',
          text: 'Vui lòng thử lại sau.',
        })
        navigate('/login') 
      }
    }

    fetchGoogleLogin()
  }, [location.search, navigate, setUsername, setAvatar])

  return null 
}

export default GoogleLoginRedirect
