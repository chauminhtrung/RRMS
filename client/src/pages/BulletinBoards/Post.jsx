import { Box, Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useEffect, useState } from 'react'
import PostModal from './PostModal'
import PostRoomTable from './PostBulletinBoardTable'
import { getBulletinBoardTable } from '~/apis/bulletinBoardAPI'
import { introspect } from '~/apis/accountAPI'

const Post = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [rows, setRows] = useState([])

  const refreshBulletinBoards = () => {
    introspect().then((res) => {
      getBulletinBoardTable(res.data.issuer).then((res) => {
        const newRows = Array.from(res.result).map((item) =>
          createData(item.title, item.rentalCategory, item.address, item.rentPrice, item.area, item.status)
        )
        setRows(newRows)
      })
    })
  }

  function createData(nameRoom, typeRoom, address, price, roomArea, available) {
    return { nameRoom, typeRoom, address, price, roomArea, available }
  }

  useEffect(() => {
    introspect().then((res) => {
      getBulletinBoardTable(res.data.issuer).then((res) => {
        const newRows = Array.from(res.result).map((item) =>
          createData(item.title, item.rentalCategory, item.address, item.rentPrice, item.area, item.status)
        )
        setRows(newRows)
      })
    })
  }, [])

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
        <PostModal
          open={open}
          handleClose={handleClose}
          setOpen={setOpen}
          refreshBulletinBoards={refreshBulletinBoards}
        />
      </Box>

      <PostRoomTable rows={rows} createData={createData} />
    </Box>
  )
}

export default Post
