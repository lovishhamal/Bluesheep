import React, { useState } from 'react';
import Colors from '../../../colors/colors';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import img from '../landing-page/hotel.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

function valuetext(value) {
  return `${value}°C`;
}

export default function RoomsPricing() {
  const classes = useStyles();
  const [isMobileView, setisMobileView] = useState(false);

  let mobileView = 'bar';
  if (isMobileView) {
    mobileView = 'mobile-bar';
  }

  return (
    <div
      className="w-screen h-full"
      style={{ backgroundColor: Colors.backgroundColor }}
    >
      <div className="z-40 pt-10 flex items-center justify-center">
        <div class="px-10 py-2 bg-white shadow-lg rounded-lg w-9/12">
          <div className={mobileView}>
            <div class="w-full px-3 mb-6 md:mb-0 item mr-10">
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
            <div class="w-full px-3 mb-6 md:mb-0 mr-10 item">
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
            <div
              className={classes.root}
              style={{
                width: '100%',
              }}
            >
              <Typography id="discrete-slider-always" gutterBottom>
                Price (In thousand)
              </Typography>
              <Slider
                defaultValue={100}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-always"
                step={10}
                marks={marks}
                valueLabelDisplay="on"
                style={{ color: '#168afd' }}
              />
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
      <div class="flex flex-row flex-wrap">
        <div class="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-6 px-8">
          <div class="bg-white shadow-xl rounded-lg overflow-hidden">
            <div class="bg-cover bg-center h-56 p-2">
              <div class="flex justify-end w-full h-full">
                <img class="rounded" src={img}></img>
              </div>
            </div>
            <div class="p-4">
              <p class="tracking-wide text-sm font-bold text-gray-700">
                SINGLE ROOM
              </p>
              <p class="text-3xl text-gray-900">Rs. 800</p>
              <p class="text-gray-700">Break fast included</p>
            </div>
            <div class="flex p-4 border-t border-gray-300 text-gray-700">
              <div class="flex-1 inline-flex items-center">
                <svg
                  class="h-6 w-6 text-gray-600 fill-current mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 16L3 5V1a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v4l3 11v5a1 1 0 0 1-1 1v2h-1v-2H2v2H1v-2a1 1 0 0 1-1-1v-5zM19 5h1V1H4v4h1V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h2V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1zm0 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V6h-2v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6H3.76L1.04 16h21.92L20.24 6H19zM1 17v4h22v-4H1zM6 4v4h4V4H6zm8 0v4h4V4h-4z"></path>
                </svg>
                <p>
                  <span class="text-gray-900 font-bold">3</span> Bedrooms
                </p>
              </div>
              <div class="flex-1 inline-flex items-center">
                <svg
                  class="h-6 w-6 text-gray-600 fill-current mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M17.03 21H7.97a4 4 0 0 1-1.3-.22l-1.22 2.44-.9-.44 1.22-2.44a4 4 0 0 1-1.38-1.55L.5 11h7.56a4 4 0 0 1 1.78.42l2.32 1.16a4 4 0 0 0 1.78.42h9.56l-2.9 5.79a4 4 0 0 1-1.37 1.55l1.22 2.44-.9.44-1.22-2.44a4 4 0 0 1-1.3.22zM21 11h2.5a.5.5 0 1 1 0 1h-9.06a4.5 4.5 0 0 1-2-.48l-2.32-1.15A3.5 3.5 0 0 0 8.56 10H.5a.5.5 0 0 1 0-1h8.06c.7 0 1.38.16 2 .48l2.32 1.15a3.5 3.5 0 0 0 1.56.37H20V2a1 1 0 0 0-1.74-.67c.64.97.53 2.29-.32 3.14l-.35.36-3.54-3.54.35-.35a2.5 2.5 0 0 1 3.15-.32A2 2 0 0 1 21 2v9zm-5.48-9.65l2 2a1.5 1.5 0 0 0-2-2zm-10.23 17A3 3 0 0 0 7.97 20h9.06a3 3 0 0 0 2.68-1.66L21.88 14h-7.94a5 5 0 0 1-2.23-.53L9.4 12.32A3 3 0 0 0 8.06 12H2.12l3.17 6.34z"
                  ></path>
                </svg>
                <p>
                  <span class="text-gray-900 font-bold">2</span> Bathrooms
                </p>
              </div>
            </div>
            <div class="px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100 flex justify-around">
              <div class="text-xs uppercase font-bold text-gray-600 tracking-wide">
                show details
              </div>
              <div class="text-xs uppercase font-bold text-gray-600 tracking-wide">
                book now
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
