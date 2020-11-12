import React from 'react';

import './style.css';
import Card from './card';

export default function RoomsPricing({ data, setvalue }) {
  return (
    <div class="flex flex-row flex-wrap w-screen h-full justify-center">
      {data.map((val) => (
        <Card item={val} setvalue={setvalue} />
      ))}
    </div>
  );
}
