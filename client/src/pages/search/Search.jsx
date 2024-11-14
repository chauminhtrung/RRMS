/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { Box, Container, Grid } from '@mui/material'
import RoomList from './RoomList'
import Name from './Name'
import ListSearch from './ListSearch'
import DistrictList from './DistrictList'
import BannerHorizontal from '~/components/BannerHorizontal'
import Text from './Text'
import ItemSearch from './ItemSearch'
import LoadingPage from '~/components/LoadingPage/LoadingPage'
import FilterSearch from './FilterSearch'
import axios from 'axios'
import ChatAI from '../AI/ChatAI'
import { getTinhThanh } from '~/apis/addressAPI'
import { env } from '~/configs/environment'

const Search = ({ setIsAdmin }) => {
  const [provinces, setProvinces] = useState([])
  const [searchData, setSearchData] = useState([])
  const [totalRooms, setTotalRooms] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [recordedText, setRecordedText] = useState('')

  useEffect(() => {
    setIsAdmin(false)
  }, [])

  useEffect(() => {
    console.log('Searching for:', searchValue) // Ghi log giá trị tìm kiếm
    loadData(searchValue)
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

  // /name?name=${searchValue}
  // Hàm để tải dữ liệu
  const loadData = async (searchValue) => {
    try {
      const response = await axios.get(`${env.API_URL}/searchs`, {
        headers: {
          'ngrok-skip-browser-warning': '69420'
        }
      })

      // Kiểm tra trạng thái phản hồi
      if (response.status === 200) {
        const fetchedData = response.data.result

        if (Array.isArray(fetchedData) && fetchedData.length > 0) {
          console.log('Data fetched:', fetchedData)
          setSearchData(fetchedData)
          setTotalRooms(fetchedData.length)
        } else {
          console.log('No results found or data is null')
          setSearchData([])
          setTotalRooms(0)
        }
      } else {
        console.log('Error: Status', response.status)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  if (!provinces) {
    return <LoadingPage />
  }

  return (
    <Box container>
      <Container
        sx={{
          mt: 5,
          borderRadius: '6px'
        }}>
        <FilterSearch setSearchData={setSearchData} recordedText={recordedText} />
      </Container>
      <ListSearch />
      <Container>
        <Grid container>
          <Grid item md={9} sx={{ mb: 4 }}>
            <RoomList setSearchValue={setSearchValue} searchData={searchData} totalRooms={totalRooms} />
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
