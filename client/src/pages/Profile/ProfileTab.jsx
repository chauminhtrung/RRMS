import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'

const ProfileTab = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={4}>
        {/* Profile Picture Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
            <Avatar
              alt="Profile Picture"
              src="/static/images/avatar/1.jpg" // Replace with dynamic image source
              sx={{ width: 100, height: 100, margin: 'auto' }}
            />
            <Typography variant="body1" sx={{ marginTop: '10px' }}>
              JPG or PNG no larger than 5 MB
            </Typography>
            <Button variant="contained" sx={{ marginTop: '15px' }}>
              Upload new image
            </Button>
          </Paper>
        </Grid>

        {/* Account Details Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Account Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Username"
                  fullWidth
                  defaultValue="username"
                  helperText="How your name will appear to others"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="First name" fullWidth defaultValue="Valerie" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Last name" fullWidth defaultValue="Luna" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Location" fullWidth defaultValue="San Francisco, CA" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Organization name" fullWidth defaultValue="Start Bootstrap" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Email address" fullWidth defaultValue="name@example.com" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Phone number" fullWidth defaultValue="555-123-4567" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Birthday"
                  fullWidth
                  defaultValue="06/10/1988"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth>
                  Save changes
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProfileTab
