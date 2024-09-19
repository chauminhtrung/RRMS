import { Box, Breadcrumbs, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import Item from "./Item";

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
        </Grid>
        <Grid item xs={4}>
          Hello
        </Grid>
      </Grid>
    </Box>
  );
};

export default Detail;
