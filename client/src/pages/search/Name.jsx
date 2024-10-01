import { Box, Typography, Button } from '@mui/material'

const Name = () => {
  return (
    <Box
      sx={{
        gap: 1,
        m: 2,
        bgcolor: (theme) => (theme.palette.mode === 'light' ? '#ffffff' : '#2f3542'),
        color: (theme) => (theme.palette.mode === 'light' ? '#333' : '#00b894'),
      }}>
      <Box>
        <Typography variant="h6" sx={{ color: (theme) => (theme.palette.mode === 'light' ? '#333' : '#00b894') }}>
          Phòng trọ, nhà trọ gần khu vực này
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
        {[
          'Trường Cao đẳng Đại Việt Sài Gòn',
          'Trường Cao đẳng Đại Việt Sài Gòn',
          'Trường Cao đẳng Đại Việt Sài Gòn',
          'Trường Cao đẳng Đại Việt Sài Gòn',
          'Trường Cao đẳng Đại Việt Sài Gòn',
          'Trường Cao đẳng Đại Việt Sài Gòn',
          'Trường Cao đẳng Đại Việt Sài Gòn',
          'Trường Cao đẳng Đại Việt Sài Gòn',
          'Trường Cao đẳng Đại Việt Sài Gòn',
        ].map((school, index) => (
          <Button
            key={index}
            variant="outlined"
            fullWidth={true}
            sx={{
              textTransform: 'none',
              padding: '10px 20px',
              borderRadius: '20px',
              color: '#3f51b5',
              border: '1px solid #3f51b5',
              backgroundColor: '#fff',
              '&:hover': {
                backgroundColor: '#e3f2fd',
              },
            }}>
            {school}
          </Button>
        ))}
      </Box>
    </Box>
  )
}

export default Name
