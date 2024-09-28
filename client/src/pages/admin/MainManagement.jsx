import React from 'react'
import { Box, Button } from '@mui/material'
import { Grid } from '@mui/material'
import Navbar from '~/layouts/admin/Navbar'
const MainManagement = () => {
  return (
    <Box
      sx={{
        border: (theme) => (theme.palette.mode === 'light' ? '1px solid #747d8c' : '1px solid #a4b0be'),
        padding: (theme) => theme.spacing(2),
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'sticky',
        top: 20,
      }}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={12}>
          <Navbar />
        </Grid>
        <Grid item xs={2} md={2}>
          md=8 ok
        </Grid>
        <Grid item xs={10} md={10}>
          {/* <Button
            variant="contained"
            sx={{
              bgcolor: (theme) => (theme.palette.mode === 'light' ? '#ff4757' : '#ff6b81'),
              width: '100%',
            }}>
            Báo cáo tin
          </Button> */}
          {/* <Grid container>
            <Grid item xs={6}>
              <Paper elevation={3}>
                <p>Paper 3 with elevation 3</p>
              </Paper>
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>
    </Box>
  )
}

export default MainManagement
