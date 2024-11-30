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
import { useLocation, useSearchParams } from 'react-router-dom'
import { searchBulletinBoardByAddress } from '~/apis/bulletinBoardAPI'

const Search = ({ setIsAdmin }) => {
  const [provinces, setProvinces] = useState([])
  const [searchData, setSearchData] = useState([])
  const [totalRooms, setTotalRooms] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [recordedText, setRecordedText] = useState('')
  const [keyword, setKeyword] = useState('')
  const location = useLocation()
  const { searchKeyWord } = location.state || {}
  const [searchParams] = useSearchParams()

  useEffect(() => {
    switch (searchParams.get('query')) {
      case 'hcm':
        setKeyword('Hồ chí minh')
        break
      case 'hn':
        setKeyword('Hà nội')
        break
      case 'bd':
        setKeyword('Bình dương')
        break
      case 'ct':
        setKeyword('Cẩn thơ')
        break
      case 'dn':
        setKeyword('Đà nẵng')
        break
      case 'đn':
        setKeyword('Đồng nai')
        break
      case 'Quận 1':
        setKeyword('Quận 1')
        break
      case 'Quận Phú Nhuận':
        setKeyword('Quận Phú Nhuận')
        break
      case 'Tân Định':
        setKeyword('Tân Định')
        break
      case 'Đa Kao':
        setKeyword('Đa Kao')
        break
      case 'Bến Nghé':
        setKeyword('Bến Nghé')
        break
      case 'Bến Thành':
        setKeyword('Bến Thành')
        break
      case 'Nguyễn Thái Bình':
        setKeyword('Nguyễn Thái Bình')
        break
      case 'Phạm Ngũ Lão':
        setKeyword('Phạm Ngũ Lão')
        break
      case 'Cầu Ông Lãnh':
        setKeyword('Cầu Ông Lãnh')
        break
      case 'Cô Giang':
        setKeyword('Cô Giang')
        break
      case 'Nguyễn Cư Trinh':
        setKeyword('Nguyễn Cư Trinh')
        break
      case 'Cầu Kho':
        setKeyword('Cầu Kho')
        break
      case 'Thu Dau 1':
        setKeyword('Thu Dau 1')
        break
      case 'Dong An Ba':
        setKeyword('Dong An Ba')
        break
      case 'Ngoc To':
        setKeyword('Ngoc To')
        break
      default:
        setKeyword('')
    }
  }, [searchParams.get('query')])
  useEffect(() => {
    setIsAdmin(false)
    loadDataSearch()
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
  const loadDataSearch = async (searchValue) => {
    if (searchKeyWord) {
      setKeyword(searchKeyWord)

      searchBulletinBoardByAddress(searchKeyWord).then((res) => {
        setSearchData(res.result)
        setTotalRooms(res.result.length)
      })
      return
    }

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
          setSearchData(fetchedData)
          setTotalRooms(fetchedData.length)
        } else {
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
  useEffect(() => {
    loadDataSearch(searchValue)
  }, [])
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
        <FilterSearch
          setTotalRooms={setTotalRooms}
          searchKeyWord={searchKeyWord}
          setSearchData={setSearchData}
          recordedText={recordedText}
          keyword={keyword}
          setKeyword={setKeyword}
        />
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
