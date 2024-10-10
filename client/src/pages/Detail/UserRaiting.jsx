import { Avatar, Box, Button, Rating, TextareaAutosize, Typography } from '@mui/material'
import { useState } from 'react'
import { postReview } from '~/apis/apiClient'

const UserRating = ({ roomId, setReviews, username, fullname, avatar }) => {
  const [review, setReview] = useState({
    username: username,
    roomId: roomId,
    fullname: fullname,
    avatar: avatar,
    comment: '',
    rating: 1,
  })

  const handleComment = () => {
    postReview(review)
      .then((response) => {
        const newReview = response.data.result // Lấy dữ liệu bình luận mới từ phản hồi
        setReviews(newReview) // Cập nhật danh sách bình luận trong component cha
        // Reset lại form
        setReview({ username: 'dung', roomId: roomId, comment: '', rating: 1 })
      })
      .catch((error) => {
        console.error('Lỗi khi đăng bình luận:', error)
      })
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography component="legend" sx={{ fontSize: '20px' }}>
        Đánh giá của bạn:
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <Avatar sx={{ mr: 1 }} src={avatar} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Rating
            sx={{ my: 'auto' }}
            name="simple-controlled"
            value={review.rating}
            size="medium"
            onChange={(event) => {
              setReview({ ...review, rating: parseInt(event.target.value) })
            }}
          />
          <TextareaAutosize
            minRows={4}
            style={{
              borderRadius: '10px',
              border: '1px solid #ccc',
              padding: '10px',
              overflow: 'hidden',
              resize: 'none',
              width: '715px',
            }}
            value={review.comment}
            placeholder="Vui lòng đánh giá: "
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
          />
        </Box>
      </Box>
      <Button variant="contained" sx={{ mt: 2, right: 1, ml: 'auto' }} onClick={handleComment}>
        Đánh giá
      </Button>
    </Box>
  )
}

export default UserRating
