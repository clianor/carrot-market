import Layout from '@components/layout';
import Message from '@components/message';
import { NextPageWithLayout } from '../_app';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Stream } from '@prisma/client';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';

interface StreamResponse {
  ok: true;
  stream: Stream;
}

interface MessageForm {
  message: string;
}

const Stream: NextPageWithLayout = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const { data } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null,
  );
  const [sendMessage, { loading, data: sendMessageData }] = useMutation(
    `/api/streams/${router.query.id}/messages`,
  );

  const onValid = (form: MessageForm) => {
    if (loading) return;
    reset();
    sendMessage(form);
  };

  return (
    <div className="space-y-4 py-10  px-4">
      <div className="aspect-video w-full rounded-md bg-slate-300 shadow-sm" />
      <div className="mt-5">
        <h1 className="text-3xl font-bold text-gray-900">{data?.stream?.name}</h1>
        <span className="mt-3 block text-2xl text-gray-900">${data?.stream?.price}</span>
        <p className=" my-6 text-gray-700">{data?.stream?.description}</p>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
        <div className="h-[50vh] space-y-4 overflow-y-scroll py-10  px-4 pb-16">
          <Message message="Hi how much are you selling them for?" />
          <Message message="I want ￦20,000" reversed />
          <Message message="미쳤어" />
        </div>
        <div className="fixed inset-x-0 bottom-0  bg-white py-2">
          <form
            className="relative mx-auto flex w-full  max-w-md items-center"
            onSubmit={handleSubmit(onValid)}
          >
            <input
              type="text"
              className="w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              {...register('message', { required: true })}
            />
            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
              <button className="flex items-center rounded-full bg-orange-500 px-3 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                &rarr;
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Stream.getLayout = (page) => {
  return <Layout canGoBack>{page}</Layout>;
};

export default Stream;
