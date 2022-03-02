import Layout from '@components/layout';
import ProductList from '@components/product-list';
import { NextPageWithLayout } from '../_app';

const Loved: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col space-y-5 pb-10  divide-y">
      <ProductList kind="favs" />
    </div>
  );
};

Loved.getLayout = (page) => (
  <Layout title="관심목록" canGoBack>
    {page}
  </Layout>
);

export default Loved;
