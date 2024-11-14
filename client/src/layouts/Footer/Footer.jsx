import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { Facebook, Instagram, Twitter } from '@mui/icons-material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YouTubeIcon from '@mui/icons-material/YouTube'
import SendIcon from '@mui/icons-material/Send'
import FavoriteIcon from '@mui/icons-material/Favorite'
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
                      <img src="./logo.png" alt="" />
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
                  <h6>Contact Us</h6>
                  <ul>
                    <li>(12) 345 67890</li>
                    <li>info.colorlib@gmail.com</li>
                    <li>856 Cordia Extension Apt. 356, Lake, United State</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 offset-lg-1">
                <div className="ft-newslatter">
                  <h6>New latest</h6>
                  <p>Get the latest updates and offers.</p>
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
                    <Link to="#">Contact</Link>
                  </li>
                  <li>
                    <Link to="#">Terms of use</Link>
                  </li>
                  <li>
                    <Link to="#">Privacy</Link>
                  </li>
                  <li>
                    <Link to="#">Environmental Policy</Link>
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
                    Copyright ©<script>document.write(new Date().getFullYear());</script>
                    2024 All rights reserved | This template is made with <FavoriteIcon /> by{' '}
                    <Link to="https://colorlib.com" target="_blank">
                      RRMS
                    </Link>
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
