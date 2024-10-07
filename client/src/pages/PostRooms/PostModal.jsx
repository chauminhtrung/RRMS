import { Box, Divider, Modal, Typography } from '@mui/material'
import ViewInArIcon from '@mui/icons-material/ViewInAr'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
}
const PostModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ViewInArIcon />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Thêm tin đăng
          </Typography>
        </Box>
        <Divider sx={{ bgcolor: '#333' }} />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  )
}

export default PostModal
