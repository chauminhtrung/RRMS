import { deepOrange } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  colorSchemes: {
    dark: true,
    light: {
      palette: {
        primary: {
          main: "#5352ed", // Đổi màu chính của giao diện tại đây
        },
        secondary: deepOrange,
      },
    },
    // dark: {
    //   palette: {
    //     primary: cyan,
    //     secondary: orange,
    //   },
    // },
  },
});

export default theme;
