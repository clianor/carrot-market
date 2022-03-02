import Layout from '@components/layout';
import ProductList from '@components/product-list';
import { NextPageWithLayout } from '../_app';

const Sold: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col space-y-5 pb-10  divide-y">
      <ProductList kind="sales" />
    </div>
  );
};

Sold.getLayout = (page) => (
  <Layout title="판매내역" canGoBack>
    {page}
  </Layout>
);

export default Sold;
