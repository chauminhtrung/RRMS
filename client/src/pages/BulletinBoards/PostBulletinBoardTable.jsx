import {
  Box,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import PropTypes from 'prop-types'
import { useTheme } from '@emotion/react'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteBulletinBoard } from '~/apis/bulletinBoardAPI'
import Swal from 'sweetalert2'
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

const PostRoomTable = ({ rows, handleOpen, setBulletinBoardId, refreshBulletinBoards }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 200px)'
        }}>
        <Table stickyHeader sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên phòng</TableCell>
              <TableCell>Loại phòng</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Giá phòng</TableCell>
              <TableCell>Diện tích</TableCell>
              <TableCell>Tình trạng</TableCell>
              <TableCell>Trạng thái</TableCell>
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
                <TableRow hover key={row.name}>
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
                  <TableCell>
                    <Box>
                      <EditIcon
                        sx={{ cursor: 'pointer', color: '#1e90ff' }}
                        onClick={() => {
                          handleOpen()
                          setBulletinBoardId(row.bulletinBoardId)
                        }}
                      />
                      <DeleteIcon
                        sx={{ cursor: 'pointer', color: '#ff4757' }}
                        onClick={() => {
                          Swal.fire({
                            icon: 'warning',
                            title: 'Thông báo',
                            text: 'Bạn có muốn xóa tin này?',
                            showCancelButton: true,
                            confirmButtonText: 'Xóa',
                            cancelButtonText: 'Hủy',
                            reverseButtons: true
                          }).then((result) => {
                            if (result.isConfirmed) {
                              deleteBulletinBoard(row.bulletinBoardId)
                              refreshBulletinBoards()
                            }
                          })
                        }}
                      />
                    </Box>
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
    </>
  )
}

export default PostRoomTable
