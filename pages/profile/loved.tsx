import { NextPageWithLayout } from '../_app';
import Item from '../../components/item';
import Layout from '../../components/layout';

const Loved: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col space-y-5 pb-10  divide-y">
      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
        <Item key={i} id={i} title="iPhone 14" price={99} comments={1} hearts={1} />
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
