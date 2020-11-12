import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../../../context';
import colors from '../../../colors/colors';
import { getToken } from '../../../utils';
import jwt_decode from 'jwt-decode';
import { bookRoom } from '../../../services/room-service';
import Swal from 'sweetalert2';

const message = () => {
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
    title: 'Please login to continue',
  });
};

const confirm = (item) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, confirm booking!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const user = await getToken();
      const decode = jwt_decode(user);
      const data = {
        roomno: item.roomno,
        roomname: item.roomname,
        price: item.price,
        bed: item.bed,
        capacity: item.capacity,
        user_id: decode.data.id,
      };
      await bookRoom(data);
      Swal.fire('Booked!', 'Your booking has been created', 'success');
    }
  });
};

const findRoom = (id, rooms) => {
  let result = rooms.find((item) => item.id == id);
  return result;
};

const Details = (props) => {
  const history = useHistory();
  const { allRooms } = useContext(Context);
  const data = findRoom(+props.match.params.id, allRooms);

  const book = async (item) => {
    try {
      if (getToken() === null) {
        message();
        history.push('/login');
        return;
      }
      confirm(item);
    } catch (error) {}
  };

  if (data == null) {
    return <div></div>;
  } else {
    return (
      <section class="text-gray-700 body-font overflow-hidden">
        <div class="container px-5 py-5 mx-auto">
          <div
            class="lg:w-4/5 mx-auto flex flex-wrap shadow-2xl"
            style={{ borderWidth: 20, borderColor: colors.white }}
          >
            {data.images.map((item) => (
              <img
                alt="ecommerce"
                class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                src={item}
              />
            ))}
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest capitalize">
                {data.roomname}
              </h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1 capitalize">
                {data.roomname}
              </h1>
              <div class="flex mb-4">
                <span class="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span class="text-gray-600 ml-3">4 Reviews</span>
                </span>
              </div>
              <p class="leading-relaxed">{data.description}</p>
              <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div class="flex flex-col">
                  <span class="mr-3 text-2xl font-bold">Extra</span>
                  <span class="mr-3 mt-2 capitalize">{data.extra}</span>
                </div>
              </div>
              <div class="flex">
                <span class="title-font font-medium text-2xl text-gray-900">
                  Rs {data.price}
                </span>
                <button
                  class="flex ml-auto text-white border-0 py-2 px-6 focus:outline-none rounded"
                  style={{ backgroundColor: colors.primaryColor }}
                  onClick={() => book(data)}
                >
                  Book Now
                </button>
                <button
                  class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                  disabled={true}
                >
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Details;
