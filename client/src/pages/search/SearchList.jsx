import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { roomASC } from '~/apis/searchAPI'

const SearchList = ({ totalRooms, searchData }) => {
  const [sortByPrice, setSortByPrice] = useState('ASC')
  const [sortByArea, setSortByArea] = useState('asc')

  const handlePriceChange = async (event) => {
    const value = event.target.value
    setSortByPrice(value)
    console.log(value)
    try {
      const response = await roomASC(value)
      toast.success('aaaa')
      searchData(response)
    } catch (error) {
      toast.success(error)
    }
  }
  const fetchRooms = async () => {
    try {
      const response = await roomASC(sortByPrice)
      console.log(response)
      searchData(response)
    } catch (error) {
      console.error('Error loading rooms:', error)
    }
  }

  useEffect(() => {
    fetchRooms()
  }, [sortByPrice])

  const handleAreaChange = (event) => {
    setSortByArea(event.target.value)
  }
  const { t } = useTranslation()
  return (
    <Box>
      {/* Header Section */}
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="body1" sx={{ mt: 1 }}>
          {t('co')} {totalRooms} {t('phong-tro-nha-tro')}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>{t('muc-gia')}</InputLabel>
            <Select value={sortByPrice} label={t('muc-gia')} onChange={handlePriceChange}>
              <MenuItem value="asc">{t('tu-thap-den-cao')}</MenuItem>
              <MenuItem value="desc">{t('tu-cao-den-thap')}</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>{t('dien-tich')}</InputLabel>
            <Select value={sortByArea} label={t('dien-tich')} onChange={handleAreaChange}>
              <MenuItem value="asc">{t('nho-den-lon')}</MenuItem>
              <MenuItem value="desc">{t('lon-den-nho')}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Box>
  )
}

export default SearchList
