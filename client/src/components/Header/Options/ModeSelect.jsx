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
import { useTranslation } from "react-i18next";
const ModeSelect = () => {
  const { mode, setMode } = useColorScheme();
  const { t } = useTranslation();

  if (!mode) {
    return null;
  }

  return (
    <FormControl size="small" sx={{ width: 130 }}>
      <Select
        value={mode}
        onChange={(event) => {
          setMode(event.target.value);
          console.log(mode);
        }}
      >
        <MenuItem value={"light"}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LightModeIcon fontSize="small" />
            {t("Light")}
          </Box>
        </MenuItem>
        <MenuItem value={"dark"}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DarkModeIcon fontSize="small" />
            {t("Dark")}
          </Box>
        </MenuItem>
        <MenuItem value={"system"}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SettingsBrightnessIcon fontSize="small" />
            {t("System")}
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default ModeSelect;
