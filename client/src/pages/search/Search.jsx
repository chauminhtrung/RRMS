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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Search = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Container sx={{ mt: 4 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Tìm kiếm tỉnh thành..."
              variant="outlined"
              onClick={handleClickOpen}
            />
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
                image:
                  "https://mui.com/static/images/cards/contemplative-reptile.jpg",
              },
              {
                name: "Hồ Chí Minh",
                image:
                  "https://mui.com/static/images/cards/contemplative-reptile.jpg",
              },
              {
                name: "Đà Nẵng",
                image:
                  "https://mui.com/static/images/cards/contemplative-reptile.jpg",
              },
              {
                name: "Bình Dương",
                image:
                  "https://mui.com/static/images/cards/contemplative-reptile.jpg",
              },
              {
                name: "Đồng Nai",
                image:
                  "https://mui.com/static/images/cards/contemplative-reptile.jpg",
              },
              {
                name: "Khánh Hòa",
                image:
                  "https://mui.com/static/images/cards/contemplative-reptile.jpg",
              },
            ].map((city) => (
              <Grid item xs={4} md={2} key={city.name}>
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
                <Grid item xs={6} md={3} key={city}>
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
