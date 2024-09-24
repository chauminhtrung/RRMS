import { Box } from "@mui/material";
import { bannerHorizontal } from "~/apis/mock-data-banner-horizontal";

const BannerHorizontal = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        my: 2,
        gap: 3,
      }}
    >
      <Box
        component="img"
        src={bannerHorizontal[0].image}
        alt=""
        width="100%"
        height="auto"
        sx={{ borderRadius: "8px" }}
      />
      <Box
        component="img"
        src={bannerHorizontal[1].image}
        alt=""
        width="100%"
        height="auto"
        sx={{ borderRadius: "8px" }}
      />
    </Box>
  );
};

export default BannerHorizontal;
