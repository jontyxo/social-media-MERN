import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://res.cloudinary.com/dvjc0fusx/image/upload/v1677507098/blog-app/h5uye38vjkhlcurdt7wu.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Lord Rings</Typography>
        <Typography color={medium}>lordrings.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
      Welcome to Lord Rings, where the enchantment of literature unfolds before your eyes. Step into a world of mythical wonders and embark on epic journeys crafted by the greatest literary minds.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;