import React, { useContext } from 'react';
import { Context } from '../../../context';
import RoomFilter from './room-filter';
import RoomList from './rooms-list';
import Loading from './loading';
import Colors from '../../../colors/colors';

export default function Roomcontainer() {
  const state = useContext(Context);

  if (state.loading) {
    return <Loading />;
  } else {
    return (
      <div
        className="w-screen sm:w-1/2 lg:w-screen lg:h-screen"
        style={{ backgroundColor: Colors.backgroundColor }}
      >
        <RoomFilter data={state} />
        {state.rooms.length < 1 ? (
          <div className="flex justify-center items-center">
            <p className="tracking-wide text-5xl uppercase text-sm font-bold text-gray-700 mt-10">
              NO ROOM MATCH FOUND
            </p>
          </div>
        ) : (
          <RoomList data={state.rooms} />
        )}
      </div>
    );
  }
}
