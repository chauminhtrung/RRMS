import axios from 'axios';
import { env } from '~/configs/environment'; // Đảm bảo rằng env.API_URL chứa URL API của bạn

// Lấy token từ sessionStorage
const getAuthToken = () => {
  const user = sessionStorage.getItem('user');
  return user ? JSON.parse(user).token : null;
};

// API Client
const apiClient = axios.create({
  baseURL: `${env.API_URL}/reserve-a-place`,
  headers: {
    'ngrok-skip-browser-warning': '69420' // Nếu bạn dùng ngrok trong môi trường phát triển
  }
});

// Thiết lập interceptor để tự động thêm Authorization header cho các yêu cầu
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Hàm API để tạo mới ReserveAPlace
export const createReserveAPlace = async (data) => {
  try {
    const response = await apiClient.post('', data);
    return response.data;
  } catch (error) {
    console.error('Error creating ReserveAPlace:', error);
    throw error;
  }
};

// Hàm API để lấy thông tin ReserveAPlace theo ID
export const getReserveAPlaceById = async (id) => {
  try {
    const response = await apiClient.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching ReserveAPlace by ID:', error);
    throw error;
  }
};

// Hàm API để lấy danh sách tất cả ReserveAPlaces
export const getAllReserveAPlaces = async () => {
  try {
    const response = await apiClient.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching all ReserveAPlaces:', error);
    throw error;
  }
};

// Hàm API để cập nhật thông tin ReserveAPlace theo ID
export const updateReserveAPlace = async (id, data) => {
  try {
    const response = await apiClient.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating ReserveAPlace:', error);
    throw error;
  }
};

// Hàm API để xóa ReserveAPlace theo ID
export const deleteReserveAPlace = async (id) => {
  try {
    await apiClient.delete(`/${id}`);
    return;
  } catch (error) {
    console.error('Error deleting ReserveAPlace:', error);
    throw error;
  }
};

// Hàm API để lấy ReserveAPlace theo Room ID
export const getReserveAPlacesByRoomId = async (roomId) => {
  try {
    const response = await apiClient.get(`/room/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching ReserveAPlaces by Room ID:', error);
    throw error;
  }
};
