import { deepOrange, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  colorSchemes: {
    // dark: true,
    light: {
      palette: {
        primary: {
          main: "#5352ed", // Đổi màu chính của giao diện tại đây
          contrastText: "#fff",
        },
        secondary: {
          main: "#dcdde1",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#2f3640", // Đổi màu chính của giao diện tại đây
        },
        secondary: {
          main: "#353b48",
        },
      },
    },
  },
});

export default theme;
