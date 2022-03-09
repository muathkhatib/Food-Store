/* eslint-disable import/namespace */
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const COLORS = {
  black: "#000000",
  white: "#FFFFFF",
  gray: "#4848488c",
  red: "#D6111E",
  gradientPrimary: ["#BB0D16", "#970810"],
  gradientGray: ["#4848488c", "#4848488c"],
};

export const SIZES = {
  //   Global sizes
  base: 8,
  font: 14,
  raduis: 12,
  padding: 24,
  // Font sizes
  h1: 30,
  h2: 20,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  //   App Dimensions
  width,
  height,
};

export const FONTS = {
  h1: { fontSize: SIZES.h1, fontFamily: "Cairo-Black", lineHeight: 36 },
  h2: { fontSize: SIZES.h2, fontFamily: "Cairo-Bold", lineHeight: 30 },
  h3: { fontSize: SIZES.h3, fontFamily: "Cairo-Bold", lineHeight: 22 },
  h4: { fontSize: SIZES.h4, fontFamily: "Cairo-Bold", lineHeight: 22 },
  body1: { fontSize: SIZES.body1, fontFamily: "Cairo-Regular", lineHeight: 36 },
  body2: { fontSize: SIZES.body2, fontFamily: "Cairo-Regular", lineHeight: 30 },
  body3: { fontSize: SIZES.body3, fontFamily: "Cairo-Regular", lineHeight: 22 },
  body4: { fontSize: SIZES.body4, fontFamily: "Cairo-Regular", lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
