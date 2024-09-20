import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return <div>{t("Welcome to React")}</div>;
};

export default Home;
