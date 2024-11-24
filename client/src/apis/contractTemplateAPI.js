import axios from 'axios'
import { env } from '~/configs/environment'

// muc mau hop dong
// Tạo mới một Contract Template
export const createContractTemplate = async (data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.post(`${env.API_URL}/contract-templates`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}

// Lấy thông tin của một Contract Template theo ID
export const getContractTemplateById = async (id) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.get(`${env.API_URL}/contract-templates/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}



// Lấy danh sách tất cả Contract Templates
export const getAllContractTemplates = async () => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.get(`${env.API_URL}/contract-templates`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}

// Lấy danh sách Contract Templates theo Motel ID
export const getContractTemplatesByMotelId = async (motelId) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.get(`${env.API_URL}/contract-templates/motel/${motelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}

// Cập nhật thông tin của một Contract Template
export const updateContractTemplate = async (id, data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.put(`${env.API_URL}/contract-templates/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}

// Xóa một Contract Template theo ID
export const deleteContractTemplate = async (id) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  await axios.delete(`${env.API_URL}/contract-templates/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
}

// ---------------------------------------- hop dong

// Xóa hợp đồng
export const deleteContract = async (id) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;

  await axios.delete(`${env.API_URL}/contracts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420',
    },
  });
};

// Tạo hợp đồng
export const createContract = async (contractData) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;

  const response = await axios.post(`${env.API_URL}/contracts`, contractData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420',
    },
  });

  return response.data;
};

// Lấy hợp đồng theo ID
export const getContractById = async (id) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;

  const response = await axios.get(`${env.API_URL}/contracts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420',
    },
  });

  return response.data;
};

// Lấy hợp đồng theo ID Room
export const getContractByIdRoom = async (roomId) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;

  const response = await axios.get(`${env.API_URL}/contracts/room/${roomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420',
    },
  });

  return response.data;
};

// Lấy hợp đồng theo ID motel
export const getContractByIdMotel = async (motelId) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;

  const response = await axios.get(`${env.API_URL}/contracts/motel/${motelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420',
    },
  });

  return response.data;
};

// Cập nhật hợp đồng
export const updateContract = async (id, contractData) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;

  const response = await axios.put(`${env.API_URL}/contracts/${id}`, contractData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420',
    },
  });

  return response.data;
};

// ---------------------------------------- hop dong dich vu

// Tạo mới ContractService
export const createContractService = async (contractServiceData) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;

  const response = await axios.post(`${env.API_URL}/contract-service`, contractServiceData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420',
    },
  });

  return response.data;
};

// Cập nhật ContractService theo ID
export const updateContractService = async (id, contractServiceData) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;

  const response = await axios.put(`${env.API_URL}/contract-service/${id}`, contractServiceData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420',
    },
  });

  return response.data;
};

// Xóa ContractService theo ID
export const deleteContractService = async (id) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;

  await axios.delete(`${env.API_URL}/contract-service/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420',
    },
  });
};

// Lấy ContractService theo ID
export const getContractServiceById = async (id) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;

  const response = await axios.get(`${env.API_URL}/contract-service/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420',
    },
  });

  return response.data;
};

// Lấy danh sách tất cả ContractService
export const getAllContractServices = async () => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;

  const response = await axios.get(`${env.API_URL}/contract-service`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420',
    },
  });

  return response.data;
};


// ---------------------------------------- hop dong tai san
// Tạo mới ContractDevice
export const createContractDevice = async (contractDeviceData) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;

  const response = await axios.post(`${env.API_URL}/contract-device`, contractDeviceData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420',
    },
  });

  return response.data;
};

// Cập nhật ContractDevice theo ID
export const updateContractDevice = async (id, contractDeviceData) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;

  const response = await axios.put(`${env.API_URL}/contract-device/${id}`, contractDeviceData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420',
    },
  });

  return response.data;
};

// Xóa ContractDevice theo ID
export const deleteContractDevice = async (id) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;

  await axios.delete(`${env.API_URL}/contract-device/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420',
    },
  });
};

// Lấy ContractDevice theo ID
export const getContractDeviceById = async (id) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;

  const response = await axios.get(`${env.API_URL}/contract-device/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420',
    },
  });

  return response.data;
};

// Lấy danh sách tất cả ContractDevices
export const getAllContractDevices = async () => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;

  const response = await axios.get(`${env.API_URL}/contract-device`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420',
    },
  });

  return response.data;
};


//-------------------------insert tenant

export const createTenant = async (roomId,data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;

  const response = await axios.post(`${env.API_URL}/tenant/insert/${roomId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420',
    },
  });

  return response.data;
};
