import { createGlobalStyle } from "styled-components";
 const mobile = '480px'
 const tablet = "760px"

export const lightTheme = {
  colorBackgroundPrimary: "#fff",
  colorBackgroundSecondary: "",
  colorTextPrimary: "#0070f3",
  colorTextSecondary: "",
  colorButtonPrimary: "",
  colorButtonSecondary: "",
  mobile,
  tablet,
};

export const darkTheme = {
  colorBackgroundPrimary: "#0A0C10",
  colorBackgroundSecondary: "#191a1d",
  colorTextPrimary: "#71B7FF",
  colorPrimaryMuted: "#4b7aa8",
  colorTextSecondary: "#fdfdfd",
  colorSecondaryMuted: "#d3d4d4",
  colorButtonPrimary: "#E5861F",
  colorButtonMuted: "#a86216",
  colorBorderPrimary: "#333",
  mobile,
  tablet,
};

export default function nothingToshow() {
  return <></>;
}
