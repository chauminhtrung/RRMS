import axios from 'axios'
import { env } from '~/configs/environment'

// const apiClient = axios.create({
//   baseURL: "https://dummyjson.com", // Base URL chung
//   timeout: 5000, // Thời gian chờ
// });

export const ValidCaptchaAPI = async (token) => {
  return await axios.post(`${env.API_URL}/api/verify-captcha`, { token })
}

export const getDetail = async (roomId) => {
  return await axios.get(`${env.API_URL}/room/${roomId}`)
}

export const postReview = async (data) => {
  return await axios.post(`${env.API_URL}/room-reviews`, data)
}

export const getProfile = async (username) => {
  return await axios.get(`${env.API_URL}/api-accounts/profile?username=${username}`)
}

export const updateProfile = async (data) => {
  return await axios.put(`${env.API_URL}/api-accounts/profile`, data)
}

export const changePassword = async (data) => {
  return await axios.put(`${env.API_URL}/api-accounts/profile/change-password`, data)
}

export const searchByName = async (keyword) => {
  return await axios.get(`${env.API_URL}/searchs/name?name=${keyword}`)
}

export const getImages = async () => {
  return await axios.get(`${env.API_URL}/api/images`)
}

export const uploadImage = async (imageName, url) => {
  return await axios.post(`${env.API_URL}/api/images`, JSON.stringify({ name: imageName, url: url }))
}

export const postRoom = async (data) => {
  return await axios.post(`${env.API_URL}/room`, data)
}

export const getPostRoomTable = async (username) => {
  return await axios.get(`${env.API_URL}/room/post-room-table?username=${username}`)
}

export const getTinhThanh = async () => {
  return await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm')
}

export const getQuanHuyen = async (selectedProvince) => {
  console.log('selectedProvince', selectedProvince)

  return await axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`)
}

export const getPhuongXa = async (selectedDistrict) => {
  return await axios.get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`)
}

export const listMotel = async () => {
  return await axios.get(`${env.API_URL}/motels`)
}
export const createMotel = async (Motel) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  return await axios.post(`${env.API_URL}/motels`, Motel, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
export const getMotelByname = async (motelName) => {
  return await axios.get(`${env.API_URL}/motels/${motelName}`)
}
export const updateMotel = async (motelId, Motel) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  return await axios.put(`${env.API_URL}/motels/${motelId}`, Motel, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
export const deleteMotel = async (motelId) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  return await axios.delete(`${env.API_URL}/motels/${motelId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

//motel
export const getMotelByUsername = async (username) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  return await axios.get(`${env.API_URL}/motels/get-motel-account?username=${username}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const getMotelById = async (Id) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  if (!Id) {
    throw new Error('ID không hợp lệ')
  }
  return await axios.get(`${env.API_URL}/motels/get-motel-id?id=${Id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

//account
export const getAccountByUsername = async (username) => {
  return await axios.get(`http://localhost:8080/api-accounts/get-account/${username}`)
}


//TRC

export const CreateTRC = async (TRC) => {  
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;  
  return await axios.post(`${env.API_URL}/TemRC/insert-TemRC`,TRC,{  
      headers: {  
          'Authorization': `Bearer ${token}`  
      }  
  });  
}  

export const getTRCByusername = async (username) => {  
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;  
  if (!username) {  
      throw new Error('username không hợp lệ');  
  }  
  return await axios.get(`${env.API_URL}/TemRC/get-TemRC-account?username=${username}`, {  
      headers: {  
          'Authorization': `Bearer ${token}`  
      }  
  });  
}

export const updateTRCById= async (id,TRC) => {  
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;  
  if (!TRC && !id) {  
      throw new Error('id va TRC không hợp lệ');  
  }  
  return await axios.put(`${env.API_URL}/TemRC/update-TemRC/${id}`,TRC, {  
      headers: {  
          'Authorization': `Bearer ${token}`  
      }  
  });  
}

// muc mau hop dong
// Tạo mới một Contract Template
export const createContractTemplate = async (data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null; 
  const response = await axios.post(`${env.API_URL}/contract-templates`, data,{  
    headers: {  
        'Authorization': `Bearer ${token}`  
    }  
});
  return response.data;
};

// Lấy thông tin của một Contract Template theo ID
export const getContractTemplateById = async (id) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null; 
  const response = await axios.get(`${env.API_URL}/contract-templates/${id}`,{  
    headers: {  
        'Authorization': `Bearer ${token}`  
    }  
});
  return response.data;
};

// Lấy danh sách tất cả Contract Templates
export const getAllContractTemplates = async () => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null; 
  const response = await axios.get(`${env.API_URL}/contract-templates`,{  
    headers: {  
        'Authorization': `Bearer ${token}`  
    }  
});
  return response.data;
};

// Lấy danh sách Contract Templates theo Motel ID
export const getContractTemplatesByMotelId = async (motelId) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null; 
  const response = await axios.get(`${env.API_URL}/contract-templates/motel/${motelId}`,{  
    headers: {  
        'Authorization': `Bearer ${token}`  
    }  
});
  return response.data;
};

// Cập nhật thông tin của một Contract Template
export const updateContractTemplate = async (id, data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null; 
  const response = await axios.put(`${env.API_URL}/contract-templates/${id}`, data,{  
    headers: {  
        'Authorization': `Bearer ${token}`  
    }  
});
  return response.data;
};

// Xóa một Contract Template theo ID
export const deleteContractTemplate = async (id) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null; 
  await axios.delete(`${env.API_URL}/contract-templates/${id}`,{  
    headers: {  
        'Authorization': `Bearer ${token}`  
    }  
});
};

export const createBroker = async (data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  return await axios.post(`http://localhost:8080/broker`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const getBrokers = async (motelId) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  return await axios.get(`http://localhost:8080/broker/${motelId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

//type room
//lay danh sach type room
export const getAllTypeRoom= async () => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null; 
  const response = await axios.get(`${env.API_URL}/type-rooms`,{  
    headers: {  
        'Authorization': `Bearer ${token}`  
    }  
});
  return response.data;
};

//Motel-Service
export const createSerivceMotel= async (data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null; 
  const response = await axios.post(`${env.API_URL}/motel-services`, data,{  
    headers: {  
        'Authorization': `Bearer ${token}`  
    }  
});
  return response.data;
};

export const updateSerivceMotel = async (id, data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null; 
  const response = await axios.put(`${env.API_URL}/motel-services/${id}`, data,{  
    headers: {  
        'Authorization': `Bearer ${token}`  
    }  
});
  return response.data;
};

export const updateSerivceMotelbyMotelId = async (id, data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null; 
  const response = await axios.put(`${env.API_URL}/motel-services/update-by-motel/${id}`, data,{  
    headers: {  
        'Authorization': `Bearer ${token}`  
    }  
});
  return response.data;
};


//Room 
export const getRoomByMotelId= async (id) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null; 
  const response = await axios.get(`${env.API_URL}/room/motel/${id}`,{  
    headers: {  
        'Authorization': `Bearer ${token}`  
    }  
});
  return response.data;
};
