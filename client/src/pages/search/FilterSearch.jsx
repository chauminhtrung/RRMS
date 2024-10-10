import { useState } from 'react'
import { Box, Typography, Select, MenuItem, Slider } from '@mui/material'

import ModalSearch from './ModalSearch'

import './SearchWHome.css'
function FilterSearch() {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [range, setRange] = useState([0, 50])
  const [selectedValue, setSelectedValue] = useState('Dưới 50 triệu')
  const [area, setArea] = useState([0, 50])
  const [selectedValueArea, setSelectedValueArea] = useState('Dưới 50 m2')

  const handleAreaChange = (event) => {
    const selectedValueArea = event.target.value

    // Cập nhật state cho Select và Slider dựa trên giá trị của MenuItem
    switch (selectedValueArea) {
      case '1-5':
        setArea([1, 5])
        break
      case '5-10':
        setArea([5, 10])
        break
      case '10-15':
        setArea([10, 15])
        break
      case '0-50':
        setArea([0, 50])
        break
      default:
        setArea([0, 50])
    }
    setSelectedValueArea(event.target.value)
  }
  const handleSliderChangeArea = (event, newValue) => {
    setArea(newValue) // Cập nhật khoảng giá theo Slider

    // Chuyển đổi khoảng giá của Slider thành chuỗi tương ứng để hiển thị trong Select
    const [min, max] = newValue
    if (min === 0 && max === 50) {
      setSelectedValueArea('Dưới 50 triệu')
    } else if (min === 1 && max === 5) {
      setSelectedValueArea('1-5')
    } else if (min === 5 && max === 10) {
      setSelectedValueArea('5-10')
    } else if (min === 10 && max === 15) {
      setSelectedValueArea('10-15')
    } else {
      setSelectedValueArea(`Giá từ ${min} m2 đến ${max} m2`) // Hiển thị giá trị tùy chỉnh khi di chuyển Slider
    }
  }

  const handleGiaChange = (event) => {
    const selectedValue = event.target.value

    // Cập nhật state cho Select và Slider dựa trên giá trị của MenuItem
    switch (selectedValue) {
      case '1-5':
        setRange([1, 5]) // Từ 1 triệu - 5 triệu
        break
      case '5-10':
        setRange([5, 10]) // Từ 5 triệu - 10 triệu
        break
      case '10-15':
        setRange([10, 15]) // Từ 10 triệu - 15 triệu
        break
      case '0-50':
        setRange([0, 50]) // Dưới 50 triệu
        break
      default:
        setRange([0, 50]) // Giá trị mặc định khi không khớp
    }
    setSelectedValue(event.target.value)
  }
  const handleSliderChange = (event, newValue) => {
    setRange(newValue) // Cập nhật khoảng giá theo Slider

    // Chuyển đổi khoảng giá của Slider thành chuỗi tương ứng để hiển thị trong Select
    const [min, max] = newValue
    if (min === 0 && max === 50) {
      setSelectedValue('Dưới 50 triệu')
    } else if (min === 1 && max === 5) {
      setSelectedValue('1-5')
    } else if (min === 5 && max === 10) {
      setSelectedValue('5-10')
    } else if (min === 10 && max === 15) {
      setSelectedValue('10-15')
    } else {
      setSelectedValue(`Giá từ ${min} triệu đến ${max} triệu`) // Hiển thị giá trị tùy chỉnh khi di chuyển Slider
    }
  }
  // const valuetext = (value) => {
  //   return `${value}°C`
  // }

  return (
    <section id="search-home">
      <div className="row check-availabilty" id="next">
        <div className="block-32 aos-init aos-animate" data-aos="fade-up" data-aos-offset="-200">
          <form action="#">
            <div className="row" style={{ backgroundColor: '#ffffff1f' }}>
              <div className="col-md-2 mb-3 mb-lg-0 col-lg-1 mt-2 d-none d-md-block">
                <ul id="search-bar" className="BoLoc">
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
                </ul>
              </div>
              <div className="col-md-10 mb-3 mb-lg-0 col-lg-2 mt-2">
                <ul id="search-bar">
                  <li
                    className="location-home"
                    data-toggle="modal"
                    data-target="#get-filter-data-user"
                    onClick={handleOpen}>
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
                </ul>
              </div>
              <div className="col-md-12 mb-3 mb-lg-0 col-lg-5 mt-2">
                <ul id="search-bar">
                  <li className="keyword" style={{ position: 'relative' }}>
                    <input
                      id="search-map-input"
                      type="text"
                      name="search-map-input"
                      className="form-control w-100 "
                      data-type='["Nhập nơi học tập &amp; làm việc...", "Nhập công ty làm việc...", "Nhập trường học tập...", "Nhập địa điểm nổi tiếng..."]'
                      data-period="400"
                      placeholder="Nhập nơi học tập &amp; làm việc..."
                      autoComplete="off"
                    />
                    <div className="guid-search id-1727803392186 dropdown" style={{ display: 'none' }}>
                      Suggest search...
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-12 mb-3 mb-md-0 col-lg-3">
                <div className="row">
                  <div className="col-md-6 mb-3 mb-md-0 mt-2">
                    <Select
                      style={{
                        marginBottom: '10px',
                        height: '45px',
                        display: 'block',
                        width: '100%',
                        fontSize: '1rem',
                        fontWeight: '400',
                        lineHeight: '1.5',
                        color: 'var(--bs-body-color)',
                        backgroundColor: 'var(--bs-body-bg)',
                        backgroundClip: 'padding-box',
                        border: 'var(--bs-border-width) solid var(--bs-border-color)',
                        appearance: 'none',
                        borderRadius: 'var(--bs-border-radius)',
                        transition: 'border-color .15s ease-in-out, box-shadow .15s ease-in-out',
                      }}
                      value={selectedValueArea} // Chuyển đổi state range sang dạng '1-5' để khớp với giá trị của MenuItem
                      onChange={handleAreaChange}
                      displayEmpty>
                      <Typography gutterBottom sx={{ mt: 2, mx: 1.5 }}>
                        Khoảng giá (Triệu)
                      </Typography>
                      <Box sx={{ mx: 1.5, my: 2 }}>
                        <Slider
                          value={area} // Sử dụng state range để thiết lập giá trị của Slider
                          onChange={handleSliderChangeArea}
                          max={50}
                          sx={{ width: '100%' }}
                          valueLabelDisplay="auto"
                        />
                      </Box>
                      <Typography sx={{ mx: 1.5 }}>{`Giá từ: ${area[0]} m2 đến ${area[1]} m2`}</Typography>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="1-5">Từ 1 - 5 m2</MenuItem>
                      <MenuItem value="5-10">Từ 5 - 10 m2</MenuItem>
                      <MenuItem value="10-15">Từ 10 - 15 m2</MenuItem>
                      <MenuItem value="0-50">Dưới 50 m2</MenuItem>
                    </Select>
                  </div>
                  <div className="col-md-6 mb-3 mb-md-0 mt-2">
                    <Select
                      style={{
                        display: 'block',
                        height: '45px',
                        marginBottom: '10px',
                        width: '100%',
                        fontSize: '1rem',
                        fontWeight: '400',
                        lineHeight: '1.5',
                        color: 'var(--bs-body-color)',
                        backgroundColor: 'var(--bs-body-bg)',
                        backgroundClip: 'padding-box',
                        border: 'var(--bs-border-width) solid var(--bs-border-color)',
                        appearance: 'none',
                        borderRadius: 'var(--bs-border-radius)',
                        transition: 'border-color .15s ease-in-out, box-shadow .15s ease-in-out',
                      }}
                      value={selectedValue} // Chuyển đổi state range sang dạng '1-5' để khớp với giá trị của MenuItem
                      onChange={handleGiaChange}
                      displayEmpty>
                      <Typography gutterBottom sx={{ mt: 2, mx: 1.5 }}>
                        Khoảng giá (Triệu)
                      </Typography>
                      <Box sx={{ mx: 1.5, my: 2 }}>
                        <Slider
                          value={range} // Sử dụng state range để thiết lập giá trị của Slider
                          onChange={handleSliderChange}
                          max={50}
                          sx={{ width: '100%' }}
                          valueLabelDisplay="auto"
                        />
                      </Box>
                      <Typography sx={{ mx: 1.5 }}>{`Giá từ: ${range[0]} triệu đến ${range[1]} triệu`}</Typography>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="1-5">Từ 1 - 5 triệu</MenuItem>
                      <MenuItem value="5-10">Từ 5 triệu - 10 triệu</MenuItem>
                      <MenuItem value="10-15">Từ 10 triệu - 15 triệu</MenuItem>
                      <MenuItem value="0-50">Dưới 50 triệu</MenuItem>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-1 align-self-end mt-2  mb-3">
                <button id="btn-s-h" className="before-background" aria-label="Tìm kiếm" title="Tìm kiếm">
                  Tìm kiếm
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <ModalSearch open={open} handleClose={handleClose} />
      <hr />
    </section>
  )
}

export default FilterSearch
