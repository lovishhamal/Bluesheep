import React, { useEffect, useState } from 'react';
import { getUser } from '../services/user-service';
import Placeholder from '../common/Placeholder';

export default function Customers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getUser();
        setUsers(data?.data?.data ?? []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, []);

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
          ) : users.length > 0 ? (
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
                      Email
                    </th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                      CitizenShip No
                    </th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Address
                    </th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Phone No
                    </th>
                  </tr>
                </thead>
                <tbody class="text-gray-700">
                  {users.map((item, i) => (
                    <tr key={`${i}`}>
                      <td class="py-3 px-4">{item.firstname}</td>
                      <td class="py-3 px-4">{item.lastname}</td>
                      <td class="py-3 px-4">{item.email}</td>
                      <td class="py-3 px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          {item.citizenidno}
                        </a>
                      </td>
                      <td class=" py-3 px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          {item.city + ', ' + item.country}
                        </a>
                      </td>
                      <td class=" py-3px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          {item.phoneno}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h1>No users found</h1>
          )}
        </div>
      </main>
    </div>
  );
}
