import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { createBroker } from '~/apis/apiClient'

const BrokerModal = ({ handleClose, open, refreshBrokers }) => {
  const { motelId } = useParams()
  const [data, setData] = useState({
    motelId: motelId,
    name: '',
    phone: '',
    commissionRate: 0
  })

  const handleChange = (event) => {
    setData({ ...data, commissionRate: event.target.value })
  }

  const handleSubmit = () => {
    createBroker(data)
      .then(() => {
        refreshBrokers()
      })
      .catch((error) => {
        console.error('Error creating broker:', error)
      })
      .finally(() => {
        handleClose()
      })
  }

  return (
    <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { width: '500px' } }}>
      <DialogTitle>Thêm Môi Giới</DialogTitle>
      <DialogTitle sx={{ fontSize: '14px', my: 0, py: 0 }}>Thông tin người môi giới</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Tên môi giới"
          fullWidth
          variant="standard"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Số điện thoại"
          fullWidth
          variant="standard"
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />
        <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
          <InputLabel id="demo-simple-select-label">Phần trăm hoa hồng</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age" onChange={handleChange}>
            <MenuItem value={5}>5 %</MenuItem>
            <MenuItem value={10}>10 %</MenuItem>
            <MenuItem value={15}>15 %</MenuItem>
            <MenuItem value={20}>20 %</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Hủy
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BrokerModal
