import { useState } from 'react'
import { Box, Typography, Select, MenuItem, Slider } from '@mui/material'

import ModalSearch from './ModalSearch'

import './SearchWHome.css'
function FilterSearch() {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [gia, setGia] = useState([0, 50])
  const [dienTich, setDienTich] = useState([0, 50])

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

  return (
    <section id="search-home">
      <ul id="search-bar">
        <li
          className="small"
          data-toggle="modal"
          data-target="#get-filter-data-user"
          onClick={handleOpen}
          style={{
            alignItems: 'center',
            display: 'flex',
            marginRight: '7px',
          }}>
          <div
            style={{
              minWidth: '75px',
              height: '100%',
              backgroundColor: '#fff',
              borderRadius: '5px',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="css-i6dzq1">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            <span style={{ fontSize: '13px' }}>Bộ lọc</span>
          </div>
        </li>
        <li className="location-home" data-toggle="modal" data-target="#get-filter-data-user" onClick={handleOpen}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '5px' }}>
              <svg
                viewBox="0 0 24 24"
                width="17"
                height="17"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="css-i6dzq1">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div>
              <b className="province-location-show">Hồ Chí Minh</b>
              <br />
              <span className="district-location-show">Quận 1</span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#666',
            }}>
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="css-i6dzq1">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </li>
        <li className="keyword" style={{ position: 'relative' }}>
          <input
            id="search-map-input"
            type="text"
            name="search-map-input"
            className="item-search form-control typewrite pac-target-input"
            data-type='["Nhập nơi học tập &amp; làm việc...", "Nhập công ty làm việc...", "Nhập trường học tập...", "Nhập địa điểm nổi tiếng..."]'
            data-period="400"
            placeholder="Nhập nơi học tập &amp; làm việc..."
            autoComplete="off"
          />
          <div className="guid-search id-1727803392186 dropdown" style={{ display: 'none' }}>
            Suggest search...
          </div>
        </li>
        <li className="price dropup">
          <Select
            style={{ height: '100%', backgroundColor: '#ffffff', width: '137px' }}
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
        </li>
        <li className="area dropup">
          <Select
            style={{ height: '100%', backgroundColor: '#ffffff', width: '137px' }}
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
        </li>
        <li className="btn-search">
          <button id="btn-s-h" className="before-background" aria-label="Tìm kiếm" title="Tìm kiếm">
            Tìm kiếm
          </button>
        </li>
      </ul>
      <ModalSearch open={open} handleClose={handleClose} />
      <hr />
    </section>
  )
}

export default FilterSearch
