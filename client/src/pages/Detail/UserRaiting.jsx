import { Avatar, Box, Button, Rating, TextareaAutosize, Typography } from '@mui/material'
import { useState } from 'react'
import { postReview } from '~/apis/apiClient'

const UserRaiting = ({ roomId, setUpdateFlag }) => {
  const [review, setReview] = useState({
    username: 'dung',
    roomId: roomId,
    comment: '',
    rating: 1,
  })

  const handleComment = () => {
    postReview(review).then(() => {
      setUpdateFlag((prev) => !prev)
      setReview({ username: 'dung', roomId: roomId, comment: '', rating: 1 })
    })
  }
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography component="legend" sx={{ fontSize: '20px' }}>
          Đánh giá của bạn:
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Avatar sx={{ mr: 1 }} src="https://mui.com/static/images/avatar/1.jpg" />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Rating
              sx={{
                my: 'auto',
              }}
              name="simple-controlled"
              value={review.rating}
              size="medium"
              onChange={(event) => {
                setReview({ ...review, rating: event.target.value })
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
    </>
  )
}

export default UserRaiting
