import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {
  const [form, setform] = useState(false);
  return (
    <aside class="z-20 relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
      <div class="p-6">
        <a
          href="index.html"
          class="text-white text-3xl font-semibold uppercase hover:text-gray-300"
        >
          Admin
        </a>
      </div>
      <nav class="text-white text-base font-semibold pt-3 flex flex-col">
        <Link
          to="/dashboard"
          class="flex items-center active-nav-link text-white py-4 pl-6 nav-item w-64"
        >
          <i class="fas fa-tachometer-alt mr-3"></i>
          Dashboard
        </Link>
        <div class="relative">
          <div class="px-2 ml-10 py-2 w-48  rounded-md shadow dark-mode:bg-gray-800">
            <Link
              class="block px-4 py-2 mt-2 text-sm font-semibold rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              to="/addroom"
            >
              Create Room
            </Link>
            <Link
              class="block px-4 py-2 mt-2 text-sm font-semibold rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              to="/addcustomer"
            >
              Create Booking
            </Link>
            <Link
              class="block px-4 py-2 mt-2 text-sm font-semibold rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              to={{ pathname: '/register', query: { admin: true } }}
            >
              Register Customer
            </Link>
          </div>
        </div>
      </nav>
    </aside>
  );
}
