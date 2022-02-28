import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import Layout from "../components/layout/Layout";
import { darkTheme, lightTheme } from "./themeConfig";
import ContextProvider from "../context/Context";

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({ uri: "/api" });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("nekot");

  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

export const client2 = new ApolloClient({
  uri: 'http://localhost:3000/api',
  cache: new InMemoryCache()
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {

  

  return (
    <ContextProvider>
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
    </ContextProvider>
  );
}

export default MyApp;
