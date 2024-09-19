import {
  Box,
  FormControl,
  MenuItem,
  Select,
  useColorScheme,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
const ModeSelect = () => {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  return (
    <FormControl size="small" sx={{}}>
      <Select
        value={mode}
        onChange={(event) => {
          setMode(event.target.value);
          console.log(mode);
        }}
        color="inherit"
        sx={{ color: "white" }}
      >
        <MenuItem value={"light"}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LightModeIcon fontSize="small" />
            Light
          </Box>
        </MenuItem>
        <MenuItem value={"dark"}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DarkModeIcon fontSize="small" />
            Dark
          </Box>
        </MenuItem>
        <MenuItem value={"system"}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SettingsBrightnessIcon fontSize="small" />
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default ModeSelect;
