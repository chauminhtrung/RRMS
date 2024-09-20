import { Box, Breadcrumbs, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import Item from "./Item";
import UserDetail from "./UserDetail";

const items = [
  {
    image: "https://picsum.photos/1000/500?random=1",
  },
  {
    image: "https://picsum.photos/1000/500?random=2",
  },
  {
    image: "https://picsum.photos/1000/500?random=3",
  },
  {
    image: "https://picsum.photos/1000/500?random=4",
  },
  {
    image: "https://picsum.photos/1000/500?random=5",
  },
];

const Detail = () => {
  return (
    <Box sx={{ mx: 16 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ my: 2 }}>
        <Link underline="hover" color="inherit" to="/">
          Trang chủ
        </Link>
        <Link underline="hover" color="inherit" to="/core">
          Quận 12
        </Link>
        <Typography sx={{ color: "text.primary" }}>
          224 Hà Đặc 2tr6/tháng
        </Typography>
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
            {items.map((item, i) => (
              <Item key={i} index={i} item={item} totalItems={items.length} />
            ))}
          </Carousel>
          <Typography variant="h4">
            Chung cư Mini Trần Cung 3,3tr tháng
          </Typography>
          <Typography variant="h5">
            53 ngõ 514 Trần Cung, Cổ Nhuế 1, Bắc Từ Liêm, Thành phố Hà Nội
          </Typography>
          <Typography variant="h4" sx={{ my: 2, color: "red" }}>
            3.300.000đ/tháng
          </Typography>
          <Grid container>
            <Grid itme xs={6}>
              <Typography variant="h6">
                Chung cư Mini Trần Cung 3,3tr tháng
              </Typography>
              <Typography variant="h6">
                53 ngõ 514 Trần Cung, Cổ Nhuế 1, Bắc Từ Liêm, Thành phố Hà Nội
              </Typography>
              <Typography variant="h6">3.300.000đ/tháng</Typography>
            </Grid>
            <Grid itme xs={6}>
              <Typography variant="h6">
                Chung cư Mini Trần Cung 3,3tr tháng
              </Typography>
              <Typography variant="h6">
                53 ngõ 514 Trần Cung, Cổ Nhuế 1, Bắc Từ Liêm, Thành phố Hà Nội
              </Typography>
              <Typography variant="h6">3.300.000đ/tháng</Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ gap: 2, justifyContent: "center" }}>
            <Grid
              item
              xs={2.7}
              sx={{ border: "1px solid black", borderRadius: "5px", p: "5px" }}
            >
              <Typography>Tiền cọc</Typography>
              <Typography>3.300.000đ</Typography>
            </Grid>
            <Grid
              item
              xs={2.7}
              sx={{ border: "1px solid black", borderRadius: "5px", p: "5px" }}
            >
              <Typography>Tiền cọc</Typography>
              <Typography>3.300.000đ</Typography>
            </Grid>
            <Grid
              item
              xs={2.7}
              sx={{ border: "1px solid black", borderRadius: "5px", p: "5px" }}
            >
              <Typography>Tiền cọc</Typography>
              <Typography>3.300.000đ</Typography>
            </Grid>
            <Grid
              item
              xs={2.7}
              sx={{ border: "1px solid black", borderRadius: "5px", p: "5px" }}
            >
              <Typography>Tiền cọc</Typography>
              <Typography>3.300.000đ</Typography>
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
