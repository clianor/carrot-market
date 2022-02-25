import Item from '@components/item';
import Layout from '@components/layout';
import { NextPageWithLayout } from '../_app';

const Loved: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col space-y-5 pb-10  divide-y">
      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
        <Item key={i} id={i} title="iPhone 14" price={99} hearts={1} />
      ))}
    </div>
  );
};

Loved.getLayout = (page) => (
  <Layout title="관심목록" canGoBack>
    {page}
  </Layout>
);

export default Loved;
