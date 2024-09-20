import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const Search = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [loaiNha, setLoaiNha] = useState("");

  const handleLoaiNhaChange = (event) => {
    setLoaiNha(event.target.value);
  };

  const [gia, setGia] = useState("");

  const handleGiaChange = (event) => {
    setGia(event.target.value);
  };

  const [dienTich, setDienTich] = useState("");

  const handleDienTichChange = (event) => {
    setDienTich(event.target.value);
  };

  return (
    <Box>
      <Container
        sx={{
          mt: 4,
          border: "2px solid #ccc",
          borderRadius: "6px",
          bgcolor: "secondary.main",
        }}
      >
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={10} md={10}>
            <TextField
              sx={{ mt: 3 }}
              fullWidth
              label="Tìm kiếm tỉnh thành..."
              variant="outlined"
              onClick={handleClickOpen}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton color="primary" onClick={handleClickOpen}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Loại Nhà
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={loaiNha}
                label="Age"
                onChange={handleLoaiNhaChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Tất cả</MenuItem>
                <MenuItem value={20}>Căn hộ trung cư</MenuItem>
                <MenuItem value={30}>Nhà riêng</MenuItem>
                <MenuItem value={40}>Nhà mặt phố</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Giá</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={gia}
                label="Age"
                onChange={handleGiaChange}
              >
                <Typography sx={{ display: "flex ", justifyContent: "center" }}>
                  Mức Giá
                </Typography>
                <Typography
                  sx={{ display: "flex", justifyContent: "center" }}
                ></Typography>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Dưới 1 triệu</MenuItem>
                <MenuItem value={20}>Từ 2 triệu đến 5 triệu</MenuItem>
                <MenuItem value={30}>Trên 5 triệu</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Diện Tích
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={dienTich}
                label="dienTich"
                onChange={handleDienTichChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>
          Top những tỉnh thành nổi bật
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2} textAlign="center">
            {[
              {
                name: "Hà Nội",
                image: "https://picsum.photos/500/1000?random=1",
              },
              {
                name: "Hồ Chí Minh",
                image: "https://picsum.photos/500/1000?random=6",
              },
              {
                name: "Đà Nẵng",
                image: "https://picsum.photos/500/1000?random=2",
              },
              {
                name: "Bình Dương",
                image: "https://picsum.photos/500/1000?random=3",
              },
              {
                name: "Đồng Nai",
                image: "https://picsum.photos/500/1000?random=4",
              },
              {
                name: "Khánh Hòa",
                image: "https://picsum.photos/500/1000?random=5",
              },
            ].map((city) => (
              <Grid item xs={6} sm={4} md={2} key={city.name}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={city.image}
                    alt={city.name}
                  />
                  <CardContent>
                    <Typography variant="body2">{city.name}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h5" sx={{ mt: 4 }}>
            Tất cả tỉnh thành
          </Typography>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            {["An Giang", "Bà Rịa Vũng Tàu", "Bắc Giang", "Bắc Kạn"].map(
              (city) => (
                <Grid item xs={12} sm={6} md={3} key={city}>
                  <Typography variant="body2">
                    <Button variant="text" href="#" color="inherit">
                      {city}
                    </Button>
                  </Typography>
                </Grid>
              )
            )}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Search;
