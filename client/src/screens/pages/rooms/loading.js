import React from 'react';
import Colors from '../../../colors/colors';

export default function loading() {
  return (
    <div
      className="w-screen h-screen"
      style={{ backgroundColor: Colors.backgroundColor }}
    >
      <div className="flex relative py-16 h-screen">
        <p className="">Loading Rooms</p>
        <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-10 w-10"></div>
      </div>
    </div>
  );
}
