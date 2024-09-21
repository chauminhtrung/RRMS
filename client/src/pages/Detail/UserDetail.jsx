/* eslint-disable react/prop-types */
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const UserDetail = ({ item }) => {
  const [showPhone, setShowPhone] = useState(false);
  const togleShowPhone = () => {
    setShowPhone(!showPhone);
    if (!showPhone) {
      navigator.clipboard.writeText(item.phone);
      alert("Đã sao chép điện thoại");
    }
  };

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
      <Box
        sx={{
          gap: (theme) => theme.spacing(2.5),
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? "#3742fa" : "#5352ed",
          }}
        >
          Nhắn tin Zalo
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? "#ffa502" : "#eccc68",
          }}
          onClick={togleShowPhone}
        >
          {showPhone ? item.phone : "Lấy số điện thoại"}
        </Button>
      </Box>
      <Button
        variant="contained"
        sx={{
          my: 2,
          bgcolor: (theme) =>
            theme.palette.mode === "light" ? "#2ed573" : "#7bed9f",
        }}
      >
        Quan tâm
      </Button>
      <Button
        variant="contained"
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "light" ? "#ff4757" : "#ff6b81",
        }}
      >
        Báo cáo tin
      </Button>
    </Box>
  );
};

export default UserDetail;
