import { Box, FormControl, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

const LanguageSelect = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <FormControl size="small" sx={{ width: 130 }}>
        <Select
          value={i18n.language}
          onChange={(event) => changeLanguage(event.target.value)}
        >
          <MenuItem value={"vi"}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {t("Vietnamese")}
            </Box>
          </MenuItem>
          <MenuItem value={"en"}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {t("English")}
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default LanguageSelect;
