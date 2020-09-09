import React, { useState, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import './style.css';

import { Context } from '../../../context';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

function valuetext(value) {
  return `Rs ${value}`;
}

function getUnique(items, value) {
  if (value === 'capacity') {
    return [1, ...new Set(items.map((item) => item[value]))];
  }
  return ['All', ...new Set(items.map((item) => item[value]))];
}

export default function RoomsPricing({ data }) {
  const classes = useStyles();
  const { allRooms, minPrice, midPrice, maxPrice } = data;
  const { onChangePrice, handleChange } = useContext(Context);
  const [isMobileView, setisMobileView] = useState(false);
  const rooms = getUnique(allRooms, 'roomname');
  const capacity = getUnique(allRooms, 'capacity');

  let mobileView = 'bar';
  if (isMobileView) {
    mobileView = 'mobile-bar';
  }

  return (
    <div className="z-40 pt-12 flex items-center justify-center">
      <div class="px-10 py-2 bg-white shadow-lg rounded-lg w-9/12">
        <div className={mobileView}>
          <div class="w-full px-3 mb-6 md:mb-0 item mr-10">
            <div class="relative">
              <p class="tracking-wide uppercase text-sm font-bold text-gray-700">
                Rooms
              </p>
              <select
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-4 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                onChange={handleChange}
                name="guest"
              >
                {rooms.map((item) => (
                  <option>{item}</option>
                ))}
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
              <p class="tracking-wide uppercase text-sm font-bold text-gray-700">
                Guest
              </p>
              <select
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-4 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                onChange={handleChange}
                name="capacity"
              >
                {capacity.map((item) => (
                  <option>{item}</option>
                ))}
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
            <p class="tracking-wide uppercase text-sm font-bold text-gray-700">
              Price
            </p>
            <Slider
              defaultValue={maxPrice}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider-always"
              step={200}
              min={minPrice}
              max={maxPrice}
              name="price"
              valueLabelDisplay="on"
              style={{ color: '#168afd' }}
              onChange={onChangePrice}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p class="tracking-wide uppercase text-sm font-bold text-gray-700">
                Rs {minPrice}
              </p>
              <p class="tracking-wide uppercase text-sm font-bold text-gray-700">
                Rs {midPrice}
              </p>
              <p class="tracking-wide uppercase text-sm font-bold text-gray-700">
                Rs {maxPrice}
              </p>
            </div>
          </div>
        </div>
        <div className="mobile-view">
          {!isMobileView && (
            <div>
              <div
                className="flex justify-center items-center text-lg tracking-tight cursor-pointer leading-10 font-extrabold sm:text-3xl sm:leading-none md:text-3xl"
                onClick={() => setisMobileView(!isMobileView)}
              >
                Filter Rooms
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
