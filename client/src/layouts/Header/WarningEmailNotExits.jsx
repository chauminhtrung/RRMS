import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const WarningEmailNotExits = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', bgcolor: '#ff4757' }}>
      <Typography>Vui lòng thêm email</Typography>
      <Link to="/profile" style={{ margin: '0 5px' }}>
        tại đây
      </Link>
      <Typography>để có thể sử dụng chức năng quên mật khẩu</Typography>
    </Box>
  )
}

export default WarningEmailNotExits
