import React, { useEffect, useState } from 'react'
import axios from 'axios';
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
import { env } from '~/configs/environment';
import dayjs from 'dayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
// import { useParams } from 'react-router-dom'
const RentalStatus = ({ setIsAdmin, setIsNavAdmin, isNavAdmin, motels, setmotels }) => {
  const [value, setValue] = React.useState(0)
  const [username, setUsername] = useState('');
  // const { motelName } = useParams() // Lấy tham số motelName từ URL
  // const [motel, setmotel] = useState(null)

  useEffect(() => {
    setIsAdmin(true)
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const username = userData?.username || '';
    setUsername(username); // Lưu username vào state
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
        {value === 0 && <HouseRentalTable username={username} />}
        {value === 1 && <ContractEndingTable username={username} />}
      </Box>
    </Box>
  )
}

const HouseRentalTable = ({ username }) => {
  const [houses, setHouses] = useState([]);
  const [roomCounts, setRoomCounts] = useState([]);
  const [tenantSummaries, setTenantSummaries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalRooms = async () => {
      const userData = JSON.parse(sessionStorage.getItem('user')); // Lấy dữ liệu người dùng từ session storage
      const token = userData?.token; // Lấy token
      const username = userData?.username; // Lấy username
      if (!token || !username) {
        setError('Token hoặc username không tồn tại');

        return;
      }

      try {
        console.log(userData);

        // gọi các nhà trọ của ac
        const housesResponse = await axios.get(`${env.API_URL}/motels/get-motel-account?username=${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Sửa đổi: Gọi API để lấy tổng số phòng cho từng nhà trọ
        const updatedHouses = await Promise.all(housesResponse.data.result.map(async (house) => {
          const totalRoomsResponse = await axios.get(`${env.API_URL}/report/total-rooms?motelId=${house.motelId}&username=${username}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          // Cập nhật tổng phòng, nếu null thì gán bằng 0
          const totalRooms = totalRoomsResponse.data || 0; // Nếu null, gán bằng 0

          const totalTenantsResponse = await axios.get(`${env.API_URL}/report/${house.motelId}/tenants/count`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const totalTenants = totalTenantsResponse.data || 0; // Nếu null, gán bằng 0

          return {
            ...house,
            totalRooms: totalRooms,
            totalTenants: totalTenants,
          };
        }));

        const roomCountsResponse = await axios.get(`${env.API_URL}/report/room-counts`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const tenantSummaryResponse = await axios.get(`${env.API_URL}/report/tenant/summary`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Ghi log phản hồi từ tenantSummaryResponse
        console.log('Tenant Summary Response:', tenantSummaryResponse.data);

        if (housesResponse.data.result) {
          setHouses(updatedHouses);
          setRoomCounts(roomCountsResponse.data);
          setTenantSummaries(tenantSummaryResponse.data);
        } else {
          alert('lỗi');
        }
      } catch (err) {
        setError('Failed to fetch total rooms');
        console.error(err);
      } finally {

      }

    };

    fetchTotalRooms();
  }, []);

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

                </TableRow>
              </TableHead>
              <TableBody>
                {houses.map((house) => (
                  <TableRow key={house.motelId}>
                    <TableCell className="username" style={{ fontWeight: 'bold' }}>{house.motelName}</TableCell>
                    <TableCell>{house.totalRooms}</TableCell>
                    <TableCell>{roomCounts.find(rc => rc.motelId === house.motelId)?.noContractCount || 0}</TableCell>
                    <TableCell><span className="text-success">{roomCounts.find(rc => rc.motelId === house.motelId)?.activeCount || 0}</span></TableCell>
                    <TableCell>{roomCounts.find(rc => rc.motelId === house.motelId)?.reservedCount || 0}</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>{roomCounts.find(rc => rc.motelId === house.motelId)?.endedCount || 0}</TableCell>
                    <TableCell>{roomCounts.find(rc => rc.motelId === house.motelId)?.iatExpireCount || 0}</TableCell>
                    <TableCell>0</TableCell>

                  </TableRow>
                ))}
                {houses.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={10} style={{ textAlign: 'center' }}>Không có dữ liệu</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>


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
                {houses.map((house) => (
                  <TableRow key={house.motelId}>
                    <TableCell className="username" style={{ fontWeight: 'bold' }}>{house.motelName}</TableCell>
                    <TableCell>{house.totalTenants}</TableCell>
                    <TableCell>{tenantSummaries.find(ts => ts.motelId === house.motelId)?.temporaryResidenceCount || 0}</TableCell>
                    <TableCell>{tenantSummaries.find(ts => ts.motelId === house.motelId)?.verifiedInformationCount || 0}</TableCell>
                  </TableRow>
                ))}
                {houses.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} style={{ textAlign: 'center' }}>Không có dữ liệu</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

const ContractEndingTable = ({ username }) => {


  const [houses, setHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [totalInvoices, setTotalInvoices] = useState({});
  const [totalRoomPrices, setTotalRoomPrices] = useState({});
  const [error, setError] = useState(null);

  const formatCurrency = (value) => {
    if (value == null) return '0 ₫';
    return value.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };

  useEffect(() => {
    const fetchInvoid = async () => {
      const userData = JSON.parse(sessionStorage.getItem('user')); // Lấy dữ liệu người dùng từ session storage
      const token = userData?.token; // Lấy token
      const username = userData?.username; // Lấy username
      if (!token || !username) {
        setError('Token hoặc username không tồn tại');

        return;
      }

      try {

        const housesResponse = await axios.get(`${env.API_URL}/motels/get-motel-account?username=${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });



        if (housesResponse.data.result) {
          setHouses(housesResponse.data.result);
          fetchTransactions(username); // Gọi hàm để lấy giao dịch ngay sau khi lấy nhà cho thuê
          console.log('hehee: ' + housesResponse.data.result);

        } else {
          setError(housesResponse.data.message);

        }
      } catch (err) {
        setError('Failed to fetch total rooms');
        console.error(err);
      } finally {

      }

    };


    fetchInvoid();
  }, []);


  // Hàm để gọi API lấy danh sách giao dịch
  const fetchTransactions = async (username) => {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const token = userData?.token;

    try {
      const response = await axios.get(`${env.API_URL}/transactions/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Dữ liệu giao dịch:', response.data);
      setTransactions(response.data || []); // Cập nhật danh sách giao dịch
    } catch (err) {
      setError('Failed to fetch transactions'); // Thông báo lỗi khi gọi API không thành công
      console.error(err);
    }
  };

  // Lọc giao dịch theo transactionType
  const filteredTransactions = {
    thu: transactions.filter(transaction => transaction.transactionType === true), // Giao dịch thu
    chi: transactions.filter(transaction => transaction.transactionType === false), // Giao dịch chi
  };
  // Hàm để gọi API lấy tổng tiền cọc và tổng tiền giữ chân
  const fetchDepositData = async (motelId) => {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const token = userData?.token;

    try {
      // Gọi API để lấy tổng tiền cọc
      const depositResponse = await axios.get(`${env.API_URL}/report/${motelId}/deposits`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Gọi API để lấy tổng tiền giữ chân
      const reserveResponse = await axios.get(`${env.API_URL}/report/${motelId}/reserve-deposits`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return {
        totalDeposit: depositResponse.data || 0,
        totalReserveDeposit: reserveResponse.data || 0,
      };
    } catch (err) {
      console.error('Failed to fetch deposit data:', err);
      return { totalDeposit: 0, totalReserveDeposit: 0 };
    }
  };


  // Component để lấy và hiển thị tổng tiền cọc
  const FetchDepositData = ({ motelId }) => {
    const [totalDeposit, setTotalDeposit] = useState(0);

    useEffect(() => {
      const fetchData = async () => {
        const depositData = await fetchDepositData(motelId);
        setTotalDeposit(depositData.totalDeposit);
      };
      fetchData();
    }, [motelId]);

    return <span>{formatCurrency(totalDeposit)}</span>;
  };

  // Component để lấy và hiển thị tổng tiền giữ chân
  const FetchReserveDepositData = ({ motelId }) => {
    const [totalReserveDeposit, setTotalReserveDeposit] = useState(0);

    useEffect(() => {
      const fetchData = async () => {
        const depositData = await fetchDepositData(motelId);
        setTotalReserveDeposit(depositData.totalReserveDeposit);
      };
      fetchData();
    }, [motelId]);

    return <span>{formatCurrency(totalReserveDeposit)}</span>;
  };

  const handleChange = (event) => {
    setSelectedHouse(event.target.value);
  };

  useEffect(() => {
    const fetchFinancialData = async (motelId) => { // Hàm lấy dữ liệu tài chính cho nhà cho thuê được chọn
      const userData = JSON.parse(sessionStorage.getItem('user'));
      const token = userData?.token;

      try {
        const invoicesResponse = await axios.get(`${env.API_URL}/report/${motelId}/total-paid-invoices`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const roomPriceResponse = await axios.get(`${env.API_URL}/report/${motelId}/total-paid-room-price`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTotalInvoices(invoicesResponse.data || 0); // Lưu tổng tiền hóa đơn
        setTotalRoomPrices(roomPriceResponse.data || 0); // Lưu tổng tiền phòng
      } catch (err) {
        console.error('Failed to fetch financial data:', err);
      }
    };

    if (selectedHouse) { // Nếu có nhà cho thuê được chọn
      fetchFinancialData(selectedHouse); // Gọi hàm lấy dữ liệu tài chính
    } else {
      setTotalInvoices(0); // Đặt tổng tiền hóa đơn về 0 nếu không có nhà nào được chọn
      setTotalRoomPrices(0); // Đặt tổng tiền phòng về 0 nếu không có nhà nào được chọn
    }
  }, [selectedHouse]); // Theo dõi sự thay đổi của selectedHouse

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
                {houses.map((house) => (
                  <TableRow key={house.motelId}>
                    <TableCell style={{ fontWeight: 'bold' }}>{house.motelName}</TableCell>
                    <TableCell className="totalConstrat">
                      <FetchDepositData motelId={house.motelId} formatCurrency={formatCurrency} />
                    </TableCell>
                    <TableCell className="number">
                      <FetchReserveDepositData motelId={house.motelId} formatCurrency={formatCurrency} />
                    </TableCell>
                    <TableCell className="number">0</TableCell>
                  </TableRow>
                ))}
                {houses.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={10} style={{ textAlign: 'center' }}>Không có dữ liệu</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

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
                <Select
                  labelId="select_block"
                  value={selectedHouse}
                  onChange={handleChange}
                  label="Nhà cho thuê"
                >
                  <MenuItem value="">
                    Tất cả nhà cho thuê
                  </MenuItem>
                  {houses.map((house) => (
                    <MenuItem key={house.motelId} value={house.motelId}>
                      {house.motelName}
                    </MenuItem>
                  ))}
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
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Box className="btn-colo1" flex="1" m={1}>
                    <Typography variant="h5" className='sumInvoicd'>Tổng tiền hóa đơn</Typography>
                    <Box>
                      <Typography>{formatCurrency(totalInvoices)}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Box className="btn-colo2" flex="1" m={1}>
                    <Typography variant="h5" className='sumRoom'>Tổng tiền phòng</Typography>

                    <Box>
                      <Typography>{formatCurrency(totalRoomPrices)}</Typography>
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
                          <TableCell>
                            <b>Ngày lập phiếu</b>
                          </TableCell>
                          <TableCell>
                            <b>Phương thức thanh toán</b>
                          </TableCell>
                          <TableCell align="right">
                            <b>Tiền thu</b>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredTransactions.thu.map((transaction) => (
                          <TableRow key={transaction.transactionId}>
                            <TableCell>{transaction.paymentDescription}</TableCell>
                            <TableCell>{transaction.transactionDate}</TableCell>
                            <TableCell>{transaction.payment.description}</TableCell>
                            <TableCell align="right">{formatCurrency(transaction.amount)}</TableCell>
                          </TableRow>
                        ))}
                        {filteredTransactions.thu.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={2} style={{ textAlign: 'center' }}>Chưa có phiếu thu nào</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>

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
                          <TableCell>
                            <b>Ngày lập phiếu</b>
                          </TableCell>
                          <TableCell>
                            <b>Phương thức thanh toán</b>
                          </TableCell>
                          <TableCell align="right">
                            <b>Tiền Chi</b>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredTransactions.chi.map((transaction) => (
                          <TableRow key={transaction.transactionId}>
                            <TableCell>{transaction.paymentDescription}</TableCell>
                            <TableCell>{transaction.transactionDate}</TableCell>
                            <TableCell>{transaction.payment.description}</TableCell>
                            <TableCell align="right">{formatCurrency(transaction.amount)}</TableCell>
                          </TableRow>
                        ))}
                        {filteredTransactions.chi.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={2} style={{ textAlign: 'center' }}>Chưa có phiếu thu nào</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>

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
