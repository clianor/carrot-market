import TextArea from '@components/textarea';
import Button from '@components/button';
import { NextPageWithLayout } from '../_app';
import Layout from '@components/layout';

const Write: NextPageWithLayout = () => {
  return (
    <form className="p-4 space-y-4">
      <TextArea required placeholder="Ask a question!" />
      <Button text="Submit" />
    </form>
  );
};

Write.getLayout = (page) => {
  return (
    <Layout title="Write Post" canGoBack>
      {page}
    </Layout>
  );
};

export default Write;
