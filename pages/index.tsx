import useUser from '@libs/client/useUser';
import Head from 'next/head';
import { ReactElement } from 'react';
import FloatingButton from '../components/floating-button';
import Item from '../components/item';
import Layout from '../components/layout';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const { data, isLoading } = useUser();
  console.log(data, isLoading);

  return (
    <div className="flex flex-col space-y-5 divide-y">
      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
        <Item id={i} key={i} title="iPhone 14" price={99} comments={1} hearts={1} />
      ))}
      <FloatingButton href="/products/upload">
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </FloatingButton>
    </div>
  );
};

Home.getLayout = (page: ReactElement) => {
  return (
    <Layout title="홈" hasTabBar>
      <Head>
        <title>Home</title>
      </Head>
      {page}
    </Layout>
  );
};

export default Home;
