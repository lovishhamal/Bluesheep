import React, { useEffect, useState } from 'react';
import {
  getBookingService,
  getCustomerService,
  updateBooking,
} from '../services/booking-service';
import Placeholder from '../common/Placeholder';
import Swal from 'sweetalert2';

export default function Content() {
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);

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
          await updateBooking(id);
          setRefetch(!refetch);
          Swal.fire('Updated!', 'Booking has been updated.', 'success');
        } catch (error) {}
      }
    });
  };

  useEffect(() => {
    (async () => {
      try {
        let data = await getBookingService();
        const data1 = await getCustomerService();

        setBookings(
          data?.data?.data.filter((item) => item.status === 'Booked') ?? []
        );
        setCustomer(
          data1?.data?.data.concat(
            data?.data?.data.filter((item) => item.status !== 'Booked')
          ) ?? []
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [refetch]);

  const updateRooms = async (id) => {
    confirm(id);
  };

  return (
    <div class="z-20 w-full overflow-x-hidden border-t flex flex-col">
      <main class="w-full overflow-scroll flex-grow p-6">
        <h1 class="text-3xl text-black pb-6">Dashboard</h1>
        {/*} <div class="flex flex-wrap mt-6">
          <div class="w-full lg:w-1/2 pr-0 lg:pr-2">
            <p class="text-xl pb-3 flex items-center">
              <i class="fas fa-plus mr-3"></i> Monthly Reports
            </p>
            <div class="p-6 bg-white">
              <canvas id="chartOne" width="400" height="200"></canvas>
            </div>
          </div>
          <div class="w-full lg:w-1/2 pl-0 lg:pl-2 mt-12 lg:mt-0">
            <p class="text-xl pb-3 flex items-center">
              <i class="fas fa-check mr-3"></i> Resolved Reports
            </p>
            <div class="p-6 bg-white">
              <canvas id="chartTwo" width="400" height="200"></canvas>
            </div>
          </div>
  </div>*/}
        <div class="w-full mt-12">
          <p class="text-xl pb-3 flex items-center">
            <i class="fas fa-list mr-3"></i> Latest Reports
          </p>
          {loading ? (
            <Placeholder />
          ) : bookings.length > 0 ? (
            <div class="bg-white overflow-auto">
              <table class="min-w-full bg-white">
                <thead class="bg-gray-800 text-white">
                  <tr>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                      First Name
                    </th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Last name
                    </th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Citizen No
                    </th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Room No
                    </th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Room Name
                    </th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                      CheckIn At
                    </th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                      CheckOut At
                    </th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Booked
                    </th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="text-gray-700">
                  {bookings.map((item, i) => (
                    <tr key={`${i}`}>
                      <td class="py-3 px-4">{item.user.firstname}</td>
                      <td class="py-3 px-4">{item.user.lastname}</td>
                      <td class="py-3 px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          {item.user.citizenidno}
                        </a>
                      </td>
                      <td class=" py-3 px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          {item.roomno}
                        </a>
                      </td>
                      <td class=" py-3px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          {item.roomname}
                        </a>
                      </td>
                      <td class="py-3px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          {item.start_date}
                        </a>
                      </td>
                      <td class="py-3 px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          {item.end_date}
                        </a>
                      </td>
                      <td class="py-3 px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          {item.status}
                        </a>
                      </td>
                      <td
                        class="py-3 px-4"
                        onClick={() => updateRooms(item.id)}
                      >
                        <i
                          class="fas fa-plus-circle"
                          style={{ fontSize: '20px' }}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h1>No bookings available</h1>
          )}
          <div style={{ height: 40 }} />
          {loading ? (
            <Placeholder />
          ) : customers.length > 0 ? (
            <div class="bg-white overflow-auto">
              <table class="min-w-full bg-white">
                <thead class="bg-gray-800 text-white">
                  <tr>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                      First Name
                    </th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Last name
                    </th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Citizen No
                    </th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Room No
                    </th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Room Name
                    </th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                      CheckIn At
                    </th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                      CheckOut At
                    </th>
                  </tr>
                </thead>
                <tbody class="text-gray-700">
                  {customers.map((item, i) => (
                    <tr key={`${i}`}>
                      <td class="py-3 px-4">{item.user.firstname}</td>
                      <td class="py-3 px-4">{item.user.lastname}</td>
                      <td class="py-3 px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          {item.user.citizenidno}
                        </a>
                      </td>
                      <td class=" py-3 px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          {item.roomno}
                        </a>
                      </td>
                      <td class=" py-3px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          {item.roomname}
                        </a>
                      </td>
                      <td class="py-3px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          {item.start_date}
                        </a>
                      </td>
                      <td class="py-3 px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          {item.end_date}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h1>No Customer data available</h1>
          )}
        </div>
      </main>
    </div>
  );
}
