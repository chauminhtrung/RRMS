import { Box, IconButton, useColorScheme } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

const ModeSelect = () => {
  const { mode, setMode } = useColorScheme()

  if (!mode) {
    return null
  }

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
    console.log(newMode)
  }

  return (
    <Box
      onClick={toggleMode}
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        gap: 1
      }}>
      <IconButton color="inherit">
        {mode === 'light' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
      </IconButton>
    </Box>
  )
}

export default ModeSelect
