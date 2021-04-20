import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ item }) => {
  return (
    <>
      <div class="sm:flex sm:items-start mt-3">
        <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
          <svg
            class="w-6 h-6 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3
            class="text-lg leading-6 font-medium text-gray-900 capitalize"
            id="modal-headline"
          >
            {item.roomname}
          </h3>
          <div class="mt-2">
            <p class="text-sm leading-5 text-gray-500 capitalize">
              {item.description}
            </p>
          </div>
          <div class="mt-2">
            <p class="text-sm leading-5 text-gray-500 capitalize">
              Extra: {item.extra}
            </p>
          </div>
          <div class="mt-2">
            <p class="text-sm leading-5 text-gray-500 capitalize">
              Price: Rs {item.price}
            </p>
          </div>
        </div>
      </div>
      <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <Link
          class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto"
          to={`/roomdetail/${item.id}`}
        >
          <button
            type="button"
            class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          >
            Book Now
          </button>
        </Link>
      </div>
      <hr style={{ width: '92%', marginLeft: '5%' }} />
      <span className="mt-2" />
    </>
  );
};

export default Card;
