import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import LanguageSelect from "./LanguageSelect";
import ModeSelect from "./ModeSelect";
import SettingsIcon from "@mui/icons-material/SettingsSuggestOutlined";

const Option = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          color: "black",
        }}
      >
        <SettingsIcon fontSize="large" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <LanguageSelect />
        </MenuItem>
        <MenuItem>
          <ModeSelect />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Option;
