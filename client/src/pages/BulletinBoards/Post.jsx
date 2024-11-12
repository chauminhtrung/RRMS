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
  const [bulletinBoardId, setBulletinBoardId] = useState()

  const refreshBulletinBoards = () => {
    introspect().then((res) => {
      getBulletinBoardTable(res.data.issuer).then((res) => {
        const newRows = Array.from(res.result).map((item) =>
          createData(
            item.title,
            item.rentalCategory,
            item.address,
            item.rentPrice,
            item.area,
            item.status,
            item.isActive,
            item.bulletinBoardId
          )
        )
        setRows(newRows)
      })
    })
  }

  function createData(nameRoom, typeRoom, address, price, roomArea, available, isActive, bulletinBoardId) {
    return { nameRoom, typeRoom, address, price, roomArea, available, isActive, bulletinBoardId }
  }

  useEffect(() => {
    introspect().then((res) => {
      getBulletinBoardTable(res.data.issuer).then((res) => {
        const newRows = Array.from(res.result).map((item) =>
          createData(
            item.title,
            item.rentalCategory,
            item.address,
            item.rentPrice,
            item.area,
            item.status,
            item.isActive,
            item.bulletinBoardId
          )
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
          aria-label="add"
          onClick={() => {
            setBulletinBoardId(null)
            handleOpen()
          }}
          sx={{
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            width: '52px',
            height: '52px',
            bgcolor: '#ffa502'
          }}>
          <AddIcon />
        </Fab>
        <PostModal
          open={open}
          handleClose={handleClose}
          setOpen={setOpen}
          refreshBulletinBoards={refreshBulletinBoards}
          bulletinBoardId={bulletinBoardId}
        />
      </Box>

      <PostRoomTable
        rows={rows}
        createData={createData}
        handleOpen={handleOpen}
        setBulletinBoardId={setBulletinBoardId}
        refreshBulletinBoards={refreshBulletinBoards}
      />
    </Box>
  )
}

export default Post
