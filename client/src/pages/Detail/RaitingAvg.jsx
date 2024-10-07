import { Box, Rating, Typography } from '@mui/material'
import { Grid } from '@mui/material'
import ChartRaiting from './ChartRaiting'

const RaitingAvg = ({ rating, reviews }) => {
  return (
    <Box>
      <Typography component="legend" sx={{ fontSize: '20px' }}>
        Đánh giá trung bình:
      </Typography>
      <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid item xs={4}>
          <Typography component="legend" sx={{ fontSize: '60px' }}>
            {rating}
          </Typography>
          <Rating
            sx={{
              alignItems: 'center',
              mx: 'auto',
            }}
            name="simple-controlled"
            value={rating}
            readOnly
          />
        </Grid>
        <Grid item xs={8}>
          <ChartRaiting reviews={reviews} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default RaitingAvg
