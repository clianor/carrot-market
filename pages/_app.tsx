import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import type { ReactElement, ReactNode } from 'react';
import { SWRConfig } from 'swr';
import '../styles/globals.css';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((response) => response.json()),
      }}
    >
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/*<meta*/}
        {/*  name="viewport"*/}
        {/*  content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1"*/}
        {/*/>*/}
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Carrot Market</title>
      </Head>
      <div className="mx-auto w-full max-w-xl">{getLayout(<Component {...pageProps} />)}</div>
    </SWRConfig>
  );
}

export default MyApp;
