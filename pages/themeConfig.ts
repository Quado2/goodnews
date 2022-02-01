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
@import url('https://fonts.googleapis.com/css2?family=Murecho:wght@100;200;300;400;500;600;700;800;900&display=swap');

*{
  font-family: 'Murecho', 'sans-serif';
}
`
