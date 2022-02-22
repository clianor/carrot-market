import { ReactElement } from 'react';
import Link from 'next/link';
import Layout from '../../components/layout';
import { NextPageWithLayout } from '../_app';
import FloatingButton from '../../components/floating-button';

const Live: NextPageWithLayout = () => {
  return (
    <div className="divide-y-[1px] space-y-4">
      {[1, 2, 3, 4, 5, 6].map((_, i) => {
        return (
          <Link key={i} href={`/live/${i}`}>
            <a className="pt-4 block  px-4">
              <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
              <h1 className="text-2xl mt-2 font-bold text-gray-900">Galaxy S50</h1>
            </a>
          </Link>
        );
      })}

      <FloatingButton href="/live/create">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          ></path>
        </svg>
      </FloatingButton>
    </div>
  );
};

Live.getLayout = (page: ReactElement) => {
  return (
    <Layout title="라이브" hasTabBar>
      {page}
    </Layout>
  );
};

export default Live;
