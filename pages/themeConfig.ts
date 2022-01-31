import { createGlobalStyle } from "styled-components"

export const lightTheme = {
  colorBackgroundPrimary: '',
  colorBackgroundSecondary:'',
  colorTextPrimary: '',
  colorTextSecondary: '',
  colorButtonPrimary:'',
  colorButtonSecondary:'',
}

export const darkTheme = {
  colorBackgroundPrimary: '',
  colorBackgroundSecondary:'',
  colorTextPrimary: '',
  colorTextSecondary: '',
  colorButtonPrimary:'',
  colorButtonSecondary:'',
}

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({theme}) =>theme.colorBackgroundPrimary};
    color: ${({theme}) => theme.colorTextPrimary};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.5s ease-in-out;
  }
`