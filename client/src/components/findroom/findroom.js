import React, { useState, useEffect } from 'react';
import { getFindRooms } from '../../services/room-service';
import Card from './card';

const Findroom = ({ data, modal }) => {
  const [state, setstate] = useState([]);
  const [match, setmatch] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const result = await getFindRooms(data);
      setstate(result.data.filter((item) => !item.match));
      setmatch(result.data.filter((item) => item.match));
      setloading(!loading);
    };

    fetch();
  }, []);

  return (
    <div
      class="fixed z-10 inset-0 overflow-y-auto"
      onClick={() => modal(false)}
    >
      <div class="flex flex-col items-end justify-center align-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          class="mt-2 lg:hidden md:hidden flex items-center justify-center rounded-full bg-white sm:mx-0 sm:h-10 sm:w-10"
          style={{
            backgroundColor: 'white',
            padding: 8,
            position: 'relative',
            zIndex: 100,
            marginBottom: 15,
          }}
          onClick={() => modal(false)}
        >
          <svg
            class="w-5 h-5 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>

        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="flex flex-col w-full h-full items-center justify-center">
          {state.length > 0 ? (
            <div
              class="w-11/12 h-screen mb-16 overflow-scroll inline-block align-bottom bg-white rounded-sm text-left overflow-hidden shadow-xl transform transition-all sm:mt-2"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <hr style={{ marginTop: '50px' }} />
              {match.length > 0 && (
                <h1
                  style={{
                    marginTop: 20,
                    fontSize: 25,
                    fontWeight: 'bold',
                  }}
                  className="flex w-full items-center justify-center"
                >
                  Best Matched Rooms
                </h1>
              )}
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {match.length > 0 &&
                  match.map((item, i) => <Card key={i} item={item} />)}
                <h1
                  style={{
                    marginTop: 20,
                    fontSize: 25,
                    fontWeight: 'bold',
                  }}
                  className="flex w-full items-center justify-center"
                >
                  Matched Rooms
                </h1>
                {state.map((item, i) => (
                  <Card key={i} item={item} />
                ))}
              </div>
            </div>
          ) : (
            !loading && (
              <div
                class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        class="w-6 h-6 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        class="text-lg leading-6 font-medium text-gray-900 capitalize"
                        id="modal-headline"
                      >
                        Not Found
                      </h3>
                      <div class="mt-2">
                        <p class="text-sm leading-5 text-gray-500 capitalize">
                          Romm is not available on this date.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button
                      type="button"
                      class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      onClick={() => modal(false)}
                    >
                      Cancel
                    </button>
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Findroom;
