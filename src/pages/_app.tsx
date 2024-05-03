import { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AccountProvider } from "@/context/AccountContext";
import Layout from "@/components/Layout";

import "@/styles/globals.css";

const client = new ApolloClient({
  uri: "https://9c-internal-rpc-1.nine-chronicles.com/graphql",
  cache: new InMemoryCache(),
});

function App({ Component, pageProps }: AppProps) {
  return (
    <AccountProvider>
      <ApolloProvider client={client}>
        <Layout tags={pageProps.tags || []}>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </AccountProvider>
  );
}

export default App;
