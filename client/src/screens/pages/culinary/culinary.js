import React, { useEffect, useState } from 'react';
import { addOrder } from '../../../services/order-services';
import { getFood } from '../../../services/food';
import decode from 'jwt-decode';
import Swal from 'sweetalert2';

const errors = (error) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  });

  Toast.fire({
    icon: 'error',
    title: error,
  });
};

const confirm = (id, user_id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Confirm!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await addOrder({ food_id: id, user_id });
        Swal.fire('Ordered', 'Your order has been placed.', 'success');
      } catch (error) {}
    }
  });
};

export default (props) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const response = await getFood();
        setFoods(response?.data?.data ?? []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, []);

  const Order = async (id) => {
    try {
      const user_id = decode(props.token).data.id;
      if (!user_id) throw new Error();
      confirm(id, user_id);
    } catch (error) {
      errors('Please login to order');
    }
  };

  return (
    <div class="h-screen w-full flex bg-gray-800">
      {loading ? (
        <h1>Load</h1>
      ) : (
        <main class="w-full overflow-y-auto flex-row mt-10">
          <div class="px-10 grid grid-cols-4 gap-4">
            {foods.map((item, i) => (
              <div
                class="col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-1 xl:col-span-1 flex flex-col items-center"
                key={`${i}`}
              >
                <div class="bg-white rounded-lg mt-5">
                  <img src={item.images[0]} class="h-40 rounded-md" alt="" />
                </div>
                <div class="bg-white shadow-lg rounded-lg -mt-4 w-64">
                  <div class="py-5 px-5">
                    <span class="font-bold text-gray-800 text-lg">
                      {item.name}
                    </span>
                    <div class="flex-col items-start justify-between">
                      <div class="text-sm text-black ">{item.description}</div>
                      <div class="text-xl text-red-600 font-bold mt-2">
                        Rs {item.price}
                      </div>
                      <button
                        onClick={() => Order(item.id)}
                        class="font-bold py-2 rounded mt-2"
                        style={{
                          background: 'red',
                          color: 'white',
                          padding: 10,
                        }}
                      >
                        Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  );
};
