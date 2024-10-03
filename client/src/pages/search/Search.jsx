import { useEffect, useState } from 'react'
import { Box, Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Slider } from '@mui/material'
import RoomList from './RoomList'
import SearchList from './SearchList'
import Name from './Name'
import ListSearch from './ListSearch'
import DistrictList from './DistrictList'
import BannerHorizontal from '~/components/BannerHorizontal'
import Text from './Text'
import ItemSearch from './ItemSearch'
import { getTinhThanh } from '~/apis/apiClient'
import LoadingPage from '~/components/LoadingPage'
import FilterSearch from './FilterSearch'

const Search = () => {
  const [provinces, setProvinces] = useState([])
  const [gia, setGia] = useState([0, 50])
  const [dienTich, setDienTich] = useState([0, 50])

  useEffect(() => {
    getTinhThanh()
      .then((response) => {
        if (response.data.error === 0) {
          setProvinces(response.data.data)
        }
      })
      .catch((error) => {
        console.error('Error fetching provinces:', error)
      })
  }, [])

  const handleDienTichChange = (event, newValue) => {
    setDienTich(event.target.value)
    setDienTich(newValue)
  }

  const handleChange = (event, newValue) => {
    setGia(event.target.value)
    setGia(newValue)
  }

  const valuetext = (value) => {
    return `${value}°C`
  }

  if (!provinces) {
    return <LoadingPage />
  }

  return (
    <Box container>
      <Container
        sx={{
          mt: 5,
          border: '3px solid #ccc',
          borderRadius: '6px',
          bgcolor: 'secondary.main',
        }}>
        <FilterSearch />
        <Grid container justifyContent="center" spacing={2} sx={{ mb: 4 }}>
          {/* Select Giá */}
          <Grid item xs={12} sm={6} md={5}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Giá</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={gia}
                label="Giá"
                onChange={handleChange}>
                <Typography gutterBottom sx={{ mt: 2, mx: 1.5 }}>
                  Khoảng giá (Triệu)
                </Typography>

                {/* Slider cho Giá */}
                <Box sx={{ mx: 1.5, my: 2 }}>
                  <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={gia}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    max={50}
                    sx={{
                      width: {
                        xs: '100%', // Chiều rộng cho màn hình nhỏ (mobile)
                        sm: '100%', // Chiều rộng cho màn hình trung bình (tablet)
                        md: '100%', // Chiều rộng cho màn hình lớn hơn
                      },
                    }}
                  />
                </Box>

                <Typography sx={{ mx: 1.5 }}>{`Giá từ: ${gia[0]} triệu - ${gia[1]} triệu`}</Typography>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Dưới 1 triệu</MenuItem>
                <MenuItem value={20}>Từ 1 triệu - 5 triệu</MenuItem>
                <MenuItem value={30}>Từ 5 triệu - 10 triệu</MenuItem>
                <MenuItem value={40}>Dưới 50 triệu</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Select Diện Tích */}
          <Grid item xs={12} sm={6} md={5}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Diện Tích</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={dienTich}
                label="Diện Tích"
                onChange={handleDienTichChange}>
                <Typography gutterBottom sx={{ mt: 2, mx: 1.5 }}>
                  Diện tích (m²)
                </Typography>

                {/* Slider cho Diện Tích */}
                <Box sx={{ mx: 1.5, my: 2 }}>
                  <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={dienTich}
                    onChange={handleDienTichChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    max={50}
                    sx={{
                      width: {
                        xs: '100%', // Chiều rộng cho màn hình nhỏ (mobile)
                        sm: '100%', // Chiều rộng cho màn hình trung bình (tablet)
                        md: '100%', // Chiều rộng cho màn hình lớn hơn
                      },
                    }}
                  />
                </Box>

                <Typography sx={{ mx: 1.5 }}>{`Diện tích từ: ${dienTich[0]} m² - ${dienTich[1]} m²`}</Typography>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Dưới 50m²</MenuItem>
                <MenuItem value={20}>50m² - 100m²</MenuItem>
                <MenuItem value={30}>100m² - 200m²</MenuItem>
                <MenuItem value={40}>Trên 200m²</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>

      <ListSearch />
      <SearchList />
      <Container>
        <Grid container>
          <Grid item md={9} sx={{ mb: 3 }}>
            <RoomList />
          </Grid>
          <Grid item md={3} sx={{ mt: { xs: 2, md: 4 } }}>
            <Name />
            <DistrictList />
          </Grid>
        </Grid>
      </Container>
      {/* <ResponsiveMenu /> */}
      <Container>
        <Text />
        <BannerHorizontal />
        <ItemSearch />
      </Container>
    </Box>
  )
}

export default Search
