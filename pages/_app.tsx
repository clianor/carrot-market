import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { Page } from '../types/page';
import type { ReactElement } from 'react';

interface MyAppProps extends AppProps {
  Component: Page;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout || ((page: ReactElement) => page);
  return getLayout(
    <div className="w-full max-w-xl mx-auto">
      <Component {...pageProps} />
    </div>,
  );
}

export default MyApp;
