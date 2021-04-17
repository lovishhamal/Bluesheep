import React, { useEffect, useState } from 'react';
import { getMyOrder, deleteMyOrder } from '../../../services/order-services';
import { getToken } from '../../../utils';
import jwt_decode from 'jwt-decode';
import './order.css';
import Swal from 'sweetalert2';

const MyOrder = (props) => {
  const [state, setstate] = useState([]);

  const confirm = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteMyOrder(id);
          setstate(state.filter((data) => data.itemId !== id));
          Swal.fire('Deleted!', 'Your order has been deleted.', 'success');
        } catch (error) {}
      }
    });
  };

  useEffect(() => {
    const fetch = async () => {
      const token = await getToken();
      const decode = jwt_decode(token);
      getMyOrder(decode.data.id)
        .then((data) => {
          if (data.status === 400) {
            setstate([]);
          } else {
            setstate(
              data.data.data.map((item) => {
                return {
                  ...item.food[0],
                  itemId: item.id,
                };
              })
            );
          }
        })
        .catch((err) => setstate([]));
    };
    fetch();
  }, []);

  const deleteRoom = async (id, roomid) => {
    try {
      confirm(id);
    } catch (error) {}
  };

  return state.length < 1 ? (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '40px',
        fontWeight: '700',
      }}
    >
      <h1>You dont have any Orders yet.</h1>
    </div>
  ) : (
    <div class="md:px-32 py-8 w-full mt-6">
      <div class="shadow overflow-hidden rounded border-b border-gray-200">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm heading">
                Food
              </th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm heading">
                Description
              </th>
              <th class="text-left py-3 px-3 uppercase font-semibold text-sm heading">
                Price
              </th>
              <th class="text-left py-3 px-3 uppercase font-semibold text-sm heading">
                Action
              </th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            {state.map((item) => (
              <>
                <tr>
                  <td class="text-left py-3 px-4 uppercase  heading">
                    {item.name}
                  </td>
                  <td class="text-left py-3 px-4  heading">
                    {item.description}
                  </td>
                  <td class="text-left py-3 px-4  heading">{item.price}</td>
                  <td class="text-left py-3 px-4 heading">
                    <button
                      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded"
                      onClick={() => deleteRoom(item.itemId)}
                    >
                      Delete
                    </button>
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

export default MyOrder;
