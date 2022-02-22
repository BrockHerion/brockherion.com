import type { AppProps } from "next/app";
import PlausibleProvider from "next-plausible";
import "../styles/global.css";

import Layout from "../components/layout/Layout";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="brockherion.dev">
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </PlausibleProvider>
  );
}

export default MyApp;
