import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SendIcon from "@mui/icons-material/Send";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, useMediaQuery } from "@mui/material";
import "./footer.css";
import { red } from "@mui/material/colors";
export default function Footer() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <footer className="footer-section">
        <div className="container">
          <div className="footer-text">
            <div className="row">
              <div className="col-lg-4">
                <div className="ft-about">
                  <div className="logo">
                    <a href="#">
                      <img src="./logo.png" alt="" />
                    </a>
                  </div>
                  <Typography>
                    RRMS là kênh chuyên cung cấp giải pháp tìm kiếm nhà ở chất
                    lượng và thuận tiện.
                  </Typography>
                  <div className="fa-social">
                    <a href="#">
                      <Facebook sx={{ color: "#3498db" }} />
                    </a>
                    <a href="#">
                      <Twitter sx={{ color: "#2980b9" }} />
                    </a>
                    <a href="#">
                      <Instagram sx={{ color: "#f8a5c2" }} />
                    </a>
                    <a href="#">
                      <LinkedInIcon sx={{ color: "#2bcbba" }} />
                    </a>
                    <a href="#">
                      <YouTubeIcon sx={{ color: "#eb3b5a" }} />
                    </a>
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
                    <a href="#">Contact</a>
                  </li>
                  <li>
                    <a href="#">Terms of use</a>
                  </li>
                  <li>
                    <a href="#">Privacy</a>
                  </li>
                  <li>
                    <a href="#">Environmental Policy</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-5">
                <div className="co-text">
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: "#707079",
                      textAlign: isMobile ? "center" : "right",
                      marginTop: isMobile ? "15px" : "",
                    }}
                  >
                    Copyright ©
                    <script>document.write(new Date().getFullYear());</script>
                    2024 All rights reserved | This template is made with{" "}
                    <FavoriteIcon /> by{" "}
                    <a href="https://colorlib.com" target="_blank">
                      RRMS
                    </a>
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Box>
  );
}
