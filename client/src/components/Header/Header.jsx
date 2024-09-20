import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Option from "./Options/Option";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
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
                  {t("Detail")}
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Tooltip title="Hello Dũng">
                <Avatar
                  alt="Remy Sharp"
                  src="https://mui.com/static/images/avatar/1.jpg"
                />
              </Tooltip>

              <Option />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
