import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { addCustomer } from '../services/form-service';
import { RangeDatePicker } from 'react-google-flight-datepicker';
import { Context } from '../context';

const isValid = (data) => {
  let valid = true;
  Object.values(data).forEach((item) => item === '' && (valid = false));
  return valid;
};

const error = (error) => {
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

const Success = (msg) => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: msg,
    showConfirmButton: false,
    timer: 1500,
  });
  window.location.reload('/addroom');
};
const date = new Date();
let startDate = new Date();
let endDate = date.setDate(date.getDate() + 1);

function getUnique(items, value) {
  return ['Select Room ', ...new Set(items.map((item) => item[value]))];
}

export default function Addcustomer() {
  const rooms = useContext(Context);
  const [state, setState] = useState({
    name: '',
    email: '',
    address: '',
    idno: '',
  });

  const [room, setroom] = useState({ roomno: null, roomname: null });
  const date = new Date();
  const tomorrow = new Date(date.getTime());
  tomorrow.setDate(date.getDate() + 1);

  const onChange = (e) => {
    const { value, name } = e.target;
    setState({ ...state, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      if (!isValid(state)) {
        return error('Please fill all the fields');
      }
      addCustomer({
        ...state,
        start_date: startDate,
        end_date: new Date(endDate),
        ...room,
      })
        .then((data) => Success('Customer added'))
        .catch((err) => error('Booking not availbale on this date'));
    } catch (error) {}
  };

  const onChangeDate = (start, end) => {
    startDate = start;
    endDate = end;
    return;
  };

  const handleChange = (item) => {
    const roomtype = rooms.allRooms.find(
      (val) => val.roomno === +item.target.value
    );
    setroom({ roomname: roomtype.roomname, roomno: +item.target.value });
  };
  const urooms = getUnique(rooms.allRooms, 'roomno');
  return (
    <div className="z-20 overflow-x-hidden flex justify-center">
      <div class="scroll w-full lg:w-1/2 mt-6 pl-0 lg:pl-2">
        <p class="text-xl pb-6 flex items-center">
          <i class="fas fa-list mr-3"></i> Add Customer
        </p>
        <div class="leading-loose">
          <form class="p-10 bg-white rounded shadow-xl">
            <p class="text-lg text-gray-800 font-medium pb-4">
              Customer information
            </p>
            <div class="">
              <label class="block text-sm text-gray-600" for="cus_name">
                Name
              </label>
              <input
                class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="cus_name"
                name="name"
                type="text"
                required=""
                placeholder="Your Name"
                aria-label="Name"
                onChange={onChange}
              />
            </div>
            <div class="mt-2">
              <label class="block text-sm text-gray-600" for="cus_email">
                Email
              </label>
              <input
                class="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="email"
                type="text"
                required=""
                placeholder="Your Email"
                aria-label="Email"
                onChange={onChange}
              />
            </div>
            <div class="mt-2">
              <label class=" block text-sm text-gray-600" for="cus_email">
                Address
              </label>
              <input
                class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_address"
                name="address"
                type="text"
                required=""
                placeholder="Country"
                aria-label="Email"
                onChange={onChange}
              />
            </div>
            <p class="text-lg text-gray-800 font-medium py-4">Identification</p>
            <div class="">
              <label class="block text-sm text-gray-600" for="cus_name">
                Id No
              </label>
              <input
                class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_idno"
                name="idno"
                type="text"
                required=""
                placeholder="123-4456-789"
                aria-label="Name"
                onChange={onChange}
              />
            </div>
            <p class="text-lg text-gray-800 font-medium py-4">Rooms</p>
            <div class="">
              <label class="block text-sm text-gray-600" for="cus_name">
                Select Room
              </label>
              <select
                name="room"
                onChange={handleChange}
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-4 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                {urooms?.length > 0 &&
                  urooms.map((item) => <option>{item}</option>)}
              </select>
              <label class="block text-sm text-gray-600" for="cus_name">
                Room Type
              </label>
              <select
                name="room"
                onChange={handleChange}
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-4 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                disabled={true}
              >
                <option>{room?.roomname}</option>
              </select>
            </div>
            <p class="text-lg text-gray-800 font-medium py-4">
              Duration of stay
            </p>
            <div class="">
              <label class="block text-sm text-gray-600" for="cus_name">
                Date
              </label>
              <RangeDatePicker
                startDate={date}
                endDate={tomorrow}
                onChange={(startDate, endDate) =>
                  onChangeDate(startDate, endDate)
                }
              />
            </div>
            <div class="mt-6">
              <button
                class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                type="submit"
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
