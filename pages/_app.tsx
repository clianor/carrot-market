import usePWA from '@libs/client/usePWA';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Image from 'next/image';
import type { ReactElement, ReactNode } from 'react';
import { useEffect, useState } from 'react';
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
  const [popup, setPopup] = useState(false);
  const [notVisiblePopup, setNotVisiblePopup] = useState(false);
  const { isInstalled, canInstall, showInstallPrompt } = usePWA();

  console.log({ isInstalled, canInstall, showInstallPrompt });

  const onClickInstallPWA = () => {
    showInstallPrompt();
  };

  const onCloseModal = () => {
    setPopup(false);
    localStorage.setItem('notVisiblePopup', '');
  };

  useEffect(() => {
    setNotVisiblePopup(localStorage.getItem('notVisiblePopup') !== null);
  }, []);

  useEffect(() => {
    if (!notVisiblePopup && !isInstalled && canInstall) {
      setPopup(true);
    }
  }, [canInstall, isInstalled, notVisiblePopup]);

  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((response) => response.json()),
      }}
    >
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Carrot Market</title>

        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#18b84e" />
      </Head>
      <div className="mx-auto w-full max-w-xl">{getLayout(<Component {...pageProps} />)}</div>

      {popup && (
        <div className="fixed w-full max-w-md bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-slate-300 rounded-lg p-4">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-24 bg-slate-500 rounded overflow-hidden">
            <Image src="/icons/icon.png" alt="logo" layout="fill" objectFit="cover" />
          </div>
          <div className="flex flex-row-reverse">
            <svg
              className="w-6 h-6 cursor-pointer hover:text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={onCloseModal}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>

          <div className="flex flex-col text-center gap-2 mt-12">
            <h1 className="font-bold text-xl font-mono">Install Carrot Market</h1>
            <p>
              Install this application on your home screen for quick and easy access when you’re on
              the go.
            </p>
            <div className="flex gap-3 border-t border-slate-300 mt-5 pt-5">
              <button
                className="flex-1 px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-500"
                onClick={onClickInstallPWA}
              >
                Install
              </button>
              <button
                className="flex-1 px-4 py-2 bg-slate-100 text-slate-900 rounded hover:bg-slate-500 hover:text-white"
                onClick={onCloseModal}
              >
                Not right now
              </button>
            </div>
          </div>
        </div>
      )}
    </SWRConfig>
  );
}

export default MyApp;
