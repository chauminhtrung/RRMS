import { Avatar, Box, Button, Rating, TextareaAutosize, Typography } from '@mui/material'

const UserRaiting = ({ raiting, setRaiting }) => {
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
              value={raiting}
              size="medium"
              onChange={(event, newValue) => {
                setRaiting(newValue)
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
              placeholder="Vui lòng đánh giá: "
            />
          </Box>
        </Box>

        <Button variant="contained" sx={{ mt: 2, right: 1, ml: 'auto' }}>
          Đánh giá
        </Button>
      </Box>
    </>
  )
}

export default UserRaiting
