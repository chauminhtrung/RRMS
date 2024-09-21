import axios from "axios";

// const apiClient = axios.create({
//   baseURL: "https://dummyjson.com", // Base URL chung
//   timeout: 5000, // Thời gian chờ
// });

export const getDetail = async () => {
  return await axios.get("https://dummyjson.com/c/1075-ae39-4e61-82cc");
};
