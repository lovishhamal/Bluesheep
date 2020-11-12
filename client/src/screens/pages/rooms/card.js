import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getToken } from '../../../utils';
import jwt_decode from 'jwt-decode';
import { bookRoom } from '../../../services/room-service';
import { useHistory } from 'react-router-dom';

import { RangeDatePicker } from 'react-google-flight-datepicker';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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

const confirm = (item, start, end) => {
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
        start_date: start,
        end_date: end,
      };
      await bookRoom(data);
      Swal.fire('Booked!', 'Your booking has been created', 'success');
    }
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

export default function RoomCard({ item }) {
  const history = useHistory();
  const [start, setstart] = useState('');
  const [end, setend] = useState('');
  const classes = useStyles();

  const [value, setvalue] = useState(false);

  const date = new Date();
  const tomorrow = new Date(date.getTime());
  tomorrow.setDate(date.getDate() + 1);

  startDate = date;
  endDate = tomorrow;

  const book = (item) => {
    if (getToken() === null) {
      history.push('/login');
      message();
      return;
    }
    confirm(item, startDate, endDate);
  };

  const onDateChange = (start, end) => {
    startDate = start;
    endDate = end;
    return;
  };

  return (
    <div class="max-w-sm sm:w-1/2 lg:w-1/4 h-2/4 py-10 px-6">
      {value && (
        <div class="bg-gray-200 flex items-start justify-center h-screen fixed w-screen z-20 top-0 left-0 right-0">
          <Card className={classes.root}>
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
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded"
                size="small"
                onClick={() => book(item)}
              >
                Confirm
              </button>
              <button
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                size="small"
                onClick={() => setvalue(false)}
              >
                Cancel
              </button>
            </CardActions>
          </Card>
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
          <p class="text-3xl text-gray-900">{item.price}</p>
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
          <div
            class="text-xs cursor-pointer uppercase font-bold text-gray-600 tracking-wide"
            onClick={() => setvalue(true)}
          >
            book now
          </div>
        </div>
      </div>
    </div>
  );
}
