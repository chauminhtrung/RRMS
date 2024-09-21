import { Box, Button } from "@mui/material";

const ButtonPre = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mx: 2,
        gap: 1, // khoảng cách giữa các button
      }}
    >
      <Button variant="contained">Trước</Button>
      <Button variant="contained">1</Button>
      <Button variant="contained">2</Button>
      <Button variant="contained">3</Button>
      <Button variant="contained">...</Button>
      <Button variant="contained">Sau</Button>
    </Box>
  );
};

export default ButtonPre;
