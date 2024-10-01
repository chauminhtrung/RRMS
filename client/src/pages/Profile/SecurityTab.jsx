import { Box, Button, FormControlLabel, Grid, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material'

const SecurityTab = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={4}>
        {/* Change Password Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Change Password
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Current Password" fullWidth type="password" />
              </Grid>
              <Grid item xs={12}>
                <TextField label="New Password" fullWidth type="password" />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Confirm Password" fullWidth type="password" />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth>
                  Save
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Two-Factor Authentication Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Two-Factor Authentication
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '15px' }}>
              Add another level of security by enabling two-factor authentication.
            </Typography>
            <RadioGroup defaultValue="on">
              <FormControlLabel value="on" control={<Radio />} label="On" />
              <FormControlLabel value="off" control={<Radio />} label="Off" />
            </RadioGroup>
            <TextField label="SMS Number" fullWidth defaultValue="555-123-4567" sx={{ marginTop: '15px' }} />
          </Paper>
        </Grid>

        {/* Account Privacy Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Security Preferences
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Account Privacy
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '10px' }}>
              Set your account to private or public.
            </Typography>
            <RadioGroup defaultValue="public">
              <FormControlLabel value="public" control={<Radio />} label="Public" />
              <FormControlLabel value="private" control={<Radio />} label="Private" />
            </RadioGroup>

            <Typography variant="subtitle1" gutterBottom sx={{ marginTop: '20px' }}>
              Data Sharing
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '10px' }}>
              Control how your data is shared with the app developers.
            </Typography>
            <RadioGroup defaultValue="yes">
              <FormControlLabel value="yes" control={<Radio />} label="Yes, share data" />
              <FormControlLabel value="no" control={<Radio />} label="No, limit data sharing" />
            </RadioGroup>
          </Paper>
        </Grid>

        {/* Delete Account Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Delete Account
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '15px' }}>
              Deleting your account is permanent and cannot be undone.
            </Typography>
            <Button variant="contained" color="error">
              I understand, delete my account
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SecurityTab
