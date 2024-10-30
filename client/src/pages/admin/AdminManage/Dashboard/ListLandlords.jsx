import { useState } from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TableContainer,
  TablePagination,
  FormControl,  
  InputLabel,  
  Select,  
  MenuItem,  
  Grid,  
  Typography,
  CardContent, 
  CardHeader,
  Button,
  TextField
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditNoteIcon from '@mui/icons-material/EditNote';
const ListLandlords = () => {  
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [role, setRole] = useState('');  
  const [plan, setPlan] = useState('');  
  const [status, setStatus] = useState('');  

  // Dữ liệu mẫu cho các menu item  
  const roles = ['Host', 'Customer', 'Admin'];  
  const plans = ['Basic', 'Premium', 'Enterprise'];  
  const statuses = ['Active', 'Inactive', 'Pending']; 
  const [search, setSearch] = useState('');  


  const handleAddUser = () => {  
    // Xử lý thêm người dùng mới  
    console.log("Thêm người dùng mới");  
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0) // Đặt lại trang về 0 khi thay đổi số dòng
  }
  const data = Array.from({ length: 20 }, (_, index) => ({
    username: `user${index + 1}`,
    fullname: `Nguyễn Văn ${index + 1}`,
    phone: `090123456${index}`,
    email: `user${index + 1}@example.com`,
    cccd: `12345678${index}`,
    gender: index % 2 === 0 ? 'Nam' : 'Nữ',
    birthday: `01-01-20${index + 1}`,
    image: `avt.png`,
  }))
  
  return (
    <Box sx={{backgroundColor: '#fff', borderRadius: '5px',marginTop:'27px'}}>
      <CardHeader  
          title={  
            <Typography variant="h5" sx={{marginBottom:'-15px'}}>  
              Bộ lọc  
            </Typography>  
          }  
        />  
      <CardContent>  
        <Grid container spacing={2}>  
          {/* Dropdown cho "Select Role" */}  
          <Grid item xs={12} sm={4}>  
            <FormControl fullWidth variant="outlined">  
              <InputLabel id="role-select-label">Select Role</InputLabel>  
              <Select  
                labelId="role-select-label"  
                value={role}  
                onChange={(e) => setRole(e.target.value)}  
                label="Select Role"  
              >  
                {roles.map((r) => (  
                  <MenuItem key={r} value={r}>  
                    {r}  
                  </MenuItem>  
                ))}  
              </Select>  
            </FormControl>  
          </Grid>  

          {/* Dropdown cho "Select Plan" */}  
          <Grid item xs={12} sm={4}>  
            <FormControl fullWidth variant="outlined">  
              <InputLabel id="plan-select-label">Select Plan</InputLabel>  
              <Select  
                labelId="plan-select-label"  
                value={plan}  
                onChange={(e) => setPlan(e.target.value)}  
                label="Select Plan"  
              >  
                {plans.map((p) => (  
                  <MenuItem key={p} value={p}>  
                    {p}  
                  </MenuItem>  
                ))}  
              </Select>  
            </FormControl>  
          </Grid>  

          {/* Dropdown cho "Select Status" */}  
          <Grid item xs={12} sm={4}>  
            <FormControl fullWidth variant="outlined">  
              <InputLabel id="status-select-label">Select Status</InputLabel>  
              <Select  
                labelId="status-select-label"  
                value={status}  
                onChange={(e) => setStatus(e.target.value)}  
                label="Select Status"  
              >  
                {statuses.map((s) => (  
                  <MenuItem key={s} value={s}>  
                    {s}  
                  </MenuItem>  
                ))}  
              </Select>  
            </FormControl>  
          </Grid>  
        </Grid>  
      </CardContent>

      <Box p={2}>  
        <Grid container spacing={7} alignItems="center" justifyContent="space-between">  
          <Grid item>  
            <Button  
              variant="outlined"  
              startIcon={<i className="bi bi-arrow-up-short" />}  
            >  
              Export  
            </Button>  
          </Grid>  

          <Grid item container spacing={2} xs alignItems="center" justifyContent="flex-end">  
            <Grid item >  
              <TextField  
                variant="outlined"  
                size="small"  
                placeholder="Tìm kiếm người dùng"  
                fullWidth  
                value={search}  
                onChange={(e) => setSearch(e.target.value)}  
                style={{width: '300px'}}
              />  
            </Grid>  

            <Grid item>  
              <Button  
                variant="contained"  
                color="primary"  
                startIcon={<i className="bi bi-search"></i>} 
                sx={{   
                  '&:hover': {  
                    backgroundColor: '#1976d2', 
                  },  
                }}  
              >  
                Tìm kiếm  
              </Button>  
            </Grid>  

            <Grid item>  
              <Button  
                variant="contained"  
                color="primary"  
                sx={{   
                  '&:hover': {  
                    backgroundColor: '#1976d2',
                  },  
                }} 
                startIcon={<i className="bi bi-plus-lg"></i>}
                onClick={handleAddUser}  
              >  
                Thêm người dùng mới  
              </Button>  
            </Grid>  
          </Grid>  
        </Grid>  
      </Box>         

      <TableContainer component={Paper} sx={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên đăng nhập</TableCell>
              <TableCell>Họ tên</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số CCCD</TableCell>
              <TableCell>Giới tính</TableCell>
              <TableCell>Ngày sinh</TableCell>
              <TableCell>Ảnh</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.username}>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.fullname}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.cccd}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.birthday}</TableCell>
                <TableCell>{row.image}</TableCell>
                <TableCell>
                  <IconButton color="primary" size="small">
                    <EditNoteIcon />
                  </IconButton>
                  <IconButton color="error" size="small">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          sx={{
            marginTop: '10px',
            padding: '0 16px',
          }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length} // Tổng số dòng
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  )
}
export default ListLandlords