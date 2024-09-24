/* eslint-disable react/prop-types */
import { Avatar, Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Grid } from "@mui/material";

const UserDetail = ({ item }) => {
  const [showPhone, setShowPhone] = useState(false);
  const togleShowPhone = () => {
    setShowPhone(!showPhone);
    if (!showPhone) {
      navigator.clipboard.writeText(item.phone);
      alert("Đã sao chép điện thoại");
    }
  };

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        border: (theme) =>
          theme.palette.mode === "light"
            ? "1px solid #747d8c"
            : "1px solid #a4b0be",
        padding: (theme) => theme.spacing(2),
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "sticky",
        top: 20,
      }}
    >
      <Avatar
        alt="Remy Sharp"
        sx={{ height: "75px", width: "75px" }}
        src="https://picsum.photos/500/500?random=5"
      />
      <Typography variant="subtitle1">Chủ nhà: {item.owner}</Typography>
      <Typography sx={{ color: "lime" }} variant="overline">
        Đã được chứng thực
      </Typography>
      <Grid
        container
        spacing={1}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Grid item md={6} xs={6}>
          <Button
            variant="contained"
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === "light" ? "#3742fa" : "#5352ed",
              width: isMobile ? "90%" : "100%",
            }}
          >
            Nhắn tin Zalo
          </Button>
        </Grid>
        <Grid item md={6} xs={6}>
          <Button
            variant="contained"
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === "light" ? "#ffa502" : "#eccc68",
              width: "100%",
            }}
            onClick={togleShowPhone}
          >
            {showPhone ? item.phone : "Lấy số điện thoại"}
          </Button>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        sx={{
          my: 2,
          bgcolor: (theme) =>
            theme.palette.mode === "light" ? "#2ed573" : "#7bed9f",
          width: "100%",
        }}
      >
        Quan tâm
      </Button>
      <Button
        variant="contained"
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "light" ? "#ff4757" : "#ff6b81",
          width: "100%",
        }}
      >
        Báo cáo tin
      </Button>
    </Box>
  );
};

export default UserDetail;
