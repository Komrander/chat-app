import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import Head from 'next/head';

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      <Head>
        
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
