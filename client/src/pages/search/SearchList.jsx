import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";

const SearchList = () => {
  const [sortByPrice, setSortByPrice] = useState("");
  const [sortByArea, setSortByArea] = useState("");

  const handlePriceChange = (event) => {
    setSortByPrice(event.target.value);
  };

  const handleAreaChange = (event) => {
    setSortByArea(event.target.value);
  };
  return (
    <Box>
      {/* Header Section */}
      <Container sx={{ mt: 2 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="body1">Có 20 Phòng trọ, nhà trọ</Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Mức Giá</InputLabel>
              <Select
                value={sortByPrice}
                label="Mức Giá"
                onChange={handlePriceChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Từ thấp đến cao</MenuItem>
                <MenuItem value={20}>Từ cao đến thấp</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Diện Tích</InputLabel>
              <Select
                value={sortByArea}
                label="Diện Tích"
                onChange={handleAreaChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Nhỏ đến lớn</MenuItem>
                <MenuItem value={20}>Lớn đến nhỏ</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default SearchList;
