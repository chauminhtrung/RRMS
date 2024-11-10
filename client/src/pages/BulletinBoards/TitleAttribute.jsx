import { Box, Typography } from '@mui/material'

const TitleAttribute = ({ title, description }) => {
  return (
    <Box sx={{ fontStyle: 'normal', display: 'flex', alignItems: 'center' }}>
      <Box sx={{ bgcolor: '#1e90ff', width: '2px', height: '45px', mr: 1 }}></Box>
      <Box>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Box>
    </Box>
  )
}

export default TitleAttribute
