import { Box, Button, Modal, Typography, IconButton } from '@mui/material'

const FileDownloadModal = ({ handleClose, open, downloadExcel, downloadJSON, downloadCSV }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Tải file dữ liệu
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Chọn định dạng file để tải xuống.
          </Typography>

          {/* Các nút với icon cho các định dạng file */}
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mt: 3 }}>
            <IconButton
              color="primary"
              sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
              onClick={() => {
                downloadExcel()
                handleClose()
              }}>
              <img style={{ width: '100px' }} src="https://cdn-icons-png.freepik.com/512/888/888850.png" alt="" />
              <Typography sx={{ mt: 1 }}>.xlsx</Typography>
            </IconButton>

            <IconButton
              sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
              color="primary"
              onClick={() => {
                downloadJSON()
                handleClose()
              }}>
              <img style={{ width: '100px' }} src="https://cdn-icons-png.freepik.com/512/12419/12419185.png" alt="" />
              <Typography sx={{ mt: 1 }}>.json</Typography>
            </IconButton>

            <IconButton
              color="primary"
              sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
              onClick={() => {
                downloadCSV()
                handleClose()
              }}>
              <img style={{ width: '100px' }} src="https://cdn-icons-png.freepik.com/512/6133/6133884.png" alt="" />
              <Typography sx={{ mt: 1 }}>.csv</Typography>
            </IconButton>
          </Box>

          {/* Nút đóng modal */}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              handleClose()
              console.log('Closed')
            }}
            sx={{ mt: 3 }}>
            Đóng
          </Button>
        </Box>
      </Modal>
    </div>
  )
}

export default FileDownloadModal
