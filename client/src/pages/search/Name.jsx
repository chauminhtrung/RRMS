import { Box, Typography, Button } from "@mui/material";

const Name = () => {
  return (
    <Box
      sx={{
        gap: 1,
        m: 2,
        bgcolor: (theme) =>
          theme.palette.mode === "light" ? "#fff" : "#dcdde1",
        color: (theme) => (theme.palette.mode === "light" ? "#333" : "#00b894"),
      }}
    >
      {/* Tiêu đề */}
      <Box>
        <Typography variant="h6">Phòng trọ, nhà trọ gần khu vực này</Typography>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
        {[
          "Trường Cao đẳng Đại Việt Sài Gòn",
          "Trường Cao đẳng Đại Việt Sài Gòn",
          "Trường Cao đẳng Đại Việt Sài Gòn",
          "Trường Cao đẳng Đại Việt Sài Gòn",
          "Trường Cao đẳng Đại Việt Sài Gòn",
          "Trường Cao đẳng Đại Việt Sài Gòn",
          "Trường Cao đẳng Đại Việt Sài Gòn",
          "Trường Cao đẳng Đại Việt Sài Gòn",
          "Trường Cao đẳng Đại Việt Sài Gòn",
        ].map((school, index) => (
          <Button
            key={index}
            variant="outlined"
            fullWidth={true}
            sx={{
              textTransform: "none",
              padding: "10px 20px",
              borderRadius: "20px",
            }}
          >
            {school}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Name;
