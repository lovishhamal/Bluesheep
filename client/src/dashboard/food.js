import React, { useState, useEffect } from 'react';
import { deleteRoom } from '../services/room-service';
import Placeholder from '../common/Placeholder';
import { Context } from '../context';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getFood } from '../services/food';
import { deleteFood } from '../services/food';

export default function Rooms() {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(true);

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
          deleteFood(id);
          setFood(food.filter((item) => item.id !== id));
          Swal.fire('Deleted!', 'Your booking has been deleted.', 'success');
        } catch (error) {}
      }
    });
  };

  useEffect(() => {
    fetchFood();
  }, []);

  const fetchFood = async () => {
    try {
      const response = await getFood();
      setLoading(false);
      setFood(response.data.data);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div class="z-20 w-full overflow-x-hidden border-t flex flex-col">
      <main class="w-full overflow-scroll flex-grow p-6">
        <h1 class="text-3xl text-black pb-6">Foods</h1>
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
          ) : food.length > 0 ? (
            <div class="bg-white overflow-auto">
              <table class="min-w-full bg-white">
                <thead class="bg-gray-800 text-white">
                  <tr>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Food Name
                    </th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Description
                    </th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Price
                    </th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="text-gray-700">
                  {food.map((item, i) => (
                    <tr key={`${i}`}>
                      <td class="py-3 px-4">{item.name}</td>
                      <td class="py-3 px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          {item.description}
                        </a>
                      </td>
                      <td class=" py-3 px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          {item.price}
                        </a>
                      </td>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Link to={{ pathname: `/addfood/edit`, query: item }}>
                          <td class="py-3 px-4">
                            <button
                              type="button"
                              class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                            >
                              Edit
                            </button>
                          </td>
                        </Link>
                        <td class="py-3 px-4">
                          <button
                            type="button"
                            class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                            onClick={() => confirm(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </div>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h1>No bookings available</h1>
          )}
        </div>
      </main>
    </div>
  );
}
