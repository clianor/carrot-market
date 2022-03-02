import Layout from '@components/layout';
import ProductList from '@components/product-list';
import { NextPageWithLayout } from '../_app';

const Bought: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col space-y-5 pb-10  divide-y">
      <ProductList kind="purchases" />
    </div>
  );
};

Bought.getLayout = (page) => {
  return (
    <Layout title="구매내역" canGoBack>
      {page}
    </Layout>
  );
};

export default Bought;
