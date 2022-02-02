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
  colorBackgroundPrimary: "#010e08;",
  colorBackgroundSecondary: "",
  colorTextPrimary: "#1fe5ff",
  colorTextHover: "#0b9aad",
  colorTextSecondary: "",
  colorButtonPrimary: "",
  colorButtonSecondary: "",
  mobile,
  tablet,
};

export default function nothingToshow() {
  return <></>;
}
