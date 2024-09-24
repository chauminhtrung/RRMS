import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Avatar,
} from "@mui/material";
import { search } from "../../apis/mock-data-search";
// import { useEffect, useState } from "react";
// import { getDetail } from "~/apis/apiClient";

const RoomList = () => {
  // const [detail, setDetail] = useState(null);
  // useEffect(() => {
  //   getDetail().then((res) => {
  //     setDetail(res.data);
  //   });
  // }, []);

  return (
    <Box sx={{ width: "100%", overflow: "hidden", mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {search.images.map((item, i) => (
            <Card
              key={i}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                p: 2,
                boxShadow: 3,
                width: "100%",
                boxSizing: "border-box",
                overflow: "hidden",
                border: "1px solid #ccc",
                borderRadius: "8px",
                mt: 1,
              }}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt="Chung cư"
                sx={{
                  width: { xs: "100%", sm: 200 },
                  height: { xs: 200, sm: 150 },
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  textAlign: { xs: "center", sm: "left" },
                }}
              >
                <Typography variant="h6" noWrap>
                  {search.address}
                </Typography>
                <Typography variant="body2" color="textSecondary" noWrap>
                  {search.addressDetail}
                </Typography>
                <Typography variant="h6" color="error" sx={{ mt: 1 }}>
                  {search.price} VNĐ /Tháng
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <Box component="span" sx={{ mr: 2 }}>
                    {search.acreage} m²
                  </Box>
                  <Box component="span" sx={{ mr: 2 }}>
                    {search.water}/khối
                  </Box>
                  <Box component="span"> {search.electricity}đ/Kw</Box>
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Avatar src={search.avata} sx={{ mr: 1 }} />
                  <Typography variant="caption" color="textSecondary" noWrap>
                    Trinh, 2 ngày trước
                  </Typography>
                </Box>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row", sm: "column" },
                  alignItems: { xs: "center", sm: "flex-end" },
                  gap: 1,
                  width: { xs: "100%", sm: "auto" },
                  mt: { xs: 2, sm: 0 },
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth={true}
                  sx={{ textTransform: "none" }}
                >
                  Zalo
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth={true}
                  sx={{ textTransform: "none", ml: { xs: 2, sm: 0 } }}
                >
                  Xem SĐT
                </Button>
              </Box>
            </Card>
          ))}
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mx: 2,
          gap: 1,
          mt: 1,
        }}
      >
        <Button variant="contained">Trước</Button>
        <Button variant="contained">1</Button>
        <Button variant="contained">2</Button>
        <Button variant="contained">3</Button>
        <Button variant="contained">...</Button>
        <Button variant="contained">Sau</Button>
      </Box>
    </Box>
  );
};

export default RoomList;
