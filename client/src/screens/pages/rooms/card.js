import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getToken } from '../../../utils';
import jwt_decode from 'jwt-decode';
import { bookRoom } from '../../../services/room-service';
import { useHistory } from 'react-router-dom';

import { RangeDatePicker } from 'react-google-flight-datepicker';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from '../../../context';

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

const errorMsg = () => {
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
    title: 'Booking is not vailable on this date.',
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
    title: 'Check In date is invalid',
  });
};

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: '5%',
    width: '70%',
    height: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

let startDate = '';
let endDate = '';

export default function RoomCard({ item, id }) {
  const history = useHistory();
  const classes = useStyles();
  const { setbooking, booking } = useContext(Context);

  const [value, setvalue] = useState(false);

  const date = new Date();
  const tomorrow = new Date(date.getTime());
  tomorrow.setDate(date.getDate() + 1);

  startDate = date;
  endDate = tomorrow;

  const confirm = (item, start, end, history) => {
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
        try {
          const user = await getToken();
          const decode = jwt_decode(user);
          const data = {
            roomid: item.id,
            roomno: item.roomno,
            roomname: item.roomname,
            price: item.price,
            bed: item.bed,
            capacity: item.capacity,
            user_id: decode.data.id,
            start_date: start,
            end_date: end,
          };
          await bookRoom(data);
          setbooking(item);
          Swal.fire('Booked!', 'Your booking has been created', 'success');
          history.push('/mybooking');
        } catch (error) {
          errorMsg();
        }
      }
    });
  };

  const book = (item) => {
    if (getToken() === null) {
      history.push('/login');
      message();
      return;
    }

    if (startDate < new Date()) return invalid();
    confirm(item, startDate, endDate, history);
  };

  const onDateChange = (start, end) => {
    startDate = start;
    endDate = end;
    return;
  };

  const find = booking.find((val) => val.id === item.id);
  const bookApi = item.bookings.find((item) => item.user_id === id);

  return (
    <div class="max-w-sm sm:w-1/2 lg:w-1/4 h-2/4 py-10 px-6">
      {value && (
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
              <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div
              class="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class=" mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      class="w-6 h-6 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      class="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Book Room
                    </h3>
                    <div class="mt-2 z-20">
                      <RangeDatePicker
                        startDate={date}
                        endDate={tomorrow}
                        onChange={(startDate, endDate) =>
                          onDateChange(startDate, endDate)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                  <button
                    type="button"
                    class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    onClick={() => book(item)}
                  >
                    Book Now
                  </button>
                </span>
                <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                  <button
                    type="button"
                    class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    onClick={() => setvalue(false)}
                  >
                    Cancel
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div class="bg-white shadow-xl rounded-lg overflow-hidden">
        <div class="bg-cover bg-center h-48 p-2">
          <div class="flex justify-end w-full h-11/12">
            <img class="rounded" src={item.images[0]}></img>
          </div>
        </div>
        <div class="p-4">
          <p class="tracking-wide uppercase text-sm font-bold text-gray-700">
            {item.roomname}
          </p>
          <p class="text-3xl text-gray-900">Rs. {item.price}</p>
          <p class="text-gray-700 uppercase">{item.extra}</p>
        </div>
        <div class="flex p-4 border-t border-gray-300 text-gray-700">
          <div class="flex-1 inline-flex items-center">
            <svg
              class="h-6 w-6 text-gray-600 fill-current mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M0 16L3 5V1a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v4l3 11v5a1 1 0 0 1-1 1v2h-1v-2H2v2H1v-2a1 1 0 0 1-1-1v-5zM19 5h1V1H4v4h1V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h2V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1zm0 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V6h-2v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6H3.76L1.04 16h21.92L20.24 6H19zM1 17v4h22v-4H1zM6 4v4h4V4H6zm8 0v4h4V4h-4z"></path>
            </svg>
            <p>
              <span class="text-gray-900 font-bold">{item.bed}</span> Bedroom
            </p>
          </div>
          <div class="flex-1 inline-flex items-center">
            <svg
              class="h-6 w-6 text-gray-600 fill-current mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M17.03 21H7.97a4 4 0 0 1-1.3-.22l-1.22 2.44-.9-.44 1.22-2.44a4 4 0 0 1-1.38-1.55L.5 11h7.56a4 4 0 0 1 1.78.42l2.32 1.16a4 4 0 0 0 1.78.42h9.56l-2.9 5.79a4 4 0 0 1-1.37 1.55l1.22 2.44-.9.44-1.22-2.44a4 4 0 0 1-1.3.22zM21 11h2.5a.5.5 0 1 1 0 1h-9.06a4.5 4.5 0 0 1-2-.48l-2.32-1.15A3.5 3.5 0 0 0 8.56 10H.5a.5.5 0 0 1 0-1h8.06c.7 0 1.38.16 2 .48l2.32 1.15a3.5 3.5 0 0 0 1.56.37H20V2a1 1 0 0 0-1.74-.67c.64.97.53 2.29-.32 3.14l-.35.36-3.54-3.54.35-.35a2.5 2.5 0 0 1 3.15-.32A2 2 0 0 1 21 2v9zm-5.48-9.65l2 2a1.5 1.5 0 0 0-2-2zm-10.23 17A3 3 0 0 0 7.97 20h9.06a3 3 0 0 0 2.68-1.66L21.88 14h-7.94a5 5 0 0 1-2.23-.53L9.4 12.32A3 3 0 0 0 8.06 12H2.12l3.17 6.34z"
              ></path>
            </svg>
            <p>
              <span class="text-gray-900 font-bold">{item.bathroom} </span>
              Bathroom
            </p>
          </div>
        </div>
        <div class="px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100 flex justify-around">
          <div class="text-xs cursor-pointer uppercase font-bold text-gray-600 tracking-wide">
            <Link to={`/roomdetail/${item.id}`}> show details</Link>
          </div>
          {(find && find.id === item.id) ||
          (bookApi &&
            bookApi.user_id === id &&
            new Date(bookApi.end_date) > new Date()) ? (
            <div
              class="text-xs cursor-pointer uppercase font-bold text-gray-600 tracking-wide"
              onClick={() => setvalue(true)}
            >
              Your Booking
            </div>
          ) : (
            <div
              class="text-xs cursor-pointer uppercase font-bold text-gray-600 tracking-wide"
              onClick={() => setvalue(true)}
            >
              book now
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
/* <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Please select date.
                </Typography>
                <RangeDatePicker
                  startDate={date}
                  endDate={tomorrow}
                  onChange={(startDate, endDate) =>
                    onDateChange(startDate, endDate)
                  }
                />
              </CardContent>
              <CardActions style={{ alignSelf: 'flex-end' }}>
                <button
                  class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  size="small"
                  onClick={() => book(item)}
                >
                  Confirm
                </button>
                <button
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  size="small"
                  onClick={() => setvalue(false)}
                >
                  Cancel
                </button>
              </CardActions>
            </Card>*/
