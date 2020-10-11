import React, { useState } from 'react';
import Colors from '../../../colors/colors';
import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';
import './landing.css';
import img from './landing.jpg';

export default function Landingpage() {
  const date = new Date();
  const tomorrow = new Date(date.getTime());
  tomorrow.setDate(date.getDate() + 1);

  const [isMobileView, setisMobileView] = useState(false);

  let mobileView = 'bar';
  if (isMobileView) {
    mobileView = 'mobile-bar';
  }

  return (
    <div>
      <section className="w-full h-screen z-10">
        <div className="landing pt-20" style={{ height: '73vh' }}>
          <div class="text-center self-center">
            <div className="flex flex-row justify-center mb-5">
              <svg
                class="w-6 h-6"
                fill="orange"
                stroke="orange"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                ></path>
              </svg>
              <span className="-m-10"></span>
              <svg
                class="w-6 h-6"
                fill="orange"
                stroke="orange"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                ></path>
              </svg>
              <span className="-m-10"></span>
              <svg
                class="w-6 h-6"
                fill="orange"
                stroke="orange"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                ></path>
              </svg>
            </div>
            <h2 class="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
              Welcome To Hotel
              <br />
              <span style={{ color: Colors.primaryColor }}>BlueSheep Inn</span>
            </h2>
            <p className="mt-3 max-w-md mx-auto text-base text-grey-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Get the best hotel experience in the town.
            </p>
          </div>
          <div className="text-center self-center">
            <img
              src={img}
              style={{
                height: 'auto',
                width: '700px',
              }}
            />
          </div>
        </div>
        <div className="z-40 pt-0 flex items-center justify-center">
          <div class="px-10 py-4 bg-white shadow-2xl rounded-lg w-10/12">
            <div className={mobileView}>
              <div>
                <RangeDatePicker startDate={date} endDate={tomorrow} />
              </div>
              <div class="w-full px-3 mb-6 md:mb-0 item">
                <div class="relative">
                  <select
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-4 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                  >
                    <option>Single Room</option>
                    <option>Double Room</option>
                    <option>Triple Room</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="w-full px-3 mb-6 md:mb-0 item">
                <div class="relative">
                  <select
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-4 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                  >
                    <option>Guests</option>
                    <option>1</option>
                    <option>2</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mobile-footer">
                <button class="bg-blue-500 ml-10 hover:bg-blue-700 text-white text-xs font-bold py-3 px-6 rounded shadow-lg item">
                  Find Rooms
                </button>
                {isMobileView && (
                  <button
                    class="bg-blue-500 ml-10 hover:bg-blue-700 text-white text-xs font-bold py-3 px-3 rounded shadow-lg item"
                    onClick={() => setisMobileView(!isMobileView)}
                  >
                    Cancle
                  </button>
                )}
              </div>
            </div>
            <div className="mobile-view">
              {!isMobileView && (
                <div>
                  <div
                    className="flex justify-center items-center text-lg tracking-tight cursor-pointer leading-10 font-extrabold sm:text-3xl sm:leading-none md:text-3xl"
                    onClick={() => setisMobileView(!isMobileView)}
                  >
                    Find Rooms
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
