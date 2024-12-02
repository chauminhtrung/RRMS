import axios from 'axios'
import { env } from '~/configs/environment'

//Room
export const getRoomByMotelId = async (id) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.get(`${env.API_URL}/room/motel/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}

export const createRoom = async (data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.post(`${env.API_URL}/room`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}

export const getRoomById = async (id) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.get(`${env.API_URL}/room/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}

export const updateRoom = async (id, data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.put(`${env.API_URL}/room/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const updateContractStatus = async (roomId, newStatus, reportCloseDate) => {
  // Lấy token từ sessionStorage
  const token = sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user')).token
    : null;

  if (!token) {
    throw new Error('User is not authenticated');
  }

  try {
    // Gọi API
    const response = await axios.put(
      `${env.API_URL}/contracts/update-status`, 
      null, // Không cần body vì backend sử dụng query parameters
      {
        headers: {
          Authorization: `Bearer ${token}`, // Truyền token để xác thực
        },
        params: {
          roomId: roomId, // Truyền roomId dưới dạng query parameter
          newStatus: newStatus, // Truyền newStatus dưới dạng query parameter
          reportCloseDate: reportCloseDate, // Thêm reportCloseDate vào query parameters
        },
      }
    );

    // Trả về dữ liệu từ API
    return response.data;
  } catch (error) {
    // Xử lý lỗi
    console.error(error);
    throw new Error(
      error.response?.data?.message || 'Failed to update contract status'
    );
  }
};

export const postRoom = async (data) => {
  return await axios.post(`${env.API_URL}/room`, data, {
    headers: {
      'ngrok-skip-browser-warning': '69420'
    }
  })
}

export const getPostRoomTable = async (username) => {
  return await axios.get(`${env.API_URL}/room/post-room-table?username=${username}`, {
    headers: {
      'ngrok-skip-browser-warning': '69420'
    }
  })
}

//Room Serivce
export const createRoomService = async (data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.post(`${env.API_URL}/room-service`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}

export const getServiceRoombyRoomId = async (id) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.get(`${env.API_URL}/room-service/room/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}

export const DeleteRoomServiceByid = async (id) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.delete(`${env.API_URL}/room-service/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}

export const updateSerivceRoom = async (id, data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.put(`${env.API_URL}/room-service/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}

export const DeleteRoomByid = async (id) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.delete(`${env.API_URL}/room/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}

export const getRoomByMotelIdWContract = async (id) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.get(`${env.API_URL}/room/motel/W-Contract/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}

export const getRoomByMotelIdYContract = async (id) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.get(`${env.API_URL}/room/motel/Y-Contract/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}
