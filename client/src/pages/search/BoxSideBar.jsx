import { Box, Button } from "@mui/material";

const BoxSideBar = () => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
      {[
        "Trường Cao đẳng Đại Việt Sài Gòn",
        "Trường Cao đẳng Đại Việt Sài Gòn",
        "Trường Cao đẳng Đại Việt Sài Gòn",
      ].map((school, index) => (
        <Button key={index} variant="outlined" fullWidth={true}>
          {school}
        </Button>
      ))}
    </Box>
  );
};

export default BoxSideBar;
