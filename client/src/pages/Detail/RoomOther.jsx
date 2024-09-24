/* eslint-disable react/prop-types */
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Slider from "react-slick";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Person4OutlinedIcon from "@mui/icons-material/Person4Outlined";
// Nút Next tùy chỉnh
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      top: "50%",
      right: 10,
      zIndex: 1,
      cursor: "pointer",
    }}
  >
    <ArrowCircleRightOutlinedIcon sx={{ color: "#fff" }} fontSize="large" />
  </div>
);

// Nút Previous tùy chỉnh
const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      top: "50%",
      left: 10,
      zIndex: 1,
      cursor: "pointer",
    }}
  >
    <ArrowCircleLeftOutlinedIcon sx={{ color: "#fff" }} fontSize="large" />
  </div>
);

const RoomOther = ({ items }) => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // 1024px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600, // 600px
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ padding: 2, position: "relative" }}>
      <Slider {...settings}>
        {items.map((item, index) => (
          <Box key={index} sx={{ padding: "0 10px" }}>
            <Card>
              <CardMedia component="img" image={item.images[0]} />
              <CardContent
                sx={{
                  p: 1,
                  "&:last-child": {
                    pb: 0,
                  },
                }}
              >
                <Typography variant="inherit">{item.name}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Person4OutlinedIcon />
                  <Typography variant="subtitle2" color="text.secondary">
                    {item.owner} -
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.address}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === "light" ? "#ff4757" : "#ff6b81",
                    }}
                  >
                    {item.price} VND
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {item.area} m2
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default RoomOther;
