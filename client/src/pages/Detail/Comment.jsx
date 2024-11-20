import { Avatar, Box, Card, CardContent, IconButton, Rating, Tooltip, Typography } from '@mui/material'
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined'
import { deleteBulletinBoardReview } from '~/apis/bulletinBoardReviewsAPI'

const Comment = ({ item, username, refreshBulletinBoards, setReview, roomId }) => {
  const handleDeleteComment = () => {
    try {
      deleteBulletinBoardReview(item.bulletinBoardReviewsId).then((res) => {
        console.log(res)
        refreshBulletinBoards()
        setReview({
          username: username,
          bulletinBoardId: roomId,
          rating: 0,
          content: ''
        })
      })
    } catch (error) {
      console.error('Lỗi xóa bình luận:', error)
    }
  }

  return (
    <Card variant="outlined" sx={{ borderRadius: 3, '--Card-radius': 0, mb: 1 }}>
      <CardContent orientation="horizontal">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Avatar src={item.account.avatar} alt={item.account.fullname} variant="rectangular" width={44} height={44} />
          <Tooltip title="Xóa bình luận này">
            <IconButton>
              <DeleteSweepOutlinedIcon
                style={{
                  display: username === item.account.username ? 'block' : 'none',
                  cursor: 'pointer',
                  fontSize: '30px'
                }}
                onClick={handleDeleteComment}
              />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="text" width={100}>
            {item.account.fullname}
          </Typography>
          <Rating value={item.rating} size="small" readOnly />
        </Box>
      </CardContent>
      <CardContent sx={{ pt: 0, '&:last-child': { pb: 1 } }}>
        <Typography variant="body1">{item.content}</Typography>
      </CardContent>
    </Card>
  )
}

export default Comment
