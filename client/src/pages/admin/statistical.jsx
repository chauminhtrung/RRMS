import React, {  useEffect } from 'react'
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
} from '@mui/material'
import dayjs from 'dayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
// import { useParams } from 'react-router-dom'
const RentalStatus = ({ setIsAdmin, setIsNavAdmin, isNavAdmin, motels, setmotels }) => {
  const [value, setValue] = React.useState(0)
  // const { motelName } = useParams() // Lấy tham số motelName từ URL
  // const [motel, setmotel] = useState(null)

  useEffect(() => {
    setIsAdmin(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box>
      <NavAdmin
        setmotels={setmotels}
        motels={motels}
        setIsAdmin={setIsAdmin}
        setIsNavAdmin={setIsNavAdmin}
        isNavAdmin={isNavAdmin}
      />
      <Tabs value={value} onChange={handleChange} centered>
        <Tab
          label={
            <span style={{ fontSize: '15px' }}>
              <i className="bi bi-pie-chart me-2"></i>
              Tình trạng nhà cho thuê
            </span>
          }
        />
        <Tab
          label={
            <span style={{ fontSize: '15px' }}>
              <i className="bi bi-currency-dollar me-2"></i>
              Báo cáo tài chính
            </span>
          }
        />
      </Tabs>
      <Box p={3}>
        {value === 0 && <HouseRentalTable />}
        {value === 1 && <ContractEndingTable />}
      </Box>
    </Box>
  )
}

const HouseRentalTable = () => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="mt-3">
          <Typography variant="h4" className="title-item">
            Tình trạng các nhà cho thuê <br />
            <i className="des" style={{ fontSize: '15px' }}>
              Thông tin về số phòng đang ở, đang nợ, đang cọc....
            </i>
          </Typography>
          <div className="padding">
            <Table className="table table-bordered text-center">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Tên nhà cho thuê</b>
                  </TableCell>
                  <TableCell>
                    <b>Tổng phòng</b>
                  </TableCell>
                  <TableCell>
                    <b>Có thể cho thuê</b>
                  </TableCell>
                  <TableCell>
                    <b>Đang thuê</b>
                  </TableCell>
                  <TableCell>
                    <b>Đang cọc giữ phòng</b>
                  </TableCell>
                  <TableCell>
                    <b>Đang nợ</b>
                  </TableCell>
                  <TableCell>
                    <b>Báo kết thúc</b>
                  </TableCell>
                  <TableCell>
                    <b>Sắp kết thúc</b>
                  </TableCell>
                  <TableCell>
                    <b>Quá hạn hợp đồng</b>
                  </TableCell>
                  <TableCell>
                    <b>Hợp đồng đã liên kết</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>trungkien</TableCell>
                  <TableCell className="number">10</TableCell>
                  <TableCell className="number">
                    0 <span className="text-success">(0%)</span>
                  </TableCell>
                  <TableCell className="number">
                    0 <span className="text-success">(0%)</span>
                  </TableCell>
                  <TableCell className="number">0</TableCell>
                  <TableCell className="number">0</TableCell>
                  <TableCell className="number">0</TableCell>
                  <TableCell className="number">0</TableCell>
                  <TableCell className="number">0</TableCell>
                  <TableCell className="number">1</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Typography variant="h4" className="title-item">
        Hợp đồng sắp kết thúc <br />
        <i className="des" style={{ fontSize: '15px' }}>
          Hợp đồng báo kết thúc, sắp hết hạn.
        </i>
      </Typography>
      <Alert severity="warning">Không có hợp đồng nào sắp kết thúc.</Alert>

      <div className="col-12">
        <div className="mt-3">
          <Typography variant="h4" className="title-item">
            Tình trạng khách thuê <br />
            <i className="des" style={{ fontSize: '15px' }}>
              Tổng khách thuê, số khách thuê đã ghi nhận giấy tờ, khai báo tạm trú
            </i>
          </Typography>
          <div className="padding">
            <Table className="table table-bordered text-center">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Tên nhà cho thuê</b>
                  </TableCell>
                  <TableCell>
                    <b>Tổng khách thuê hiện tại</b>
                  </TableCell>
                  <TableCell>
                    <b>Số nguời chưa đang ký tạm trú</b>
                  </TableCell>
                  <TableCell>
                    <b>Số người chưa đủ thông tin liên lạc</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>trungkien</TableCell>
                  <TableCell className="number">0</TableCell>
                  <TableCell className="number">0</TableCell>
                  <TableCell className="number">0</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

const ContractEndingTable = () => {
  // Một giả định đơn giản về cách hiện thị thông tin hợp đồng kết thúc
  return (
    <div className="row">
      <div className="col-12">
        <div className="mt-3">
          <Typography variant="h4" className="title-item">
            Thống kê các khoản thu của nhà cho thuê <br />
            <i className="des" style={{ fontSize: '15px' }}>
              Thông tin về các khoản tiền thu vào như tiền phòng, dịch vụ....
            </i>
          </Typography>
          <div className="padding">
            <Table className="table table-bordered text-center">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Tên nhà cho thuê</b>
                  </TableCell>
                  <TableCell>
                    <b>Tổng số tiền cọc</b>
                  </TableCell>
                  <TableCell>
                    <b>Tổng số tiền cọc giữ chân</b>
                  </TableCell>
                  <TableCell>
                    <b>Tổng số tiền khách đang nợ</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>trungkien</TableCell>
                  <TableCell className="number">0</TableCell>
                  <TableCell className="number">0</TableCell>
                  <TableCell className="number">0</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" className="title-item">
          Thống kê dịch vụ <br />
          <i className="des" style={{ fontSize: '15px' }}>
            Mức sử dụng, chỉ số tiêu thụ trong các nhà cho thuê
          </i>
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DesktopDatePicker', 'MobileDatePicker']}>
            <DemoItem>
              <DatePicker defaultValue={dayjs('2024-01-10')} />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <Alert severity="warning">Trong tháng 9 chưa có dịch vụ nào được sử dụng</Alert>

      <div className="col-12">
        <div className="mt-3">
          <Typography variant="h4" className="title-item">
            Tình trạng khách thuê <br />
            <i className="des" style={{ fontSize: '15px' }}>
              Thông tin về các khoản tiền thu và chi như tiền phòng, dịch vụ....
            </i>
          </Typography>
          <div id="receipt_expense_report" className="tab-pane">
            <br />
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
              <FormControl variant="outlined" style={{ width: '20%', marginRight: '15px' }}>
                <InputLabel id="select_block">Nhà cho thuê</InputLabel>
                <Select labelId="select_block" name="block_id" defaultValue="6852" label="Nhà cho thuê">
                  <MenuItem value="">Tất cả nhà cho thuê</MenuItem>
                  <MenuItem value="6852">trungkien</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="outlined" style={{ width: '20%', marginRight: '15px' }}>
                <InputLabel id="input-type-filter">Tổng kết theo</InputLabel>
                <Select labelId="input-type-filter" name="type-filter" defaultValue="month">
                  <MenuItem value="date">Theo ngày</MenuItem>
                  <MenuItem value="month">Theo tháng</MenuItem>
                  <MenuItem value="year">Theo năm</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="outlined" style={{ width: '20%', marginRight: '15px', marginTop: '-8px' }}>
                <InputLabel id="year-label" style={{ marginTop: '-20px' }}>
                  Năm
                </InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DesktopDatePicker', 'MobileDatePicker']}>
                    <DemoItem>
                      <DatePicker defaultValue={dayjs('2024-01-10')} />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </FormControl>
            </div>

            <Box className="container mt-4" sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={6} lg={4}>
                  <Box className="btn-colo1" flex="1" m={1}>
                    <Typography variant="h5">Tổng thu</Typography>
                    <Box>
                      <Typography>0đ</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={4}>
                  <Box className="btn-colo2" flex="1" m={1}>
                    <Typography variant="h5">Tổng chi</Typography>

                    <Box>
                      <Typography>0đ</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={4}>
                  <Box className="btn-colo3" flex="1" m={1}>
                    <Typography variant="h5">Lợi nhuận</Typography>
                    <Box>
                      <Typography>0đ</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <div className="row mt-5">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Paper className="total-receipt">
                    <Typography variant="h5" className="title-item p-3" style={{ marginTop: '-20px' }}>
                      Chi tiết tất cả các khoản thu <br />
                      <i className="des" style={{ fontSize: '15px' }}>
                        Thông tin về các khoản tiền thu vào như tiền phòng....
                      </i>
                    </Typography>
                    <Table className="table text-center" id="receipt_report_table">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <b>Nội dung</b>
                          </TableCell>
                          <TableCell align="right">
                            <b>Tổng tiền thu</b>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody></TableBody>
                    </Table>
                    <Alert severity="error" style={{ marginTop: '20px' }} className="mt-3">
                      Chưa có phiếu thu nào
                    </Alert>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper elevation={3} className="total-expense">
                    <Typography variant="h5" className="title-item p-3" style={{ marginTop: '-20px' }}>
                      Chi tiết tất cả các khoản chi <br />
                      <i className="des" style={{ fontSize: '15px' }}>
                        Thông tin về các khoản tiền chi ra như phí dịch vụ....
                      </i>
                    </Typography>
                    <Table className="table text-center" id="expense_report_table">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <b>Nội dung</b>
                          </TableCell>
                          <TableCell align="right">
                            <b>Tổng tiền Chi</b>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody></TableBody>
                    </Table>
                    <Alert severity="error" style={{ marginTop: '20px' }} className="mt-3">
                      Chưa có phiếu chi nào
                    </Alert>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RentalStatus
