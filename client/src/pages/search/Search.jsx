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
  Slider, // Import Slider ở đây
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import RoomList from "./RoomList";
import SearchList from "./SearchList";
import BoxSideBar from "./BoxSideBar";
import Name from "./Name";
import ButtonPre from "./ButtonPre";

const Search = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [loaiNha, setLoaiNha] = useState("");
  const handleLoaiNhaChange = (event) => {
    setLoaiNha(event.target.value);
  };

  const [dienTich, setDienTich] = useState([0, 50]);
  const handleDienTichChange = (event, newValue) => {
    setDienTich(event.target.value);
    setDienTich(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [gia, setGia] = useState([0, 50]);

  const handleChange = (event, newValue) => {
    setGia(event.target.value);
    setGia(newValue);
  };

  const valuetext = (value) => {
    return `${value}°C`;
  };
  return (
    <Box>
      <Container
        sx={{
          mt: 5,
          border: "3px solid #ccc",
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

          {/* Select Loại Nhà */}
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Loại Nhà
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={loaiNha}
                label="Loại Nhà"
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

          {/* Select Giá */}
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Giá</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={gia}
                label="Giá"
                onChange={handleChange}
              >
                <Typography gutterBottom sx={{ mt: 2, mx: 1.5 }}>
                  Khoảng giá (Triệu)
                </Typography>
                <Box sx={{ width: 300 }}>
                  <Slider
                    sx={{ mx: 2, width: 320 }}
                    getAriaLabel={() => "Temperature range"}
                    value={gia}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    max={50}
                  />
                </Box>
                <Typography sx={{ mx: 1.5 }}>
                  {`Giá từ: ${gia[0]} triệu - ${gia[1]} triệu`}
                </Typography>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Dưới 1 triệu</MenuItem>
                <MenuItem value={20}>Từ 1 triệu - 5 triệu</MenuItem>
                <MenuItem value={30}>Từ 5 triệu - 10 triệu</MenuItem>
                <MenuItem value={40}>Dưới 50 triệu</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Select Diện Tích */}
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Diện Tích
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={dienTich}
                label="Diện Tích"
                onChange={handleDienTichChange}
              >
                <Typography gutterBottom sx={{ mt: 2, mx: 1.5 }}>
                  Diện tích (m2)
                </Typography>
                <Box sx={{ width: 300 }}>
                  <Slider
                    sx={{ mx: 2, width: 320 }}
                    getAriaLabel={() => "Temperature range"}
                    value={dienTich}
                    onChange={handleDienTichChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    max={50}
                  />
                </Box>
                <Typography sx={{ mx: 1.5 }}>
                  {`Diện tích từ: ${dienTich[0]} m2 - ${dienTich[1]} m2`}
                </Typography>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Dưới 50m²</MenuItem>
                <MenuItem value={20}>50m² - 100m²</MenuItem>
                <MenuItem value={30}>100m² - 200m²</MenuItem>
                <MenuItem value={40}>Trên 200m²</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={open} maxWidth="lg" fullWidth>
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
          <Button color="primary" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <SearchList />
      <Container>
        <Grid container>
          <Grid item md={10}>
            <RoomList />
            <RoomList />
            <RoomList />
            <RoomList />
            <RoomList />
            <RoomList />
            <ButtonPre />
          </Grid>
          <Grid item md={2} sx={{ mt: 4 }}>
            <Name />
            <BoxSideBar />
            <BoxSideBar />
            <BoxSideBar />
            <BoxSideBar />
            <BoxSideBar />
            <BoxSideBar />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Search;
