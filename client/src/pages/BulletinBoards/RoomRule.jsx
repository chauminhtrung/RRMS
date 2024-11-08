import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material'

const RoomRule = ({ title, desciption }) => {
  return (
    <FormControlLabel
      control={<Checkbox defaultChecked />}
      label={
        <Box>
          <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>{title}</Typography>
          <Typography sx={{ fontSize: '12px' }}>{desciption}</Typography>
        </Box>
      }
    />
  )
}

export default RoomRule
