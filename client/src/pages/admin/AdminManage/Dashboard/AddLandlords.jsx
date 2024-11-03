import { useState, useEffect  } from 'react'
import {
  Box,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  FormHelperText,
  Typography,
  Breadcrumbs,
  Link,
  Paper,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useLocation } from 'react-router-dom';  
import axios from 'axios';
import { env } from '~/configs/environment';

const AddLandlords = () => {  
  const [form, setForm] = useState({
    username: '',
    password: '',
    comfirmpassword: '',
    fullname: '',
    phone: '',
    email: '',
    avatar: '',
    birthday: '',
    gender: '',
    cccd: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [phoneError, setPhoneError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [cccdError, setCccdError] = useState('')
  const location = useLocation();
  const accountId = location.state?.accountId;
  const genders = [
    { id: 'MALE', name: 'Nam' },
    { id: 'FEMALE', name: 'Nữ' },
    { id: 'OTHER', name: 'Khác' },
  ]

  useEffect(() => {
    const fetchAccountData = async () => {
      if (accountId) {
        try {
          const response = await axios.get(`${env.API_URL}/api-accounts/${accountId}`);
  
          if (response.data) {
            setForm({
              username: response.data.username || '',
              fullname: response.data.fullname || '',
              phone: response.data.phone || '',
              email: response.data.email || '',
              avatar: response.data.avatar || '',
              birthday: response.data.birthday ? response.data.birthday.split('T')[0] : '', 
              gender: response.data.gender || '',
              cccd: response.data.cccd || '',
              password: response.data.password,
              comfirmpassword: '',
            });
            console.log('Username:', response.data.username);
          } else {
            console.error('Unexpected response structure:', response.data);
          }
        } catch (error) {
          console.error('Error fetching account data:', error);
        }
      }
    };
  
    fetchAccountData();
  }, [accountId]);
  
  

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleChangePassWord = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleChangePhone = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })

    if (name === 'phone') {
      const phoneRegex = /^0[0-9]{9}$/

      if (!phoneRegex.test(value)) {
        setPhoneError('Số điện thoại không hợp lệ (phải bắt đầu bằng số 0 và có 10 chữ số)')
      } else {
        setPhoneError('')
      }
    }
  }

  const handleChangeEmail = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        setEmailError('Địa chỉ email không hợp lệ')
      } else {
        setEmailError('')
      }
    }
  }

  const handleChangeCCCD = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })

    if (name === 'cccd') {
      const cccdRegex = /^[0-9]{12}$/
      if (!cccdRegex.test(value)) {
        setCccdError('Số CCCD không hợp lệ (12 chữ số)')
      } else {
        setCccdError('')
      }
    }
  }

  const handleChangeBirthday = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleClearInputFields = () => {  
    setForm({  
      username: '',  
      password: '',  
      comfirmpassword: '',  
      fullname: '',  
      phone: '',  
      email: '',  
      avatar: '',  
      birthday: '',  
      gender: '',  
      cccd: '',  
    });  
    setPhoneError('');  
    setEmailError('');  
    setCccdError('');  
  };  
  
  const today = new Date().toISOString().split('T')[0]

  return (
    <Box sx={{backgroundColor: '#fff', borderRadius: '5px',marginTop:'17px'}}>
      <Grid container spacing={2} sx={{paddingLeft:'30px',paddingTop:'15px', marginBottom:'15px' }}> 
        <Grid container sx={{backgroundColor:'rgb(236, 242, 255)',marginBottom:'10px',borderRadius: '5px',padding:'10px',marginRight:'15px'}}>  
          {/* Phần tiêu đề và Breadcrumbs */}  
          <Grid item xs={12} sm={6} lg={8}>  
            <Typography variant="h4" sx={{ verticalAlign: 'inherit' }}>Thêm chủ trọ</Typography>  
            <Breadcrumbs aria-label="vụn bánh mì">  
              <Link href="/adminManage" color="inherit">  
                Trang chủ  
              </Link>  
              <Typography color="textSecondary">Thêm chủ trọ</Typography>  
            </Breadcrumbs>  
          </Grid>   
        </Grid>
        {/* Ảnh đại diện */}  

        <Grid item xs={12} sm={4} textAlign="center">  
          <Paper   
            elevation={9}   
            sx={{   
              marginBottom:'30px',
              borderRadius: '5px',   
              textAlign: 'center'   
            }}  
          >  
            <Typography variant="h5" sx={{ pt: 1, pb: 1 }}>  
              Hình thu nhỏ  
            </Typography>  
            <Box   
              sx={{   
                display: 'flex',   
                justifyContent: 'center',   
                alignItems: 'center',   
                border: '1px dashed rgb(240, 240, 240)',   
                borderRadius: '5px',   
                padding: 2,  
                cursor: 'pointer',  
                '&:hover': {  
                  borderColor: 'primary.main'  
                }  
              }}   
              role="presentation"  
              tabIndex={0}  
            >  
              <input  
                type="file"  
                hidden  
                id="avatar"  
                accept="image/*"  
                onChange={(e) => setForm({ ...form, avatar: URL.createObjectURL(e.target.files[0]) })}  
              />  
              <label htmlFor="avatar">  
                <img  
                  src={form.avatar || '/noAVT.png'}  
                  style={{  
                    width: '100%',  
                    maxWidth: '280px',  
                    aspectRatio: '1 / 1', // Tỷ lệ khung hình là 1:1  
                    objectFit: 'cover',   
                    border: '3px solid #ddd',  
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',  
                    transition: '0.3s',  
                  }}  
                />  
              </label>  
            </Box>  
            
            <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>  
              Đặt hình ảnh thu nhỏ của sản phẩm. Chỉ chấp nhận các tệp hình ảnh *.png, *.jpg và *.jpeg.  
            </Typography>  
            
            <Box sx={{ mt: 2 }}>  
              <Typography variant="h6">  
                Tập tin  
              </Typography>  
              <Typography variant="body1">  
                {form.avatar ? 'Hình ảnh đã được chọn.' : 'Chưa có hình ảnh nào được chọn.'}  
              </Typography>  
            </Box>  
          </Paper>  
        </Grid>
         
        {/* Các input fields */}  
        <Grid item xs={12} sm={8} container style={{paddingRight:'15px',maxHeight:'300px'}}>
          <Box style={{border: '3px solid #fff',  boxShadow: '8px 8px 8px 8px rgba(0, 0, 0, 0.1)',borderRadius: '5px', padding: '10px'}}>
            <Grid container spacing={2} style={{marginRight:'15px'}}>  
              <Grid item xs={12} sm={6}>
                <TextField  
                  fullWidth  
                  label="User Name"  
                  name="username"  
                  value={form.username}  
                  onChange={handleChange}  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField  
                  fullWidth  
                  label="Full Name"  
                  name="fullname"  
                  value={form.fullname}  
                  onChange={handleChange}  
                />
              </Grid>
              <Grid item xs={12} sm={6}>  
                <TextField  
                  fullWidth  
                  label="Mật khẩu"  
                  name="password"  
                  type={showPassword ? 'text' : 'password'}  
                  value={form.password}  
                  onChange={handleChange}  
                  sx={{ height: '56px', fontSize: '1.2rem' }}  
                  InputProps={{  
                      endAdornment: (  
                          <IconButton onClick={toggleShowPassword} edge="end">  
                              {showPassword ? <VisibilityOff /> : <Visibility />}  
                          </IconButton>  
                      ),  
                  }}  
                />  
              </Grid>  
              <Grid item xs={12} sm={6}>  
                  <TextField  
                      fullWidth  
                      label="Xác nhận mật khẩu"  
                      name="comfirmpassword"  
                      type={showPassword ? 'text' : 'password'}  
                      value={form.comfirmpassword}  
                      onChange={handleChangePassWord}  
                      sx={{ height: '56px', fontSize: '1.2rem' }}  
                      InputProps={{  
                          endAdornment: (  
                              <IconButton onClick={toggleShowPassword} edge="end">  
                                  {showPassword ? <VisibilityOff /> : <Visibility />}  
                              </IconButton>  
                          ),  
                      }}  
                  />  
              </Grid>
              <Grid item xs={12} sm={6}>  
                  <TextField  
                      fullWidth  
                      label="Số điện thoại"  
                      name="phone"  
                      value={form.phone}  
                      onChange={handleChangePhone}  
                      error={!!phoneError}  
                      sx={{ height: '56px', fontSize: '1.2rem' }}  
                  />  
                  {phoneError && <FormHelperText error>{phoneError}</FormHelperText>}  
              </Grid>  
              <Grid item xs={12} sm={6}>  
                  <TextField  
                      fullWidth  
                      label="Email"  
                      name="email"  
                      type="email"  
                      value={form.email}  
                      onChange={handleChangeEmail}  
                      error={!!emailError}  
                      sx={{ height: '56px', fontSize: '1.2rem' }}  
                  />  
                  {emailError && <FormHelperText error>{emailError}</FormHelperText>}  
              </Grid>  
              <Grid item xs={12} sm={6}>  
                  <TextField  
                      fullWidth  
                      label="Số CCCD"  
                      name="cccd"  
                      value={form.cccd}  
                      onChange={handleChangeCCCD}  
                      error={!!cccdError}  
                      sx={{ height: '56px', fontSize: '1.2rem' }}  
                  />  
                  {cccdError && <FormHelperText error>{cccdError}</FormHelperText>}  
              </Grid>  
              <Grid item xs={12} sm={6}>  
                  <TextField  
                      fullWidth  
                      name="birthday"  
                      type="date"  
                      value={form.birthday}  
                      onChange={handleChangeBirthday}  
                      inputProps={{ max: today }}  
                      sx={{ height: '56px', fontSize: '1.2rem' }}  
                  />  
              </Grid>  
              <Grid item xs={12} sm={6}>  
                  <FormControl fullWidth variant="outlined" >  
                      <InputLabel id="gender-label" sx={{ backgroundColor: 'white', px: 0.5 }}>  
                          Giới tính  
                      </InputLabel>  
                      <Select  
                          labelId="gender-label"  
                          value={form.gender || ''}  
                          name="gender"  
                          onChange={handleChange}  
                          displayEmpty>  
                          {genders.map((g) => (  
                              <MenuItem key={g.id} value={g.id}>  
                                  {g.name}  
                              </MenuItem>  
                          ))}  
                      </Select>  
                  </FormControl>  
              </Grid>  
            </Grid> 
            <Grid container spacing={2} wrap="nowrap" sx={{ marginTop: '10px', marginRight:'15px' }}>  
              <Grid item xs={3} sm={3} textAlign="center">  
                  <Button  
                      variant="outlined"  
                      color="primary"  
                      startIcon={<AddIcon />}  
                      fullWidth  
                      sx={{ height: '40px', justifyContent: 'center' }}>  
                      Thêm  
                  </Button>  
              </Grid>  
              <Grid item xs={3} sm={3} textAlign="center">  
                  <Button  
                      variant="outlined"  
                      color="success"  
                      startIcon={<SaveIcon />}  
                      fullWidth  
                      sx={{ height: '40px', justifyContent: 'center' }}>  
                      Cập nhật  
                  </Button>  
              </Grid>  
              <Grid item xs={3} sm={3} textAlign="center">  
                  <Button  
                      variant="outlined"  
                      color="error"  
                      startIcon={<DeleteIcon />}  
                      fullWidth  
                      sx={{ height: '40px', justifyContent: 'center' }}>  
                      Xóa  
                  </Button>  
              </Grid>  
              <Grid item xs={3} sm={3} textAlign="center">  
                  <Button  
                      variant="outlined"  
                      color="info"  
                      startIcon={<RefreshIcon />}  
                      fullWidth  
                      onClick={handleClearInputFields}
                      sx={{ height: '40px', justifyContent: 'center' }}>  
                      Mới  
                  </Button>  
              </Grid>  
            </Grid>
          </Box>                  
        </Grid>  
      </Grid>
    </Box>
  )
}

export default AddLandlords
