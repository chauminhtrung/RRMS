import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const SearchList = ({ totalRooms, setFilter, setArea }) => {
  const changeFilter = (e) => {
    setFilter(e)
  }

  const changeArea = (event) => {
    setArea(event)
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
            <Select label={t('muc-gia')} onChange={(e) => changeFilter(e.target.value)}>
              <MenuItem value="asc">{t('tu-thap-den-cao')}</MenuItem>
              <MenuItem value="desc">{t('tu-cao-den-thap')}</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>{t('dien-tich')}</InputLabel>
            <Select label={t('dien-tich')} onChange={(e) => changeArea(e.target.value)}>
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
