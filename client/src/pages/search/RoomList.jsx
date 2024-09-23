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
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              p: 2,
              boxShadow: 3,
              width: "100%",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              image="https://picsum.photos/500/1000?random=1"
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
                Chung cư Mini Trần Cung 3,3tr tháng
              </Typography>
              <Typography variant="body2" color="textSecondary" noWrap>
                53 ngõ 514 Trần Cung, Cổ Nhuế 1, Bắc Từ Liêm, Thành phố Hà Nội
              </Typography>
              <Typography variant="h6" color="error" sx={{ mt: 1 }}>
                3.300.000đ/tháng
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <Box component="span" sx={{ mr: 2 }}>
                  18m²
                </Box>
                <Box component="span" sx={{ mr: 2 }}>
                  25.000đ/khối
                </Box>
                <Box component="span">3.800đ/Kw</Box>
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Avatar
                  alt="Trinh"
                  src="https://via.placeholder.com/150"
                  sx={{ mr: 1 }}
                />
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoomList;
