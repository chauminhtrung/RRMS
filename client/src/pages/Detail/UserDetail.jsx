import { Avatar, Box, Button, Typography } from "@mui/material";

const UserDetail = () => {
  return (
    <Box
      sx={{
        border: "1px solid black",
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
        <Button variant="contained">Nhắn tin Zalo</Button>
        <Button variant="contained">Xem số điện thoại</Button>
      </Box>
      <Button variant="contained" sx={{ my: 2 }}>
        Quan tâm
      </Button>
      <Button variant="contained">Báo cáo tin</Button>
    </Box>
  );
};

export default UserDetail;
