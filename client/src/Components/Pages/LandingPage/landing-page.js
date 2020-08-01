import React, { useState } from 'react';
import Colors from '../../../colors/colors';
import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';
import Select from 'react-select';

export default function Landingpage() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  return (
    <div>
      <section
        className="w-full h-screen"
        style={{ backgroundColor: Colors.backgroundcolor }}
      >
        <div class="mt-0 mx-auto max-w-max-w-screen-xl pt-20">
          <div class="text-center">
            <h2 class="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
              Welcome To Hotel
              <br />
              <span style={{ color: Colors.primaryColor }}>BlueSheep Inn</span>
            </h2>
            <p className="mt-3 max-w-md mx-auto text-base text-grey-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Get the best hotel experience in the town.
            </p>
          </div>
        </div>
        <div className="pt-64 flex items-center justify-center">
          <div class="px-4 flex items-center justify-start py-6 bg-white shadow-lg rounded-lg w-10/12 h-24">
            <div class="w-2/5">
              <RangeDatePicker
                startDate={new Date(2020, 0, 15)}
                endDate={new Date(2020, 1, 1)}
              />
            </div>
            <div class="w-full md:w-1/3 px-10 ml-10  mb-6 md:mb-0">
              <div class="relative">
                <select
                  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-5 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                >
                  <option>New Mexico</option>
                  <option>Missouri</option>
                  <option>Texas</option>
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
            <div>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 ml-20 rounded shadow-lg">
                Find Rooms
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </section>
    </div>
  );
}
