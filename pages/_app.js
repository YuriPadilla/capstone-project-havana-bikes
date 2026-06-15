import GlobalStyle from "@/styles";
import Head from "next/head";
import Layout from "../components/Layout";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
import VisitTracker from "@/components/VisitTracker";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Capstone Project</title>
      </Head>
      <SessionProvider session={session}>
        <VisitTracker />
        <SWRConfig value={{ fetcher }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </SessionProvider>
    </>
  );
}
