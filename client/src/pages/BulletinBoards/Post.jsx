import { Box, Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import PostModal from './PostModal'
import PostRoomTable from './PostBulletinBoardTable'

const Post = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h5">Danh sách tin đăng </Typography>
          <Typography variant="subtitle1">Danh sách tin đăng tìm kiếm khách thuê</Typography>
        </Box>
        <Fab
          color="success"
          aria-label="add"
          onClick={handleOpen}
          sx={{
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            width: '52px',
            height: '52px'
          }}>
          <AddIcon />
        </Fab>
        <PostModal open={open} handleClose={handleClose} />
      </Box>

      <PostRoomTable />
    </Box>
  )
}

export default Post
