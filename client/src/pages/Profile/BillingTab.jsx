import { formatterAmount } from '~/utils/formatterAmount'
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@emotion/react'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

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
  rowsPerPage: PropTypes.number.isRequired,
}

function createData(name, calories, fat) {
  return { name, calories, fat }
}

const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1))

const BillingTab = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  return (
    <Box>
      <Grid container spacing={4} sx={{ height: '100%' }}>
        {/* Billing Info Section */}
        <Grid item xs={12} md={4}>
          <Paper
            variant="outlined"
            sx={{ p: 1, height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Typography variant="subtitle1">Chi tiêu trong tháng</Typography>
            <Typography variant="h6" color="warning" sx={{ marginTop: '10px' }}>
              {formatterAmount(1000000)}
            </Typography>
            <Button variant="text" sx={{ marginTop: '10px' }}>
              Xem chi tiết
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            variant="outlined"
            sx={{ p: 1, height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Typography variant="subtitle1">Chi tiêu so với tháng trước</Typography>
            <Typography
              variant="h6"
              sx={{
                marginTop: '10px',
                color: formatterAmount(1300000) > formatterAmount(1000000) ? '#2ed573' : '#ff4757',
              }}>
              {formatterAmount(1300000)}
              {formatterAmount(1300000) > formatterAmount(1000000) ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </Typography>
            <Button variant="text" sx={{ marginTop: '10px' }}>
              Xem chi tiết
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            variant="outlined"
            sx={{ p: 1, height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Typography variant="subtitle1">Dư nợ phải trả</Typography>
            <Typography variant="h6" sx={{ marginTop: '10px', color: '#ff4757' }}>
              {formatterAmount(0)}
            </Typography>
            <Button variant="text" sx={{ marginTop: '10px' }}>
              Xem chi tiết
            </Button>
          </Paper>
        </Grid>

        {/* Billing History Section */}
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Lịch sử chi tiêu
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableBody>
                  {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map(
                    (row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                          {row.calories}
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                          {row.fat}
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
                            'aria-label': 'rows per page',
                          },
                          native: true,
                        },
                      }}
                      sx={{
                        '& .MuiTablePagination-selectLabel': {
                          mb: 0,
                        },
                        '& .MuiTablePagination-displayedRows': {
                          mb: 0,
                        },
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default BillingTab
