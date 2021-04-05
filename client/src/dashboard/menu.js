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
          <button
            class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item w-64 focus:outline-none"
            onClick={() => setform(!form)}
          >
            <i class="fas fa-table mr-3"></i>
            Forms
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              class="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          {form && (
            <div class="px-2 ml-10 py-2 w-48  rounded-md shadow dark-mode:bg-gray-800">
              <Link
                class="block px-4 py-2 mt-2 text-sm font-semibold rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                to="/addroom"
              >
                Add Rooms
              </Link>
              <Link
                class="block px-4 py-2 mt-2 text-sm font-semibold rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                to="/addcustomer"
              >
                Add Customer
              </Link>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
