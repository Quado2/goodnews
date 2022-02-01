import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import Layout from "../components/layout/Layout";
import { darkTheme, lightTheme, } from "./themeConfig";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>

    </ThemeProvider>
  );
}

export default MyApp;

