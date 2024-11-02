import { Grid, Card, CardContent, Typography, Stack, Box } from '@mui/material';  
import { ReactTabulator } from 'react-tabulator';
import { Line } from 'react-chartjs-2';  
import { BarChart } from '@mui/x-charts/BarChart';  
import { LineChart } from '@mui/x-charts/LineChart';
import 'chart.js/auto';  

const DashboardHome = () => {  

  const columns1 = [
    { title: 'STT', field: 'STT', hozAlign: 'center', minWidth: 50, editor: 'input' }, 
    { title: 'Tên Nhà Trọ', field: 'name', hozAlign: 'center', minWidth: 150, editor: 'input' },
    { title: 'Địa Chỉ', field: 'address', hozAlign: 'center', minWidth: 200, editor: 'input' },
    { title: 'Tổng Số Phòng', field: 'sumRoom', hozAlign: 'center', minWidth: 140, editor: 'input' },
    { title: 'Trạng Thái', field: 'status', hozAlign: 'center', minWidth: 120, editor: 'input' },
    { title: 'Tổng tiền', field: 'summoney', hozAlign: 'center', minWidth: 120, editor: 'input' },
  ]

  const data1 = [
    {
      STT: '1',
      name: 'RRMS',
      address: 'Quan 1',
      sumRoom: '50',
      status: 'Hoạt động',
      summoney: '100',
    },
    {
      STT: '2',
      name: 'RRMS',
      address: 'Quan 2',
      sumRoom: '50',
      status: 'Hoạt động',
      summoney: '100',
    },
    {
      STT: '3',
      name: 'RRMS',
      address: 'Quan 3',
      sumRoom: '50',
      status: 'Hoạt động',
      summoney: '100',
    },
  ]

  const options = { 
    height:'350px',
    rowHeight: 30, // Thay đổi chiều cao hàng 
    movableColumns: true, // Cho phép di chuyển cột
    resizableRows: true, // Cho phép thay đổi kích thước hàng
    movableRows: true,
    resizableColumns: true, // Cho phép thay đổi kích thước cột
    resizableColumnFit: true,
    layout: 'fitColumns',
    responsiveLayout: 'collapse',
  }

  const cardData = [  
    { title: 'Total Page Views', value: '4,42,236', percent: '59.3%', extra: '35,000' },  
    { title: 'Total Users', value: '12,345', percent: '25.5%', extra: '2,500' },  
    { title: 'New Subscriptions', value: '3,210', percent: '40.2%', extra: '1,500' },  
    { title: 'Revenue', value: '$15,240', percent: '15.7%', extra: '$2,000' },  
  ];  

  const data = {  
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],  
    datasets: [  
      {  
        label: 'Host or Employee',  
        data: [31, 40, 28, 51, 42, 109, 85, 75, 93, 120, 130, 150], 
        fill: true,  
        backgroundColor: 'rgba(75,192,192,0.2)',  
        borderColor: 'rgba(75,192,192,1)',  
        borderWidth: 2,  
        tension: 0.4,   
      },  
      {  
        label: 'Customer or Gust',  
        data: [11, 32, 45, 32, 34, 52, 68, 55, 70, 80, 90, 100],  
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
                      <div className='pt-2 pe-1 ps-4 rounded' style={{backgroundColor:'rgb(230, 244, 255)', color:'rgb(22, 119, 255)'}}>
                        <h4>{card.percent}</h4>
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
              Số lượng người dùng truy cập trang phần mềm trong tháng 
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
              <Typography variant="h6" style={{marginBottom:'6px'}}>  
                Thống kê tuần này  
              </Typography>  
              <h5 style={{color:'rgb(22, 119, 255)'}}>T 10</h5>
            </Box>  
            <Card>  
              <CardContent>
                <Box width="100%" height="286px"> 
                  <BarChart  
                    xAxis={[{ scaleType: 'band', data: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] }]}  
                    series={[{   
                      data: [160, 150, 120, 110, 130, 140, 170],   
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
              Đơn hàng gần đây  
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
            Doanh thu  
          </Typography>  
          
          {/*  */}
          <Box >  
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              width={500}
              height={300}
            />  
          </Box>  
        </Grid> 
      </Grid> 
    </div>  
  );  
};  

export default DashboardHome;