import FloatingButton from '@components/floating-button';
import Item from '@components/item';
import Layout from '@components/layout';
import useUser from '@libs/client/useUser';
import { Product } from '@prisma/client';
import Head from 'next/head';
import useSWR from 'swr';
import { NextPageWithLayout } from './_app';

export interface ProductWithCount extends Omit<Product, 'image'> {
  image?: string;
  _count: {
    favs: number;
  };
}

interface ProductsResponse {
  ok: boolean;
  products: ProductWithCount[];
}

const Home: NextPageWithLayout = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<ProductsResponse>('/api/products');

  return (
    <div className="flex flex-col space-y-5 divide-y">
      {data?.products?.map((product) => (
        <Item
          id={product.id}
          key={product.id}
          image={product.image}
          title={product.name}
          price={product.price}
          hearts={product._count.favs}
        />
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
        <span className="sr-only">Create Product</span>
      </FloatingButton>
    </div>
  );
};

Home.getLayout = (page) => {
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
