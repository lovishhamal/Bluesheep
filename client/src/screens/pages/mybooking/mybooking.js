import React, { useEffect, useState } from 'react';
import { getBooking } from '../../../services/room-service';
import { getToken } from '../../../utils';
import jwt_decode from 'jwt-decode';

const Mybooking = (props) => {
  const [state, setstate] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const token = await getToken();
      const decode = jwt_decode(token);
      getBooking(decode.data.id)
        .then((data) => {
          if (data.status === 400) {
            setstate([]);
          } else {
            setstate(data);
          }
        })
        .catch((err) => setstate([]));
    };
    fetch();
  }, []);
  return state.length < 1 ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>You dont have any bookings yet.</h1>
    </div>
  ) : (
    <div class="md:px-32 py-8 w-full mt-6">
      <div class="shadow overflow-hidden rounded border-b border-gray-200">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                Room No.
              </th>
              <th class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                Room Name
              </th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                Date
              </th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                Action
              </th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            {state.data.map((item) => (
              <>
                <tr>
                  <td class="w-1/3 text-left py-3 px-4">{item.roomno}</td>
                  <td class="w-1/3 text-left py-3 px-4">{item.roomname}</td>
                  <td class="text-left py-3 px-4">
                    <a class="hover:text-blue-500" href="tel:622322662">
                      {item.capacity}
                    </a>
                  </td>
                  <td class="text-left py-3 px-4">
                    <a
                      class="hover:text-blue-500"
                      href="mailto:jonsmith@mail.com"
                    >
                      {item.bed}
                    </a>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mybooking;
