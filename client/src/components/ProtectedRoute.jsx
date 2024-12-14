import {} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProtectedRoute = ({ children, requiredRoles }) => {
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem('user'));

  if (!user || !user.roles) {
    Swal.fire({
      icon: 'warning',
      title: 'Thông báo',
      text: 'Vui lòng đăng nhập!',
    });
    return <Navigate to="/login" replace />;
  }

  const userRoles = user.roles;

  if (!Array.isArray(userRoles)) {
    console.error('Lỗi định dạng vai trò của user');
    return <Navigate to="/login" replace />;
  }

  if (userRoles.includes('CUSTOMER') && location.pathname.startsWith('/quanlytro')) {
    Swal.fire({
      icon: 'error',
      title: 'Không đủ quyền',
      text: 'Vai trò CUSTOMER không được phép truy cập trang này!',
    });
    return <Navigate to="/login" replace />;
  }


  if (requiredRoles && !requiredRoles.some((role) => userRoles.includes(role))) {
    Swal.fire({
      icon: 'error',
      title: 'Quyền hạn không đủ',
      text: 'Bạn không có quyền truy cập trang này!',
    });
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
