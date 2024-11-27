/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import {
  Box,
  Grid,
  Typography,
  Paper,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent
} from '@mui/material'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import HomeIcon from '@mui/icons-material/Home'
import EventIcon from '@mui/icons-material/Event'
import PeopleIcon from '@mui/icons-material/People'
import WifiIcon from '@mui/icons-material/Wifi'
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import BedroomParentIcon from '@mui/icons-material/BedroomParent' // Icon cho loại phòng
import { formatterAmount } from '~/utils/formatterAmount'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import InfoIcon from '@mui/icons-material/Info'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'
import DetailsIcon from '@mui/icons-material/Details'
import { remove as removeDiacritics } from 'diacritics'
import { paymentPaypal } from '~/apis/paymentAPI'
import { toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js'
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import StripePayment from './StripePayment'

const stripePromise = loadStripe(
  'pk_test_51POubLIe2vfQhSWEYarMBn27sc4ydF1n0nhgwSjgy66cojdCizekyBhLqjLpMyvKFmx4FV8BDaoOVCcjaftzhhDu00JImFrcBU'
)

const PaymentPage = ({ setIsAdmin }) => {
  const [cardOwner, setCardOwner] = useState('')
  const [cardType, setCardType] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvc, setCvc] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [stripeDetails, setStripeDetails] = useState({
    amount: 69,
    email: 'tringu@gmail.com',
    productName: 'Sẽ toy'
  })

  useEffect(() => {
    setIsAdmin(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePayment = () => {
    console.log('Thông tin thanh toán:', {
      cardOwner,
      cardType,
      cardNumber,
      expiryDate,
      cvc
    })
    toast.info('Đang tiến hành thanh toán, vui lòng chờ trong giây lát...')
    if (paymentMethod === 'paypal') {
      paymentPaypal(289).then((res) => {
        if (res.data.redirectUrl) {
          window.location.href = res.data.redirectUrl
        }
      })
    }
  }

  return (
    <Box
      sx={{
        p: 4,
        // bgcolor: '#f3f4f6',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: (theme) => (theme.palette.mode === 'light' ? '#ffffff' : '#2f3542'),
        color: (theme) => (theme.palette.mode === 'light' ? '#333' : '#00b894')
      }}>
      <Paper
        elevation={5}
        sx={{
          maxWidth: 1200,
          borderRadius: '16px',
          overflow: 'hidden',
          p: 4
          //   backgroundImage: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
        }}>
        <Grid container spacing={4}>
          {/* Cột bên trái: Thông tin đặt phòng */}
          <Grid item xs={12} md={5} sx={{ borderRight: '1px solid #e0e0e0' }}>
            <Box sx={{ px: 2 }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  mb: 3,
                  color: (theme) => (theme.palette.mode === 'light' ? '#3498db' : '#00b894'),
                  textAlign: 'center',
                  mr: 2
                }}>
                <DetailsIcon sx={{ gap: 2 }} />
                Chi Tiết Đặt Phòng
              </Typography>

              {/* Khung chứa thông tin phòng */}
              <Card elevation={3} sx={{ mb: 3, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    <HomeIcon sx={{ mr: 1 }} />
                    Tên nhà trọ: DQ4T
                  </Typography>
                  <Typography variant="body1">Địa chỉ: 87 Nguyễn Trường Tộ, Ba Đình, Hà Nội, Việt Nam</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <EventIcon sx={{ mr: 1 }} />
                    Nhận phòng: Thứ 3, ngày 8 tháng 10 năm 2024
                  </Typography>
                  <Typography variant="body2">
                    <EventIcon sx={{ mr: 1 }} />
                    Trả phòng: Thứ 4, ngày 9 tháng 11 năm 2024
                  </Typography>
                  <Typography variant="body2">Tổng thời gian lưu trú: 1 tháng</Typography>
                </CardContent>
              </Card>

              {/* Chi tiết đặt phòng */}
              <Card elevation={3} sx={{ mb: 3, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    <InfoIcon />
                    Chi Tiết
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2">
                      <BedroomParentIcon sx={{ mr: 1 }} />
                      Loại phòng: Deluxe Room
                    </Typography>
                    <Typography variant="body2">
                      <ProductionQuantityLimitsIcon sx={{ mr: 1 }} />
                      Số lượng phòng: 1
                    </Typography>
                    <Typography variant="body2">
                      <PeopleIcon sx={{ mr: 1 }} />
                      Số khách: 2 người lớn, 1 trẻ em
                    </Typography>
                    <Typography variant="body2">
                      <WifiIcon sx={{ mr: 1 }} />
                      Dịch vụ đi kèm: Wifi miễn phí
                    </Typography>
                    <Typography variant="body2">
                      <BreakfastDiningIcon sx={{ mr: 1 }} />
                      Dịch vụ đi kèm: Bữa sáng miễn phí
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      <AttachMoneyIcon sx={{ mr: 1 }} />
                      Giá mỗi tháng: {formatterAmount(2890000)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Tóm tắt giá */}
              <Card
                elevation={3}
                sx={{
                  mb: 3,
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  bgcolor: (theme) => (theme.palette.mode === 'light' ? '#fff9f0' : '#2f3542'),
                  color: (theme) => (theme.palette.mode === 'light' ? '#333' : '#00b894')
                }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="#e17055">
                    <RequestQuoteIcon />
                    Tóm tắt giá
                  </Typography>
                  <Typography variant="body1" color="#d63031">
                    Giá gốc: {formatterAmount(2890000)}
                  </Typography>
                  <Typography variant="body1" color="#d63031">
                    Giảm giá: - {formatterAmount(867000)} /Tháng
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color="#00b894">
                    <AttachMoneyIcon />
                    Tổng cộng: {formatterAmount(2023000)} /Tháng
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    Đã bao gồm thuế và phí
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          {/* Cột bên phải: Form nhập thông tin thanh toán */}
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                px: 3,
                color: (theme) => (theme.palette.mode === 'light' ? '#333' : '#00b894')
              }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  mb: 3,
                  textAlign: 'center',
                  color: (theme) => (theme.palette.mode === 'light' ? '#3498db' : '#00b894')
                }}>
                <CreditCardIcon sx={{ mr: 1 }} />
                Thanh Toán
              </Typography>
              <FormControl
                fullWidth
                sx={{ mb: 2, color: (theme) => (theme.palette.mode === 'light' ? '#333' : '#00b894') }}>
                <InputLabel>Phương thức thanh toán</InputLabel>
                <Select
                  value={paymentMethod}
                  sx={{
                    bgcolor: (theme) => (theme.palette.mode === 'light' ? '#ffffff' : '#2f3542')
                  }}
                  label="Loại thẻ"
                  onChange={(e) => setPaymentMethod(e.target.value)}>
                  <MenuItem value="paypal" sx={{ display: 'flex', gap: 2 }}>
                    <img
                      height={35}
                      src="https://images.ctfassets.net/drk57q8lctrm/21FLkQ2lbOCWynXsDZvXO5/485a163f199ef7749b914e54d4dc3335/paypal-logo.webp"
                      alt=""
                    />
                  </MenuItem>
                  <MenuItem value="stripe" sx={{ display: 'flex', gap: 2 }}>
                    <img
                      height={35}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png"
                      alt=""
                    />
                  </MenuItem>
                  <MenuItem value="vnPay" sx={{ display: 'flex', gap: 2 }}>
                    <img
                      height={35}
                      src="https://i0.wp.com/discvietnam.com/wp-content/uploads/2020/07/C%E1%BB%95ng-thanh-to%C3%A1n-VNPAY-Logo-Th%E1%BA%BB-ATM-T%C3%A0i-kho%E1%BA%A3n-ng%C3%A2n-h%C3%A0ng-Online-Banking-M%C3%A3-QR-QR-Pay-Qu%C3%A9t-QR-Transparent.png?fit=360%2C140&ssl=1"
                      alt=""
                    />
                    Chưa hỗ trợ
                  </MenuItem>
                  <MenuItem value="momo" sx={{ display: 'flex', gap: 2 }}>
                    <img height={35} src="./images/{339F660B-89C6-4C67-9986-2D420FDF3FD8}.png" alt="" />
                    Chưa hỗ trợ
                  </MenuItem>
                  <MenuItem value="zaloPay" sx={{ display: 'flex', gap: 2 }}>
                    <img
                      height={35}
                      src="https://blogchiasekienthuc.com/wp-content/uploads/2019/07/su-dung-dich-vu-zalopay.png"
                      alt=""
                    />
                    Chưa hỗ trợ
                  </MenuItem>
                  <MenuItem value="shopeePay" sx={{ display: 'flex', gap: 2 }}>
                    <img
                      height={35}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-eXStWVAQ9Qtplrp11xZfmj7DQS4KlRQpFA&s"
                      alt=""
                    />
                    Chưa hỗ trợ
                  </MenuItem>
                  <MenuItem value="applePay" sx={{ display: 'flex', gap: 2 }}>
                    <img
                      height={35}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWxYUQvdwKXZ9meVu4Jx6fr7nNNo99TLl-bA&s"
                      alt=""
                    />
                    Chưa hỗ trợ
                  </MenuItem>
                  <MenuItem value="googlePay" sx={{ display: 'flex', gap: 2 }}>
                    <img
                      height={35}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/2560px-Google_Pay_Logo.svg.png"
                      alt=""
                    />
                    Chưa hỗ trợ
                  </MenuItem>
                  <MenuItem value="payoneer" sx={{ display: 'flex', gap: 2 }}>
                    <img
                      height={35}
                      src="https://seeklogo.com/images/P/payoneer-logo-80D77790C2-seeklogo.com.png"
                      alt=""
                    />
                    Chưa hỗ trợ
                  </MenuItem>
                  <MenuItem value="2checkout" sx={{ display: 'flex', gap: 2 }}>
                    <img
                      height={30}
                      src="https://logos-download.com/wp-content/uploads/2019/11/2CheckOut_Logo.png"
                      alt=""
                    />
                    Chưa hỗ trợ
                  </MenuItem>
                  <MenuItem value="square" sx={{ display: 'flex', gap: 2 }}>
                    <img
                      height={30}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Square%2C_Inc._logo.svg/1024px-Square%2C_Inc._logo.svg.png"
                      alt=""
                    />
                    Chưa hỗ trợ
                  </MenuItem>
                </Select>
              </FormControl>
              {paymentMethod === 'stripe' ? (
                <Elements stripe={stripePromise}>
                  <StripePayment stripeDetails={stripeDetails} />
                </Elements>
              ) : (
                <Box sx={{ mt: 3 }}>
                  {/* Tên chủ thẻ */}
                  <TextField
                    fullWidth
                    label="Tên chủ thẻ"
                    variant="outlined"
                    value={cardOwner}
                    onChange={(e) => {
                      // Lấy giá trị nhập vào
                      const inputValue = e.target.value

                      // Chuyển đổi tất cả các ký tự thành chữ hoa và loại bỏ dấu
                      const formattedValue = removeDiacritics(inputValue).toUpperCase()

                      setCardOwner(formattedValue)
                    }}
                    sx={{
                      mb: 2,
                      bgcolor: (theme) => (theme.palette.mode === 'light' ? '#ffffff' : '#2f3542'),
                      color: (theme) => (theme.palette.mode === 'light' ? '#333' : '#00b894')
                    }}
                  />

                  {/* Loại thẻ */}
                  <FormControl
                    fullWidth
                    sx={{ mb: 2, color: (theme) => (theme.palette.mode === 'light' ? '#333' : '#00b894') }}>
                    <InputLabel>Loại thẻ</InputLabel>
                    <Select
                      value={cardType}
                      sx={{
                        bgcolor: (theme) => (theme.palette.mode === 'light' ? '#ffffff' : '#2f3542')
                      }}
                      label="Loại thẻ"
                      onChange={(e) => setCardType(e.target.value)}>
                      <MenuItem value="Visa">Visa</MenuItem>
                      <MenuItem value="MasterCard">MasterCard</MenuItem>
                      <MenuItem value="JCB">JCB</MenuItem>
                    </Select>
                  </FormControl>

                  {/* Số thẻ */}
                  <TextField
                    fullWidth
                    label="Số thẻ"
                    variant="outlined"
                    value={cardNumber}
                    onChange={(e) => {
                      // Lấy giá trị nhập vào
                      const inputValue = e.target.value

                      // Chỉ cho phép nhập số và định dạng thành 4 nhóm 4 số
                      const formattedValue = inputValue
                        .replace(/\D/g, '') // Xóa tất cả ký tự không phải số
                        .replace(/(\d{4})(?=\d)/g, '$1 ') // Thêm khoảng trắng sau mỗi nhóm 4 số
                        .trim() // Loại bỏ khoảng trắng ở cuối

                      setCardNumber(formattedValue)
                    }}
                    inputProps={{
                      maxLength: 19 // Giới hạn số ký tự tối đa là 19 (16 số + 3 khoảng trắng)
                    }}
                    sx={{
                      mb: 2,
                      bgcolor: (theme) => (theme.palette.mode === 'light' ? '#ffffff' : '#2f3542')
                    }}
                  />

                  {/* Ngày hết hạn */}
                  <TextField
                    fullWidth
                    label="Ngày hết hạn (MM/YYYY)"
                    variant="outlined"
                    value={expiryDate}
                    onChange={(e) => {
                      // Lấy giá trị nhập vào
                      const inputValue = e.target.value

                      // Kiểm tra định dạng và định dạng lại
                      const formattedValue = inputValue
                        .replace(/\D/g, '') // Xóa tất cả ký tự không phải số
                        .replace(/(\d{2})(\d{0,4})/, '$1/$2') // Định dạng thành MM/YYYY
                        .slice(0, 7) // Giới hạn độ dài tối đa là 7 ký tự (MM/YYYY)

                      setExpiryDate(formattedValue)
                    }}
                    inputProps={{
                      maxLength: 7 // Giới hạn ký tự tối đa là 7 (MM/YYYY)
                    }}
                    sx={{
                      mb: 2,
                      bgcolor: (theme) => (theme.palette.mode === 'light' ? '#ffffff' : '#2f3542'),
                      color: (theme) => (theme.palette.mode === 'light' ? '#333' : '#2f3542')
                    }}
                  />

                  {/* Mã CVC */}
                  <TextField
                    fullWidth
                    label="Mã CVC"
                    variant="outlined"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    sx={{
                      mb: 2,
                      bgcolor: (theme) => (theme.palette.mode === 'light' ? '#ffffff' : '#2f3542')
                    }}
                  />

                  {/* Checkbox lưu thông tin thẻ */}
                  <FormControlLabel
                    control={<Checkbox checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />}
                    label="Lưu thông tin thẻ cho lần thanh toán sau"
                    sx={{ mb: 3 }}
                  />

                  {/* Nút thanh toán */}
                  <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
                    <Button
                      sx={{ color: (theme) => (theme.palette.mode === 'light' ? '#333' : '#00b894') }}
                      variant="outlined"
                      onClick={() => console.log('Kiểm tra lại đặt phòng')}>
                      Kiểm tra lại đặt phòng
                    </Button>
                    <Button
                      sx={{ color: (theme) => (theme.palette.mode === 'light' ? '#333' : '#00b894') }}
                      variant="contained"
                      onClick={handlePayment}
                      startIcon={<CreditCardIcon />}
                      disabled={!isChecked} // Disable nếu chưa đồng ý điều khoản
                    >
                      Hoàn tất đặt chỗ bằng {paymentMethod}
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default PaymentPage
