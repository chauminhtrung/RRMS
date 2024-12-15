import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
  Typography,
  IconButton
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { format } from 'date-fns'
import { getAllSupport } from '~/apis/supportAPI'
import LoadingPage from '~/components/LoadingPage/LoadingPage'

const ListSupports = () => {
  // State quản lý dữ liệu tài khoản
  const [supports, setSupports] = useState([]) // Mảng dữ liệu tài khoản
  const [loading, setLoading] = useState(true) // Trạng thái đang tải
  const [page, setPage] = useState(0) // Trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5) // Số dòng mỗi trang

  // Dữ liệu tài khoản giả lập
  const getAllSupports = async () => {
    try {
      const response = await getAllSupport()
      console.log(response)
      setSupports(response.result)
    } catch (error) {
      console.log(error)

      setSupports([])
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getAllSupports()
      setLoading(false)
    }, 1000)
  }, [])

  // Hàm chuyển trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  // Hàm thay đổi số dòng mỗi trang
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Hàm chỉnh sửa
  const handleEdit = (username) => {
    console.log('Edit user:', username)
    // Xử lý chỉnh sửa ở đây
  }

  // Hàm xóa
  const handleDelete = (id) => {
    console.log('Delete user with id:', id)
    // Xử lý xóa ở đây
  }

  return (
    <div className="row">
      <TableContainer sx={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Ngày vào ở</TableCell>
              <TableCell>Giá từ</TableCell>
              <TableCell>Giá đến</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <LoadingPage />
                </TableCell>
              </TableRow>
            ) : supports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <Typography color="error">Không có kết quả tìm kiếm nào.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              supports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((support) => (
                <TableRow>
                  <TableCell>{support.nameContact}</TableCell>
                  <TableCell>{support.phoneContact}</TableCell>
                  <TableCell>{support.dateOfStay}</TableCell>
                  <TableCell>{support.priceFirst}</TableCell>
                  <TableCell>{support.priceEnd}</TableCell>

                  <TableCell>{support.role}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          sx={{ marginTop: '10px' }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={supports.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  )
}

export default ListSupports
