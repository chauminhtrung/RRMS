
// import {
//   AppBar,
//   Avatar,
//   Box,
//   Button,
//   IconButton,
//   Toolbar,
//   Tooltip,
//   Typography,
// } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
// import { Link } from "react-router-dom";
import Option from './Options/Option'
// import { useTranslation } from "react-i18next";

import { Link } from 'react-router-dom'


import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'
import Option from './Options/Option'


import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import EmailIcon from '@mui/icons-material/Email'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined'
import CloseIcon from '@mui/icons-material/Close'
import './Header.css'

const Header = () => {
  // const { t } = useTranslation()
  return (
    <>
      {/* Offcanvas Menu Section Begin  */}
      <div className="offcanvas offcanvas-start" id="myNav">
        <div className="offcanvas-header">
          <div className="canvas-close">
            <CloseIcon sx={{ fontSize: '12px' }} className="btn-close" data-bs-dismiss="offcanvas" />
          </div>
        </div>
        <div className="offcanvas-body">
          <div className="search-icon  search-switch">
            <TravelExploreOutlinedIcon />
          </div>

          <div className="header-configure-area">
            <div className="language-option">
              <Option />

              <a href="/login" className="bk-btn"></a>

              <a href="#" className="bk-btn">
                Đăng nhập
              </a>
            </div>
          </div>

          <div className="slicknav-menu">
            <ul className="list-group  list-group-flush">
              <li className="list-group-item">
                <a href="">Home</a>
              </li>
              <li className="list-group-item">
                <a href="">Host software</a>
              </li>
              <li className="list-group-item">
                <a href="">Tenant APP</a>
              </li>

              <li className="list-group-item">
                <a href="">Price list</a>
              </li>
              <li className="list-group-item">
                <a href="">RRMS Plus+</a>
              </li>
              <li className="list-group-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                  More+
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Information portal
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Recruitment
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      instruct
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="top-social">
            <a href="#">
              <FacebookIcon />
            </a>
            <a href="#">
              <TwitterIcon />
            </a>
            <a href="#">
              <InstagramIcon />
            </a>
            <a href="#">
              <LinkedInIcon />
            </a>
          </div>

          <ul className="top-widget">
            <li>
              {' '}
              <LocalPhoneIcon sx={{ color: '#4bcffa;' }} /> (84+) 07274629
            </li>
            <li>
              <EmailIcon sx={{ color: '#4bcffa;' }} /> nhatroRRMS.com
            </li>
          </ul>
        </div>
      </div>
      <div className="canvas-open">
        <MenuIcon
          data-bs-toggle="offcanvas"
          data-bs-target="#myNav"
          sx={{ textAlign: 'center', marginBottom: '5px' }}
        />
      </div>

      {/* Offcanvas Menu Section End  */}

      <header className="header-section">
        <div className="top-nav " id="mynavbar">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <ul className="tn-left">
                  <li>
                    <LocalPhoneIcon className="IconLeft" /> (84+) 07274629
                  </li>
                  <li>
                    <EmailIcon className="IconLeft" />
                    nhatroRRMS.com
                  </li>
                </ul>
              </div>
              <div className="col-lg-6">
                <div className="tn-right">
                  <div className="top-social">
                    <a href="#">
                      <FacebookIcon />
                    </a>
                    <a href="#">
                      <TwitterIcon />
                    </a>
                    <a href="#">
                      <InstagramIcon />
                    </a>
                    <a href="#">
                      <LinkedInIcon />
                    </a>
                  </div>
                  <Link to="/login" className="bk-btn">
                    Đăng nhập
                  </Link>
                  <div className="language-option">
                    <Option />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="menu-item">
          <div className="container">
            <div className="row">
              <div className="col-lg-2">
                <div className="logo">
                  <Link to="/">
                    <img src="./logo.png" alt="" className="ImageLogo" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-10">
                <div className="nav-menu">
                  <nav className="mainmenu">
                    <ul>
                      <li className="active">
                        <a href="#">Home</a>
                      </li>
                      <li>
                        <a href="#">Host software</a>
                      </li>
                      <li>
                        <a href="#">Tenant APP</a>
                      </li>
                      <li>
                        <a href="#">More</a>
                        <ul className="dropdown">
                          <li>
                            <a href="#">Information portal</a>
                          </li>
                          <li>
                            <a href="#">Recruitment</a>
                          </li>
                          <li>
                            <a href="#">instruct</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="./blog.html">Price list</a>
                      </li>
                      <li>
                        <a href="./contact.html">RRMS Plus+</a>
                      </li>
                      <li>
                        <a href="/introduce">Introduce</a>
                      </li>
                      <li>
                        <a href="/contact">Contact</a>
                      </li>
                    </ul>
                  </nav>
                  <div className="nav-right search-switch">
                    <TravelExploreOutlinedIcon className="Icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="search-model">
        <div className="h-100 d-flex align-items-center justify-content-center">
          <div className="search-close-switch">
            <i className="icon_close"></i>
          </div>
          <form className="search-model-form">
            <input type="text" id="search-input" placeholder="Search here....." />
          </form>
        </div>
      </div>
    </>
  )
}

export default Header
