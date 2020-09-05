import React, { useState } from 'react';
import axios from 'axios';
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
        <div
          class="mt-0 mx-auto max-w-max-w-screen-xl justify-evenly pt-20 flex flex-row"
          style={{ height: '73vh' }}
        >
          <div class="text-center self-center">
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
            ></img>
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
