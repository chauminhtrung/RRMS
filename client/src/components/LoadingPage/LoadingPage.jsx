import { Box } from '@mui/material'
import './LoadingPage.css'

const LoadingPage = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div className="gooey">
        <span className="dot"></span>
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </Box>
  )
}

export default LoadingPage
