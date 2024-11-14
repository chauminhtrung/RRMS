import axios from 'axios'
import { env } from '~/configs/environment'

export const postBulletinBoardReview = async (data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.post(`${env.API_URL}/bulletin-board-reviews`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}

export const getBulletinBoardReviewByBulletinBoardIdAndUsername = async (bulletinBoardId, username) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.get(
    `${env.API_URL}/bulletin-board-reviews?bulletinBoardId=${bulletinBoardId}&username=${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': '69420'
      }
    }
  )
  return response.data
}

export const getRatingHistory = async (username) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.get(`${env.API_URL}/bulletin-board-reviews/rating-history?username=${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    }
  })
  return response.data
}
