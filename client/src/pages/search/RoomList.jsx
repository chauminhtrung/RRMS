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

const RoomList = () => {
  return (
    <Box>
      {" "}
      {/* Giảm padding */}
      {/* Room Card */}
      <Grid container spacing={1}>
        {" "}
        {/* Giảm khoảng cách */}
        {/* Main Content */}
        <Grid item xs={12}>
          <Box p={1}>
            {" "}
            {/* Giảm padding giữa các Box */}
            <Card
              sx={{
                p: 1, // Giảm padding trong card
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CardMedia
                component="img"
                image="https://picsum.photos/500/1000?random=1"
                alt="Chung cư"
                sx={{
                  width: { xs: "100%", md: 200 },
                  height: 150,
                  mb: { xs: 2, md: 0 },
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">
                  Chung cư Mini Trần Cung 3,3tr tháng
                </Typography>
                <Typography variant="body2">
                  53 ngõ 514 Trần Cung, Cổ Nhuế 1, Bắc Từ Liêm, Thành phố Hà Nội
                </Typography>
                <Typography variant="h6" color="error">
                  3.300.000đ/tháng
                </Typography>
                <Typography variant="body2">
                  <Box component="span" sx={{ mr: 5 }}>
                    18m2
                  </Box>
                  <Box component="span" sx={{ mr: 5 }}>
                    25.000đ/khối
                  </Box>
                  <Box component="span">3.800đ/Kw</Box>
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Avatar
                    alt="Trinh"
                    src="https://via.placeholder.com/150" // Thay bằng đường dẫn ảnh thực tế
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="caption">Trinh, 2 ngày trước</Typography>
                </Box>
              </CardContent>
              <Box>
                <Button variant="outlined" color="primary">
                  Zalo
                </Button>
                <Button variant="outlined" color="primary" sx={{ ml: 2 }}>
                  Xem SĐT
                </Button>
              </Box>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoomList;
