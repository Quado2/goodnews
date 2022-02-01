import { createGlobalStyle } from "styled-components"

export const lightTheme = {
  colorBackgroundPrimary: '#fff',
  colorBackgroundSecondary:'',
  colorTextPrimary: '#0070f3',
  colorTextSecondary: '',
  colorButtonPrimary:'',
  colorButtonSecondary:'',
}

export const darkTheme = {
  colorBackgroundPrimary: '#010e08;',
  colorBackgroundSecondary:'',
  colorTextPrimary: '#1fe5ff',
  colorTextSecondary: '',
  colorButtonPrimary:'',
  colorButtonSecondary:'',
}

export const GlobalStyles = createGlobalStyle`


*{
  font-family: 'Murecho', 'sans-serif';
}
`
