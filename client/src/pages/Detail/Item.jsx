/* eslint-disable react/prop-types */
import { Box, Button, Typography } from "@mui/material";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

const Item = ({ item, index, totalItems, addressDetail }) => {
  const openGoogleMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${addressDetail}`;
    window.open(url, "_blank");
  };

  return (
    <Box sx={{ position: "relative" }}>
      <img
        src={item.image}
        width={850}
        height={500}
        alt={`Slide ${index + 1}`}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: 20,
          display: "flex",
          justifyContent: "space-between",
          width: "95%",
        }}
      >
        <Button
          sx={{ bgcolor: "primary.main" }}
          variant="contained"
          onClick={openGoogleMap}
          startIcon={<FmdGoodIcon />}
        >
          Xem vị trí
        </Button>
        <Typography color="white" variant="h6">
          Ảnh {index + 1}/{totalItems}
        </Typography>
      </Box>
    </Box>
  );
};

export default Item;
