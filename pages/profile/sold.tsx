import { NextPageWithLayout } from '../_app';
import Item from '../../components/item';
import Layout from '../../components/layout';

const Sold: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col space-y-5 pb-10  divide-y">
      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
        <Item id={i} key={i} title="iPhone 14" price={99} comments={1} hearts={1} />
      ))}
    </div>
  );
};

Sold.getLayout = (page) => (
  <Layout title="판매내역" canGoBack>
    {page}
  </Layout>
);

export default Sold;
