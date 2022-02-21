import type { NextPage } from 'next';

const Create: NextPage = () => {
  return (
    <div className="px-4 py-10 space-y-5">
      <div>
        <label className="text-sm font-medium text-gray-700">
          Name
          <input
            type="text"
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                       placeholder-gray-400 focus:outline-none focus:ring-orange-500
                       focus:border-orange-500 pl-7"
          />
        </label>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700" htmlFor="price">
          Price
        </label>
        <div className="rounded-md relative shadow-sm flex items-center">
          <div className="absolute left-0 pointer-events-none pl-3 flex items-center justify-center">
            <span className="text-gray-500 text-sm">$</span>
          </div>
          <input
            id="price"
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                       placeholder-gray-400 focus:outline-none focus:ring-orange-500
                       focus:border-orange-500 pl-7"
            type="text"
            placeholder="0.00"
          />
          <div className="absolute right-0 pointer-events-none pr-3 flex items-center">
            <span className="text-gray-500 text-sm">USD</span>
          </div>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Description</label>
        <div>
          <textarea
            className="mt-1 shadow-sm w-full focus:ring-orange-500 focus:border-orange-500 rounded-md
                       border-gray-300"
            rows={4}
          />
        </div>
      </div>
      <button
        className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border
                   border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2
                   focus:ring-offset-2 focus:ring-orange-500 focus:outline-none"
      >
        Go live
      </button>
    </div>
  );
};

export default Create;