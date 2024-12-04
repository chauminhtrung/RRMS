import { Avatar, Box, Button, Rating, TextareaAutosize, Tooltip, Typography } from '@mui/material'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import {
  getBulletinBoardReviewByBulletinBoardIdAndUsername,
  postBulletinBoardReview
} from '~/apis/bulletinBoardReviewsAPI'

const UserRating = ({ roomId, username, setReview, review, refreshBulletinBoards, account }) => {
  useEffect(() => {
    getBulletinBoardReviewByBulletinBoardIdAndUsername(roomId, username).then((res) => {
      const result = res.result
      // Khởi tạo review từ dữ liệu đã có nếu tồn tại
      if (result) {
        setReview({
          username: username,
          bulletinBoardId: roomId,
          rating: result.rating || 1,
          content: result.content || ''
        })
      }
    })
    setReview({ ...review, username: username })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleComment = () => {
    setReview({ ...review, username: username })
    postBulletinBoardReview(review)
      .then(() => {
        toast.success('Đánh giá thành công!')
        refreshBulletinBoards()
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
        <Tooltip title={account?.fullname}>
          <Avatar sx={{ mr: 1 }} src={account?.avatar}>
            {account?.fullname[0]}
          </Avatar>
        </Tooltip>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Rating
            sx={{ my: 'auto' }}
            name="simple-controlled"
            value={review.rating}
            size="medium"
            onChange={(event, newValue) => {
              setReview({ ...review, rating: newValue })
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
              width: '715px'
            }}
            value={review.content}
            placeholder="Vui lòng đánh giá: "
            onChange={(e) => setReview({ ...review, content: e.target.value })}
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
