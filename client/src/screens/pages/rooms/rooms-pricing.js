import React, { useState, useContext } from 'react';
import Colors from '../../../colors/colors';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import './style.css';
import Card from './card';
import { Context } from '../../../context';

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
  const { rooms } = useContext(Context);
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
      <div className="z-40 pt-12 flex items-center justify-center">
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
      <div class="flex flex-row flex-wrap w-screen">
        {rooms.length > 0 ? (
          rooms.map((val) => <Card item={val} />)
        ) : (
          <div class="spinner">
            <p>Loading Rooms</p>
            <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-10 w-10"></div>
          </div>
        )}
      </div>
    </div>
  );
}
