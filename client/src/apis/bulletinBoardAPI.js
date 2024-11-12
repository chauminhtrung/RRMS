import axios from 'axios'
import { env } from '~/configs/environment'

// Bulletin Board
export const getBulletinBoard = async (id) => {
  const response = await axios.get(`${env.API_URL}/bulletin-board/${id}`)
  return response.data
}

export const getBulletinBoardTable = async (username) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.get(`${env.API_URL}/bulletin-board/table/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const postBulletinBoard = async (data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.post(`${env.API_URL}/bulletin-board`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const postBulletinBoardReview = async (data) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const response = await axios.post(`${env.API_URL}/bulletin-board-reviews`, data, {
    headers: {
      Authorization: `Bearer ${token}`
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
        Authorization: `Bearer ${token}`
      }
    }
  )
  return response.data
}
