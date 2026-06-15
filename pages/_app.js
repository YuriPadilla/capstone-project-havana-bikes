import GlobalStyle from "@/styles";
import Head from "next/head";
import Layout from "../components/Layout";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { trackVisit } from "@/utils/trackVisit";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady || router.asPath.startsWith("/admin")) {
      return;
    }

    trackVisit();
  }, [router.asPath, router.isReady]);

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Capstone Project</title>
      </Head>
      <SessionProvider session={session}>
        <SWRConfig value={{ fetcher }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </SessionProvider>
    </>
  );
}
