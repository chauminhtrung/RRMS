import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { Facebook, Instagram, Twitter } from '@mui/icons-material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YouTubeIcon from '@mui/icons-material/YouTube'
import SendIcon from '@mui/icons-material/Send'
import { Box, useMediaQuery } from '@mui/material'
import './Footer.css'
export default function Footer() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  return (
    <Box
      sx={{
        backgroundColor: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800])
      }}>
      <footer className="footer-section">
        <div className="container">
          <div className="footer-text">
            <div className="row">
              <div className="col-lg-4">
                <div className="ft-about">
                  <div className="logo">
                    <Link to="#">
                      <img src="/logo.png" alt="" />
                    </Link>
                  </div>
                  <Typography>
                    RRMS là kênh chuyên cung cấp giải pháp tìm kiếm nhà ở chất lượng và thuận tiện.
                  </Typography>
                  <div className="fa-social">
                    <Link to="#">
                      <Facebook sx={{ color: '#3498db' }} />
                    </Link>
                    <Link to="#">
                      <Twitter sx={{ color: '#2980b9' }} />
                    </Link>
                    <Link to="#">
                      <Instagram sx={{ color: '#f8a5c2' }} />
                    </Link>
                    <Link to="#">
                      <LinkedInIcon sx={{ color: '#2bcbba' }} />
                    </Link>
                    <Link to="#">
                      <YouTubeIcon sx={{ color: '#eb3b5a' }} />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 offset-lg-1">
                <div className="ft-contact">
                  <h6>Liên hệ với chúng tôi</h6>
                  <ul>
                    <li>
                      Dương Trí Dũng <span style={{ color: '#5eb7ff', fontWeight: 'bold' }}>- PS31407</span>
                    </li>
                    <li>
                      Châu Minh Trung <span style={{ color: '#5eb7ff', fontWeight: 'bold' }}>- PS31761</span>
                    </li>
                    <li>
                      Kiều Kiến Quốc <span style={{ color: '#5eb7ff', fontWeight: 'bold' }}>- PS31817</span>
                    </li>
                    <li>
                      Vũ Cao Trí <span style={{ color: '#5eb7ff', fontWeight: 'bold' }}>- PS31493</span>
                    </li>
                    <li>
                      Trần Quốc Thuận <span style={{ color: '#5eb7ff', fontWeight: 'bold' }}>- PS31471</span>
                    </li>
                    <li>
                      Nguyễn Tấn Tài <span style={{ color: '#5eb7ff', fontWeight: 'bold' }}>- PS31612</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 offset-lg-1">
                <div className="ft-newslatter">
                  <h6>Nhận thông báo mới nhất</h6>
                  <p>Hãy cho chúng tôi email để bạn có thể nhận được thông tin mới nhất từ chúng tôi!</p>
                  <form action="#" className="fn-form">
                    <input type="text" name="" id="" placeholder="Email" />
                    <button type="submit">
                      <SendIcon />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-option">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <ul>
                  <li>
                    <Link to="#">Liên hệ</Link>
                  </li>
                  <li>
                    <Link to="#">Điều khoản sử dụng</Link>
                  </li>
                  <li>
                    <Link to="#">Bảo mật</Link>
                  </li>
                  <li>
                    <Link to="#">Chính sách môi trường</Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-5">
                <div className="co-text">
                  <Typography
                    sx={{
                      fontSize: '16px',
                      color: '#707079',
                      textAlign: isMobile ? 'center' : 'right',
                      marginTop: isMobile ? '15px' : ''
                    }}>
                    Copyright © <span style={{ color: '#5eb7ff' }}>RRMS - Hệ thống quản lý trọ</span>
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Box>
  )
}
