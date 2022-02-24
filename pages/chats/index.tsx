import Layout from '@components/layout';
import Link from 'next/link';
import { NextPageWithLayout } from '../_app';

const Chats: NextPageWithLayout = () => {
  return (
    <div className="divide-y-[1px]">
      {[1, 1, 1, 1, 1, 1].map((_, i) => {
        return (
          <Link href={`/chats/${i}`} key={i}>
            <a className="flex px-4 cursor-pointer py-3 items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-slate-300" />
              <div>
                <p className="text-gray-700">Steve Jebs</p>
                <p className="text-sm  text-gray-500">See you tomorrow in the corner at 2pm!</p>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};

Chats.getLayout = (page) => {
  return (
    <Layout title="채팅" hasTabBar>
      {page}
    </Layout>
  );
};

export default Chats;
