import { useState } from 'react'
import { Box, Button, TextField, useMediaQuery } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SearchIcon from '@mui/icons-material/Search'
import ModalSearch from './ModalSearch'
import { useTheme } from '@mui/material/styles'

function FilterSearch() {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // Sử dụng useMediaQuery để kiểm tra kích thước màn hình
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? 'column' : 'row'}
      justifyContent="space-between"
      alignItems="center"
      sx={{
        padding: isMobile ? '10px 5px' : '10px',
        borderRadius: '8px',
        gap: isMobile ? '12px' : '8px',
        maxWidth: '100%',
        mt: 4,
        paddingBottom: 5,
      }}>
      {/* Nút Bộ lọc */}
      <Button
        variant="contained"
        startIcon={<FilterListIcon />}
        onClick={handleOpen}
        sx={{
          backgroundColor: '#f8f8f8',
          color: '#000',
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': { backgroundColor: '#f0f0f0' },
          border: '1px solid #ddd',
          width: isMobile ? '100%' : '150px',
          flexShrink: 0,
        }}>
        Bộ lọc
      </Button>

      {/* Nút Toàn quốc */}
      <Button
        variant="contained"
        startIcon={<LocationOnIcon />}
        onClick={handleOpen}
        sx={{
          backgroundColor: '#f8f8f8',
          color: '#000',
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': { backgroundColor: '#f0f0f0' },
          border: '1px solid #ddd',
          width: isMobile ? '100%' : '150px',
          flexShrink: 0,
        }}>
        Toàn quốc
      </Button>
      <ModalSearch open={open} handleClose={handleClose} />

      {/* Ô nhập văn bản */}
      <TextField
        variant="outlined"
        placeholder="Nhập trường học tập..."
        fullWidth={isMobile}
        sx={{
          flexGrow: isMobile ? 0 : 1,
          width: isMobile ? '100%' : 'auto',
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: '#ffffff',
          },
        }}
      />

      {/* Nút Tìm kiếm */}
      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        sx={{
          backgroundColor: '#ff9900',
          color: 'white',
          textTransform: 'none',
          borderRadius: '8px',
          '&:hover': { backgroundColor: '#e88f00' },
          width: isMobile ? '100%' : '150px',
          flexShrink: 0,
        }}>
        Tìm kiếm
      </Button>
    </Box>
  )
}

export default FilterSearch
