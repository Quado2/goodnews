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
  colorBackgroundPrimary: "#010e08",
  colorBackgroundSecondary: "#1725256b",
  colorTextPrimary: "#1fe5ff",
  colorTextMuted: "#1594a5",
  colorTextSecondary: "grey",
  colorButtonPrimary: "#e379f8",
  colorButtonSecondary: "",
  mobile,
  tablet,
};

export default function nothingToshow() {
  return <></>;
}
