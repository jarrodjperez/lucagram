import Head from "next/head";
import { Provider } from "next-auth/client";
import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>Lucagram</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Toaster />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
