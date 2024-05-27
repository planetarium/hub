import { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@/styles/globals.css";

const queryClient = new QueryClient();


function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
        <Layout tags={pageProps.tags || []}>
          <Component {...pageProps} />
        </Layout>
    </QueryClientProvider>
  );
}

export default App;
