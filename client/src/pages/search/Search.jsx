import { useEffect, useState } from 'react'
import { Box, Container, Grid } from '@mui/material'
import RoomList from './RoomList'
import Name from './Name'
import ListSearch from './ListSearch'
import DistrictList from './DistrictList'
import BannerHorizontal from '~/components/BannerHorizontal'
import Text from './Text'
import ItemSearch from './ItemSearch'
import { getTinhThanh } from '~/apis/apiClient'
import LoadingPage from '~/components/LoadingPage'
import FilterSearch from './FilterSearch'

const Search = ({ setIsAdmin }) => {
  const [provinces, setProvinces] = useState([])
  useEffect(() => {
    setIsAdmin(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  if (!provinces) {
    return <LoadingPage />
  }

  return (
    <Box container>
      <Container
        sx={{
          mt: 5,
          borderRadius: '6px',
        }}>
        <FilterSearch />
      </Container>

      <ListSearch />
      <Container>
        <Grid container>
          <Grid item md={9} sx={{ mb: 4 }}>
            <RoomList />
          </Grid>
          <Grid item md={3}>
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
