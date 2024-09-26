/* eslint-disable react/prop-types */
// components/LocationSelect.js
import { useState, useEffect } from 'react'
import { MenuItem, FormControl, InputLabel, Select, Box } from '@mui/material'
import { getPhuongXa, getQuanHuyen, getTinhThanh } from '~/apis/apiClient'

const LocationSelect = ({ onChangeProvince, onChangeDistrict, onChangeWard }) => {
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedWard, setSelectedWard] = useState('')
  const [openTinhThanh, setOpenTinhThanh] = useState(false)
  const [openQuanHuyen, setOpenQuanHuyen] = useState(false)
  const [openPhuongXa, setOpenPhuongXa] = useState(false)
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

  useEffect(() => {
    if (selectedProvince) {
      getQuanHuyen(selectedProvince)
        .then((response) => {
          if (response.data.error === 0) {
            setDistricts(response.data.data)
            setWards([]) // Reset wards when province changes
          }
        })
        .catch((error) => {
          console.error('Error fetching districts:', error)
        })
    }
  }, [selectedProvince])

  useEffect(() => {
    if (selectedDistrict) {
      getPhuongXa(selectedDistrict)
        .then((response) => {
          if (response.data.error === 0) {
            setWards(response.data.data)
          }
        })
        .catch((error) => {
          console.error('Error fetching wards:', error)
        })
    }
  }, [selectedDistrict])

  const handleCloseTinhThanh = () => {
    setOpenTinhThanh(false)
  }

  const handleOpenTinhThanh = () => {
    setOpenTinhThanh(true)
  }
  const handleCloseQuanHuyen = () => {
    setOpenQuanHuyen(false)
  }

  const handleOpenQuanHuyen = () => {
    setOpenQuanHuyen(true)
  }
  const handleClosePhuongXa = () => {
    setOpenPhuongXa(false)
  }

  const handleOpenPhuongXa = () => {
    setOpenPhuongXa(true)
  }

  return (
    <Box sx={{ marginY: 4 }}>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="province-label">Chọn Tỉnh Thành</InputLabel>
        <Select
          labelId="province-label"
          id="province"
          value={selectedProvince}
          open={openTinhThanh}
          onClose={handleCloseTinhThanh}
          onOpen={handleOpenTinhThanh}
          onChange={(e) => {
            setSelectedProvince(e.target.value)
            handleCloseTinhThanh()
            const selected = provinces.find((item) => item.id === e.target.value)
            if (selected) {
              onChangeProvince(selected.full_name)
            }
          }}
          label="Chọn Tỉnh Thành">
          <MenuItem value="">
            <em>Tỉnh Thành</em>
          </MenuItem>
          {provinces.map((province) => (
            <MenuItem key={province.id} value={province.id}>
              {province.full_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 2 }} disabled={!selectedProvince}>
        <InputLabel id="district-label">Chọn Quận Huyện</InputLabel>
        <Select
          labelId="district-label"
          id="district"
          value={selectedDistrict}
          open={openQuanHuyen}
          onClose={handleCloseQuanHuyen}
          onOpen={handleOpenQuanHuyen}
          onChange={(e) => {
            handleCloseQuanHuyen()
            setSelectedDistrict(e.target.value)
            const selected = districts.find((item) => item.id === e.target.value)
            if (selected) {
              onChangeDistrict(selected.full_name)
            }
          }}
          label="Chọn Quận Huyện">
          <MenuItem value="">
            <em>Quận Huyện</em>
          </MenuItem>
          {districts.map((district) => (
            <MenuItem key={district.id} value={district.id}>
              {district.full_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth disabled={!selectedDistrict}>
        <InputLabel id="ward-label">Chọn Phường Xã</InputLabel>
        <Select
          labelId="ward-label"
          id="ward"
          value={selectedWard}
          open={openPhuongXa}
          onClose={handleClosePhuongXa}
          onOpen={handleOpenPhuongXa}
          onChange={(e) => {
            handleClosePhuongXa()
            setSelectedWard(e.target.value)
            onChangeWard(e.target.value)
          }}
          label="Chọn Phường Xã">
          <MenuItem value="">
            <em>Phường Xã</em>
          </MenuItem>
          {wards.map((ward) => (
            <MenuItem key={ward.id} value={ward.full_name}>
              {ward.full_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default LocationSelect
