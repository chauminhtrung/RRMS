import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const SearchList = ({ totalRooms }) => {
  const [sortByPrice, setSortByPrice] = useState('')
  const [sortByArea, setSortByArea] = useState('')

  const handlePriceChange = (event) => {
    setSortByPrice(event.target.value)
  }

  useEffect(() => {
    console.log(totalRooms)
  }, [totalRooms])

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
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>{t('tu-thap-den-cao')}</MenuItem>
              <MenuItem value={20}>{t('tu-cao-den-thap')}</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>{t('dien-tich')}</InputLabel>
            <Select value={sortByArea} label={t('dien-tich')} onChange={handleAreaChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>{t('nho-den-lon')}</MenuItem>
              <MenuItem value={20}>{t('lon-den-nho')}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Box>
  )
}

export default SearchList
