import { AppProps } from "next/app";
import Layout from "@/components/Layout";

import "@/styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout tags={pageProps.tags || []}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
