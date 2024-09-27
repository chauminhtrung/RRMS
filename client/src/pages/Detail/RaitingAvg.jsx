import { Box, Rating, Typography } from '@mui/material'
import { Grid } from '@mui/material'
import ChartRaiting from './ChartRaiting'

const RaitingAvg = () => {
  return (
    <Box>
      <Typography component="legend" sx={{ fontSize: '20px' }}>
        Đánh giá trung bình:
      </Typography>
      <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid item xs={4}>
          <Typography component="legend" sx={{ fontSize: '60px' }}>
            {0}
          </Typography>
          <Rating
            sx={{
              alignItems: 'center',
              mx: 'auto',
            }}
            name="simple-controlled"
            value={6}
            readOnly
          />
        </Grid>
        <Grid item xs={8}>
          {/* <Box display="flex" alignItems="center">
            <Typography variant="subtitle1" style={{ marginRight: 16 }}>
              5
            </Typography>
            <LinearProgress
              variant="determinate"
              value={28}
              sx={{
                flexGrow: 1,
                height: 12,
                mr: 5,
                '& .MuiLinearProgress-bar': {
                  borderRadius: '8px',
                },
                '& .MuiLinearProgress-root': {
                  borderRadius: '8px',
                },
              }}
            />
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle1" style={{ marginRight: 16 }}>
              4
            </Typography>
            <LinearProgress
              variant="determinate"
              value={28}
              sx={{
                flexGrow: 1,
                height: 12,
                mr: 5,
                '& .MuiLinearProgress-bar': {
                  borderRadius: '8px',
                },
              }}
            />
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle1" style={{ marginRight: 16 }}>
              3
            </Typography>
            <LinearProgress
              variant="determinate"
              value={28}
              sx={{
                flexGrow: 1,
                height: 12,
                mr: 5,
                '& .MuiLinearProgress-bar': {
                  borderRadius: '8px',
                },
              }}
            />
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle1" style={{ marginRight: 16 }}>
              2
            </Typography>
            <LinearProgress
              variant="determinate"
              value={28}
              sx={{
                flexGrow: 1,
                height: 12,
                mr: 5,
                '& .MuiLinearProgress-bar': {
                  borderRadius: '8px',
                },
              }}
            />
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle1" style={{ marginRight: 16 }}>
              1
            </Typography>
            <LinearProgress
              variant="determinate"
              value={28}
              sx={{
                flexGrow: 1,
                height: 12,
                mr: 5,
                '& .MuiLinearProgress-bar': {
                  borderRadius: '8px',
                },
              }}
            />
          </Box> */}
          <ChartRaiting />
        </Grid>
      </Grid>
    </Box>
  )
}

export default RaitingAvg
