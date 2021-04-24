import React, { useEffect, useState } from 'react';
import { addOrder, getDates } from '../../../services/order-services';
import { getFood } from '../../../services/food';
import decode from 'jwt-decode';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import { getToken } from '../../../utils';
import colors from '../../../colors/colors';
import PlaceHolder from '../../../common/Placeholder';
import './cul.css';

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

const invalid = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: 'error',
    title: 'Order cannot be made',
  });
};

export default (props) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookStatus, setbookStatus] = useState(null);
  const [foodName, setFoodName] = useState('');
  const [extra, setextra] = useState('');
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(1);

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
          await addOrder({ food_id: id, user_id, order_date: new Date() });
          Swal.fire('Ordered', 'Your order has been placed.', 'success');
          setCount(count + 1);
        } catch (error) {}
      }
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        if (token) {
          const decode = jwt_decode(token);
          const dates = await getDates(decode.data.id);
          setbookStatus(dates.data.data.map((item) => item.status));
        }
        const response = await getFood();
        setFoods(response?.data?.data.filter((item) => item.show) ?? []);
        setextra(response?.data?.data?.filter((item) => !item.show) ?? []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, []);

  const Order = async (id) => {
    try {
      if (!bookStatus.includes('Occupied')) return invalid();
      const user_id = decode(props.token).data.id;
      if (!user_id) throw new Error();
      confirm(id, user_id);
    } catch (error) {
      errors('Please login to order');
    }
  };

  const OrderExtra = async (id) => {
    try {
      const user_id = decode(props.token).data.id;
      if (!user_id) throw new Error();
      if (number == 1) {
        confirm(id, user_id);
      } else {
        for (let i = 0; i < number; i++) {
          await addOrder({ food_id: id, user_id, order_date: new Date() });
          setCount(count + 1);
        }
      }
    } catch (err) {
      errors('Something went wrong');
    }
  };

  return (
    <>
      {count == 1 && (
        <div
          class="flex flex-col justify-center items-center fixed w-full h-full fixed"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div class="md:w-1/3 sm:w-full rounded-lg shadow-lg bg-white my-3">
            <div class="flex flex-row sm:flex-col">
              <div class="flex justify-between border-b border-gray-100 px-5 py-4">
                <img src={extra[0]?.images[0]} />
              </div>
              <div class="px-10 py-5 text-gray-600">
                Coke goes great with {foodName}. Treat yourself with great combo
              </div>

              <div class="flex flex-row items-center ml-4">
                <i
                  class="fas fa-plus-circle"
                  style={{ color: 'red', fontSize: 25 }}
                  onClick={() => setNumber(number + 1)}
                />
                <h1 style={{ margin: '0 5px 0 5px' }}> {number}</h1>
                <i
                  class="fas fa-minus-circle"
                  style={{ color: 'red', fontSize: 25 }}
                  onClick={() => {
                    if (number <= 1) return;
                    setNumber(number - 1);
                  }}
                />
              </div>
            </div>
            <div class="px-5 py-4 flex justify-end">
              <button
                class="bg-orange-500 mr-1 rounded text-sm py-2 px-3 text-white hover:bg-orange-600 transition duration-150"
                onClick={() => OrderExtra(extra[0]?.id)}
              >
                Order
              </button>
              <button
                class="text-sm py-2 px-3 text-gray-500 hover:text-gray-600 transition duration-150"
                onClick={() => setCount(count + 1)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div class="h-full w-full">
        {loading ? (
          <div class="px-10 mt-10">
            <PlaceHolder />
          </div>
        ) : (
          <main
            class="w-full h-auto flex-row pb-10"
            style={{ backgroundColor: colors.backgroundColor }}
          >
            <div class="px-10 grid grid-cols-4 gap-4 pt-10">
              {foods.map((item, i) => (
                <div
                  class="col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-1 xl:col-span-1 flex flex-col items-center"
                  key={`${i}`}
                >
                  <img
                    src={item.images[0]}
                    class="h-40 rounded-md"
                    alt=""
                    style={{
                      height: '180px',
                      width: '75%',
                      objectFit: 'cover',
                    }}
                  />

                  <div class="bg-white shadow-lg rounded-lg -mt-4 w-64">
                    <div class="py-5 px-5">
                      <span class="font-bold text-gray-800 text-lg">
                        {item.name}
                      </span>
                      <div class="flex-col items-start justify-between">
                        <div class="text-sm text-black ">
                          {item.description}
                        </div>
                        <div class="text-xl text-red-600 font-bold mt-2">
                          Rs {item.price}
                        </div>
                        <button
                          onClick={() => {
                            Order(item.id);
                            setFoodName(item.name);
                          }}
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
    </>
  );
};
