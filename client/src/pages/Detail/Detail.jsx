import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import Item from "./Item";
import UserDetail from "./UserDetail";
import { detail } from "../../apis/mock-data-detail";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FacebookIcon from "@mui/icons-material/Facebook";
import SendIcon from "@mui/icons-material/Send";

const Detail = () => {
  const getUlr = () => {
    navigator.clipboard.writeText(window.location.href);
  };
  return (
    <Box sx={{ mx: 16 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ my: 2 }}>
        <Link color="inherit" to="/">
          Trang chủ
        </Link>
        <Link color="inherit" to="/">
          {detail.address}
        </Link>
        <Link color="inherit" to="/">
          {detail.type}
        </Link>
        <Typography sx={{ color: "text.primary" }}>{detail.name}</Typography>
      </Breadcrumbs>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Carousel
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            animation="slide"
            autoPlay={false}
          >
            {detail.images.map((item, i) => (
              <Item
                key={i}
                index={i}
                item={item}
                addressDetail={detail.addressDetail}
                totalItems={detail.images.length}
              />
            ))}
          </Carousel>
          <Typography variant="h4">{detail.name}</Typography>
          <Typography variant="h5">{detail.addressDetail}</Typography>
          <Typography variant="h4" sx={{ my: 2, color: "red" }}>
            {detail.price}đ/tháng
          </Typography>
          <Grid container>
            <Grid itme xs={6}>
              <Typography>Chuyên mục: {detail.type}</Typography>
              <Typography>Tình trạng: {detail.status}</Typography>
              <Typography>Giờ giấc: {detail.hours}</Typography>
            </Grid>
            <Grid itme xs={6}>
              <Typography>
                Ngày bắt đầu cho thuê: {detail.rentalStartTime}
              </Typography>
              <Typography>Kiểm duyệt: {detail.censor}</Typography>
              <Typography>Tối đa người ở: {detail.maximum}</Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ gap: 2, justifyContent: "center", my: 2 }}>
            <Grid
              item
              xs={2.8}
              sx={{ border: "1px solid black", borderRadius: "5px", p: "5px" }}
            >
              <Typography>Tiền cọc</Typography>
              <Typography>3.300.000đ</Typography>
            </Grid>
            <Grid
              item
              xs={2.8}
              sx={{ border: "1px solid black", borderRadius: "5px", p: "5px" }}
            >
              <Typography>Tiền cọc</Typography>
              <Typography>3.300.000đ</Typography>
            </Grid>
            <Grid
              item
              xs={2.8}
              sx={{ border: "1px solid black", borderRadius: "5px", p: "5px" }}
            >
              <Typography>Tiền cọc</Typography>
              <Typography>3.300.000đ</Typography>
            </Grid>
            <Grid
              item
              xs={2.8}
              sx={{ border: "1px solid black", borderRadius: "5px", p: "5px" }}
            >
              <Typography>Tiền cọc</Typography>
              <Typography>3.300.000đ</Typography>
            </Grid>
          </Grid>
          <Typography variant="h4">Điểm (+)</Typography>
          <Grid container sx={{ gap: 2, justifyContent: "center", my: 2 }}>
            {detail.plusPoint.map((item, i) => (
              <Grid item xs={3.8} key={i}>
                <Box
                  sx={{
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    borderRadius: "5px",
                    p: "10px",
                  }}
                >
                  {item}
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4">Thông tin mô tả</Typography>
            <Button
              variant="outlined"
              sx={{ borderRadius: "25px" }}
              startIcon={<ContentCopyIcon />}
            >
              Copy
            </Button>
          </Box>
          <TextField
            id="outlined-multiline-static"
            multiline
            variant="outlined"
            value={detail.description}
            sx={{ width: "100%", my: 2 }}
          />
          <Grid container sx={{ justifyContent: "space-between" }}>
            <Grid
              item
              xs={3.8}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                sx={{
                  width: "200px",
                  bgcolor: (theme) =>
                    theme.palette.mode === "light" ? "#2ed573" : "#7bed9f",
                }}
                startIcon={<BookmarkIcon />}
              >
                Lưu xem sau
              </Button>
            </Grid>
            <Grid
              item
              xs={3.8}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                sx={{
                  width: "200px",
                  bgcolor: (theme) =>
                    theme.palette.mode === "light" ? "#1e90ff" : "#70a1ff",
                }}
                startIcon={<FacebookIcon />}
              >
                Chia sẻ facebook
              </Button>
            </Grid>
            <Grid
              item
              xs={3.8}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                sx={{
                  width: "200px",
                  bgcolor: (theme) =>
                    theme.palette.mode === "light" ? "#ffa502" : "#eccc68",
                }}
                startIcon={<SendIcon />}
                onClick={getUlr}
              >
                Copy link
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <UserDetail />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Detail;
