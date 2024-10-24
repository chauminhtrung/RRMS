import { createTheme } from '@mui/material/styles'
const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#5eb7ff', // Đổi màu chính của giao diện tại đây
          contrastText: '#fff',
        },
        secondary: {
          main: '#dcdde1',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#2f3640', // Đổi màu chính của giao diện tại đây
        },
        secondary: {
          main: '#353b48',
        },
      },
    },
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: 'primary.main',
        },
        root: {
          height: '40px',
          alignItems: 'center',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '16px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 8,
          '&:last-child': {
            paddingBottom: 8,
          },
        },
      },
    },
  },
})

export default theme
