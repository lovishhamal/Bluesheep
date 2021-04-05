import React, { useState, useEffect } from 'react';
import { getToken } from '../../../utils';
import jwt_decode from 'jwt-decode';

import './style.css';
import Card from './card';

export default function RoomsPricing({ data, setvalue }) {
  const [state, setstate] = useState(null);
  useEffect(() => {
    const set = () => {
      const user = getToken();
      const decode = user && jwt_decode(user);
      user && setstate(decode.data?.id);
    };

    set();
  }, []);
  return (
    <div class="flex flex-row flex-wrap w-screen h-full justify-center">
      {data.map((val) => (
        <Card item={val} setvalue={setvalue} id={state} />
      ))}
    </div>
  );
}
