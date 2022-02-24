import Button from '@components/button';
import Layout from '@components/layout';
import TextArea from '@components/textarea';
import useMutation from '@libs/client/useMutation';
import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NextPageWithLayout } from '../_app';

interface WriteForm {
  question: string;
}

interface WriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPageWithLayout = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [post, { loading, data }] = useMutation<WriteResponse>('/api/posts');

  const onValid = (data: WriteForm) => {
    if (loading) return;
    post(data);
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);

  return (
    <form className="p-4 space-y-4" onSubmit={handleSubmit(onValid)}>
      <TextArea
        register={register('question', { required: true, minLength: 5 })}
        required
        placeholder="Ask a question!"
      />
      <Button text={loading ? 'Loading' : 'Submit'} />
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
