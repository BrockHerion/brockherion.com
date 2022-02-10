import type { AppProps } from "next/app";
import PlausibleProvider from "next-plausible";
import "../styles/global.css";
import Layout from "../layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="brockherion.dev">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PlausibleProvider>
  );
}

export default MyApp;
