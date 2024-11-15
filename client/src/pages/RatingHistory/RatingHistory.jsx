/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Chip,
  IconButton,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme
} from '@mui/material'
import { useEffect, useState } from 'react'
import { introspect } from '~/apis/accountAPI'
import { getRatingHistory } from '~/apis/bulletinBoardReviewsAPI'
import LastPageIcon from '@mui/icons-material/LastPage'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { PropTypes } from 'prop-types'
import StartIcon from '@mui/icons-material/Start'
import { Link } from 'react-router-dom'

const RatingHistory = ({ setIsAdmin }) => {
  const [rows, setRows] = useState([])

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0
  function TablePaginationActions(props) {
    const theme = useTheme()
    const { count, page, rowsPerPage, onPageChange } = props

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0)
    }

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1)
    }

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1)
    }

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    }

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page">
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page">
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    )
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired
  }

  function createData(
    nameRoom,
    typeRoom,
    address,
    price,
    roomArea,
    available,
    isActive,
    bulletinBoardId,
    rating,
    content,
    bulletinBoardImages
  ) {
    return {
      nameRoom,
      typeRoom,
      address,
      price,
      roomArea,
      available,
      isActive,
      bulletinBoardId,
      rating,
      content,
      bulletinBoardImages
    }
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(() => {
    setIsAdmin(false)
    introspect().then((res) => {
      getRatingHistory(res.data.issuer).then((res) => {
        const newRows = Array.from(res.result).map((item) =>
          createData(
            item.bulletinBoard.title,
            item.bulletinBoard.rentalCategory,
            item.bulletinBoard.address,
            item.bulletinBoard.rentPrice,
            item.bulletinBoard.area,
            item.bulletinBoard.status,
            item.bulletinBoard.isActive,
            item.bulletinBoard.bulletinBoardId,
            item.rating,
            item.content,
            item.bulletinBoardImages[0].imageLink
          )
        )
        setRows(newRows)
      })
    })
  }, [])
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mx: 8 }}>
      <Typography variant="h5" sx={{ my: 2 }}>
        Lịch sử đánh giá của bạn
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Table stickyHeader sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow
              sx={{
                '& .MuiTableCell-root': {
                  textAlign: 'center'
                }
              }}>
              <TableCell>STT</TableCell>
              <TableCell>Tên phòng</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Loại phòng</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Giá phòng</TableCell>
              <TableCell>Diện tích</TableCell>
              <TableCell>Tình trạng</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Bình luận</TableCell>
              <TableCell>Đánh giá</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              flex: 1,
              overflow: 'auto'
            }}>
            {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map(
              (row, i) => (
                <TableRow
                  hover
                  key={row.name}
                  sx={{
                    '& .MuiTableCell-root': {
                      textAlign: 'center'
                    }
                  }}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 150,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                    {row.nameRoom}
                  </TableCell>
                  <TableCell>
                    <img width={100} src={row.bulletinBoardImages} alt="" srcSet="" />
                  </TableCell>
                  <TableCell>{row.typeRoom}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 150,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                    {row.address}
                  </TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.roomArea}</TableCell>
                  <TableCell>
                    <Chip
                      variant="outlined"
                      sx={{ color: row.available ? '#7bed9f' : '#ff6b81' }}
                      label={row.available ? 'Đang cho thuê' : 'Đã cho thuê'}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      variant="outlined"
                      sx={{ color: row.isActive ? '#7bed9f' : '#ff6b81' }}
                      label={row.isActive ? 'Đã phê duyệt' : 'Chưa phê duyệt'}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 150,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                    {row.content}
                  </TableCell>
                  <TableCell>
                    <Rating name="simple-controlled" value={row.rating} />
                  </TableCell>
                  <TableCell>
                    <Link to={`/detail/${row.bulletinBoardId}`}>
                      <StartIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              )
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      'aria-label': 'rows per page2'
                    }
                  }
                }}
                labelRowsPerPage="Số dòng mỗi trang:"
                sx={{
                  '&.MuiTablePagination-root': {
                    overflow: 'visible',
                    border: 'none'
                  },
                  '& .MuiTablePagination-selectLabel': {
                    mb: 0
                  },
                  '& .MuiTablePagination-displayedRows': {
                    mb: 0
                  }
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default RatingHistory
