import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import ModeSelect from "./ModeSelect";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div">
                News
              </Typography>
              <Typography variant="h6" component="div">
                <Button
                  component={Link}
                  to="/detail"
                  variant="text"
                  color="inherit"
                >
                  Chi tiết
                </Button>
                <Button
                  component={Link}
                  to="/search"
                  variant="text"
                  color="inherit"
                >
                  Tìm kiếm
                </Button>
              </Typography>
            </Box>
            <Box>
              <Button color="inherit">Login</Button>
              <ModeSelect />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
