import { Avatar, Box, Button, Typography } from "@mui/material";

const UserDetail = () => {
  return (
    <Box
      sx={{
        border: (theme) =>
          theme.palette.mode === "light"
            ? "1px solid #747d8c"
            : "1px solid #a4b0be",
        padding: "10px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Avatar
        alt="Remy Sharp"
        sx={{ height: "75px", width: "75px" }}
        src="https://picsum.photos/500/500?random=5"
      />
      <Typography>Trí Dũng</Typography>
      <Typography sx={{ color: "lime" }} variant="h5">
        Đã được chứng thực
      </Typography>
      <Box sx={{ gap: 2.5, display: "flex" }}>
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
        >
          Xem số điện thoại
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
