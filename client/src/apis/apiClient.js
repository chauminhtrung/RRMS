import axios from 'axios'

// const apiClient = axios.create({
//   baseURL: "https://dummyjson.com", // Base URL chung
//   timeout: 5000, // Thời gian chờ
// });

export const getDetail = async () => {
  return await axios.get('https://dummyjson.com/c/1075-ae39-4e61-82cc')
}

export const getImages = async () => {
  return await axios.get('http://localhost:8000/api/images')
}

export const uploadImage = async (imageName, url) => {
  return await axios.post('http://localhost:8000/api/images', JSON.stringify({ name: imageName, url: url }))
}

export const getTinhThanh = async () => {
  return await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm')
}

export const getQuanHuyen = async ({ selectedProvince }) => {
  return await axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`)
}

export const getPhuongXa = async (selectedDistrict) => {
  return await axios.get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`)
}
