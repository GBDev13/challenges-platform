import type { AppProps } from "next/app";
import { GlobalStyles } from "../styles/global";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <GlobalStyles />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
