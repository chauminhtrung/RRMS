import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    console.log("Token received:", token); // Kiểm tra token
  
    if (token) {
      sessionStorage.setItem('userToken', token); 
      Swal.fire('Đăng nhập thành công!', 'Chào mừng bạn quay trở lại!', 'success');
      navigate('/'); 
    } else {
      Swal.fire('Đăng nhập thất bại', 'Có lỗi xảy ra, vui lòng thử lại.', 'error');
      navigate('/login');
    }
  }, [navigate]);
  
  
  return <div>Đang xử lý đăng nhập...</div>;
};

export default OAuth2RedirectHandler;
