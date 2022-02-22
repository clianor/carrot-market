import Input from '@components/input';
import TextArea from '@components/textarea';
import Button from '@components/button';
import { NextPageWithLayout } from '../_app';
import Layout from '@components/layout';

const Create: NextPageWithLayout = () => {
  return (
    <form className=" space-y-4 py-10 px-4">
      <Input required label="Name" name="name" type="text" />
      <Input required label="Price" placeholder="0.00" name="price" type="text" kind="price" />
      <TextArea name="description" label="Description" />
      <Button text="Go live" />
    </form>
  );
};

Create.getLayout = (page) => {
  return (
    <Layout title="Go Live" canGoBack>
      {page}
    </Layout>
  );
};

export default Create;
