import axios from "axios"
const REST_API_BASE_URL = 'http://localhost:8080/motels';

export const listMotel = () => axios.get(REST_API_BASE_URL);
export const createMotel = (Motel) => axios.post(REST_API_BASE_URL,Motel);
export const getMotel = (motelName) => axios.get(REST_API_BASE_URL + '/' + motelName);
export const updateMotel = (motelId,Motel) => axios.put(REST_API_BASE_URL + '/' + motelId,Motel);
export const deleteMotel = (motelId) => axios.delete(REST_API_BASE_URL + '/' + motelId);
