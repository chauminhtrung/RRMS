import { Box, CircularProgress } from '@mui/material'

const LoadingPage = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  )
}

export default LoadingPage
