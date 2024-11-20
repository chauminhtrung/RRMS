import { Grid, Card, CardContent, Typography, Stack, Box } from '@mui/material';
import { ReactTabulator } from 'react-tabulator';
import { Line } from 'react-chartjs-2';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { env } from '~/configs/environment';

const DashboardHome = () => {

  const userData = JSON.parse(sessionStorage.getItem('user')); // Lấy dữ liệu người dùng từ session storage
  const token = userData?.token; // Lấy token
  const [cardData, setCardData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyDataThisYear, setMonthlyDataThisYear] = useState([]);
  const [monthlyDataLastYear, setMonthlyDataLastYear] = useState([]);
  const [totalMotelbyMonth, setTotalMotelbyMonth] = useState(Array(12).fill(0)); // Khởi tạo với 0
  const [hosts, setHosts] = useState([]);


  useEffect(() => {

    const fetchCardData = async () => {
      try {
        const totalAccountsResponse = await axios.get(`${env.API_URL}/statistics/total-accounts`, {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        });
        const totalTenantsResponse = await axios.get(`${env.API_URL}/statistics/total-tenants`, {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        });
        const totalHostAccountsResponse = await axios.get(`${env.API_URL}/statistics/total-host-accounts`, {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        });
        const totalMotelsResponse = await axios.get(`${env.API_URL}/statistics/total-motels`, {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        });
        const totalAccWeekresponse = await axios.get(`${env.API_URL}/statistics/total-account-last-week`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Dữ liệu nhận được từ API:', totalAccWeekresponse.data); // Kiểm tra dữ liệu

        // Gọi API tổng số nhà trọ theo từng tháng
        const monthlyMotelsResponse = await axios.get(`${env.API_URL}/statistics/total-motel-by-month`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Cập nhật dữ liệu tháng
        const monthlyData = Array(12).fill(0); // Khởi tạo mảng với 12 tháng
        for (let month in monthlyMotelsResponse.data) {
          monthlyData[month - 1] = monthlyMotelsResponse.data[month]; // -1 vì chỉ số mảng bắt đầu từ 0
        }

        setTotalMotelbyMonth(monthlyData);

        if (typeof totalAccWeekresponse.data === 'object' && !Array.isArray(totalAccWeekresponse.data)) {
          // Lấy các giá trị số từ đối tượng
          const data = Object.values(totalAccWeekresponse.data);
          setWeeklyData(data);
        } else {
          console.error('Dữ liệu không phải là đối tượng:', totalAccWeekresponse.data);
        }

        setCardData([
          { title: 'Tổng Số Người Dùng', value: totalAccountsResponse.data + totalTenantsResponse.data, percent: '59.3%', extra: '35,000' },
          { title: 'Tổng Số Chủ Trọ', value: totalHostAccountsResponse.data, percent: '25.5%', extra: '2,500' },
          { title: 'Tổng Số Nhà Trọ', value: totalMotelsResponse.data, percent: '40.2%', extra: '1,500' },
          { title: 'Tổng Số Người Thuê', value: totalTenantsResponse.data, percent: '15.7%', extra: '$2,000' },
        ]);

        // Fetch dữ liệu tài khoản theo tháng
        const monthlyAccountsThisYearResponse = await axios.get(`${env.API_URL}/statistics/accounts-total-this-year`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const monthlyAccountsLastYearResponse = await axios.get(`${env.API_URL}/statistics/accounts-total-last-year`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Fetch dữ liệu chủ trọ trong 7 ngày gần đây
        const recentHostsResponse = await axios.get(`${env.API_URL}/statistics/account-recent-hosts`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Cập nhật danh sách chủ trọ
        setHosts(recentHostsResponse.data);
        console.log('dataaaa:', recentHostsResponse.data);
        // Cập nhật dữ liệu tháng
        setMonthlyDataThisYear(monthlyAccountsThisYearResponse.data);
        setMonthlyDataLastYear(monthlyAccountsLastYearResponse.data);

        setCardData([
          { title: 'Tổng Số Người Dùng', value: totalAccountsResponse.data + totalTenantsResponse.data, percent: '59.3%', extra: '35,000' },
          { title: 'Tổng Số Chủ Trọ', value: totalHostAccountsResponse.data, percent: '25.5%', extra: '2,500' },
          { title: 'Tổng Số Nhà Trọ', value: totalMotelsResponse.data, percent: '40.2%', extra: '1,500' },
          { title: 'Tổng Số Người Thuê', value: totalTenantsResponse.data, percent: '15.7%', extra: '$2,000' },
        ]);

      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };

    fetchCardData();
  }, []);

  const columns1 = [
    { title: 'STT', field: 'STT', hozAlign: 'center', minWidth: 50, editor: 'input' },
    { title: 'Tên Chủ Trọ', field: 'name', hozAlign: 'center', minWidth: 150, editor: 'input' },
    { title: 'Số Điện Thoại', field: 'phone', hozAlign: 'center', minWidth: 200, editor: 'input' },
    { title: 'Email', field: 'email', hozAlign: 'center', minWidth: 140, editor: 'input' },
    { title: 'CCCD', field: 'cccd', hozAlign: 'center', minWidth: 120, editor: 'input' },
    { title: 'Ngày tạo', field: 'createdDate', hozAlign: 'center', minWidth: 120, editor: 'input' },
  ]


  const data1 = hosts.map((host, index) => ({
    STT: index + 1, // Tự động tăng số thứ tự
    name: host.fullname,
    phone: host.phone,
    email: host.email,
    cccd: host.cccd,
    createdDate: host.createdDate,
  }));


  const options = {
    height: '350px',
    rowHeight: 30,
    movableColumns: true,
    resizableRows: true,
    movableRows: true,
    resizableColumns: true,
    resizableColumnFit: true,
    layout: 'fitColumns',
    responsiveLayout: 'collapse',
  }

  // const cardData = [
  //   { title: 'Tổng số lượt xem trang', value: '100', extra: '35,000' },
  //   { title: 'Tổng số người dùng', value: '10', extra: '2,500' },
  //   { title: 'Người dùng mới đã đăng ký', value: '5', extra: '1,500' },
  //   { title: 'Doanh thu', value: '15.000.000 VNĐ', extra: '$2,000' },
  // ];

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Tài Khoản Năm Này',
        data: labels.map((_, index) => monthlyDataThisYear[index] || 0), // Sử dụng dữ liệu cho năm nay
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: 'Tài Khoản Năm Trước',
        data: labels.map((_, index) => monthlyDataLastYear[index] || 0), // Sử dụng dữ liệu cho năm trước
        fill: true,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  return (
    <div>
      <Grid container spacing={2}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card elevation={0}>
              <CardContent>
                <Box
                  sx={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    padding: 2
                  }}
                >
                  <Stack spacing={2}>
                    <h6>{card.title}</h6>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <div>
                        <h4>{card.value}</h4>
                      </div>
                    </Grid>
                    <Typography variant="caption">
                      You made an extra <Typography component="span" variant="caption" color="text.primary">{card.extra}</Typography> this year
                    </Typography>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        {/* Cột Biểu đồ Đường */}
        <Grid item md={7}>
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Số lượng người tạo tài khoản
            </Typography>
            <Card>
              <CardContent style={{ height: '300px' }}> {/* Chiều cao cố định */}
                <Line data={data} />
              </CardContent>
            </Card>
          </Box>
        </Grid>

        {/* Cột Biểu đồ Cột */}
        <Grid item md={5}>
          <Box mt={4}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} >
              <Typography variant="h6" style={{ marginBottom: '6px' }}>
                Thống kê tuần trước
              </Typography>
              <h5 style={{ color: 'rgb(22, 119, 255)' }}>T 10</h5>
            </Box>
            <Card>
              <CardContent>
                <Box width="100%" height="286px">
                  <BarChart
                    xAxis={[{ scaleType: 'band', data: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] }]}
                    series={[{
                      data: weeklyData,
                      fill: 'rgba(92, 219, 211, 0.85)',
                      border: {
                        color: 'rgba(0, 0, 0, 0.5)',
                        width: 2
                      }
                    }]}
                    width={450}
                    height={300}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item md={8}>
          {/* Đơn hàng */}
          <Typography className='mt-3' variant="h6">
            Chủ trọ mới tạo gần đây
          </Typography>
          <Box
            className='mt-3'
            sx={{
              border: '1px', // Đặt border cho toàn bộ bảng  
              borderRadius: '4px', // Bo tròn góc nếu cần  
              overflow: 'hidden', // Để tránh pillowing border  
              bgcolor: 'background.paper' // Tùy chọn: thêm nền  
            }}
          >

            <ReactTabulator
              columns={columns1}
              data={data1}
              options={options}
            />
          </Box>
        </Grid>

        {/* Cột Biểu đồ Cột */}
        <Grid item md={4}>
          <Typography className='mt-3' variant="h6">
            Tổng số nhà trọ
          </Typography>

          {/*  */}
          <Box >
            <LineChart
              xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
              series={[
                {
                  data: totalMotelbyMonth,
                },
              ]}
              // width={500}
              height={300}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardHome;