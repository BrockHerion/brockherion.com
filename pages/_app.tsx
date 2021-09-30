import PlausibleProvider from 'next-plausible';
import 'tailwindcss/tailwind.css';
import Layout from '../layout/Layout';

function MyApp({ Component, pageProps }) {
  return( 
    <PlausibleProvider domain='brockherion.dev'>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PlausibleProvider>
  );
}

export default MyApp;
