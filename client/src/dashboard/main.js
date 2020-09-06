import React,{useState} from 'react';
import './style.css';
import { Link } from 'react-router-dom';

export default function Main() {
  const [form,setform] = useState(false)
  const [account,setaccount] = useState(false)
  

  return (
    <div class="bg-gray-100 font-family-karla flex">
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
          <a
            href="index.html"
            class="flex items-center active-nav-link text-white py-4 pl-6 nav-item w-64"
          >
            <i class="fas fa-tachometer-alt mr-3"></i>
            Dashboard
          </a>
          <a
            href="blank.html"
            class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item w-64"
          >
            <i class="fas fa-sticky-note mr-3"></i>
            Blank Page
          </a>
          <a
            href="tables.html"
            class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item w-64"
          >
            <i class="fas fa-table mr-3"></i>
            Tables
          </a>
          <div class="relative">
            <button class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item w-64 focus:outline-none" onClick={()=>setform(!form)}>
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
           {form &&  <div class="px-2 ml-10 py-2 w-48  rounded-md shadow dark-mode:bg-gray-800">
           <Link
             class="block px-4 py-2 mt-2 text-sm font-semibold rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
             to="#"
           >
             Add Rooms
           </Link>
           <Link
             class="block px-4 py-2 mt-2 text-sm font-semibold rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
             to="#"
           >
             Add Customer
           </Link>
         </div>}
          </div>
          <a
            href="tabs.html"
            class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item w-64"
          >
            <i class="fas fa-tablet-alt mr-3"></i>
            Tabbed Content
          </a>
          <a
            href="calendar.html"
            class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item w-64"
          >
            <i class="fas fa-calendar mr-3"></i>
            Calendar
          </a>
        </nav>
      </aside>
      <div class="w-full flex flex-col h-screen overflow-y-hidden">
        <header class="w-full flex items-center bg-white py-2 left-0 hidden sm:flex">
          <div class="w-1/2"></div>
          <div class="relative w-1/2 flex justify-end mr-10">
            <button
              onClick={()=>setaccount(!account)}
              class="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
            >
              <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" />
            </button>
            
            {account && <div class="absolute w-48 bg-white rounded-lg shadow-lg py-2 mt-16">
            <Link href="#" class="block px-4 py-2 account-link hover:text-white">
              Sign Out
            </Link>
          </div>}
          </div>
        </header>
        <header class="w-full bg-sidebar py-5 px-6 sm:hidden">
          <div class="flex items-center justify-between">
            <a
              href="index.html"
              class="text-white text-3xl font-semibold uppercase hover:text-gray-300"
            >
              Admin
            </a>
            <button onClick="" class="text-white text-3xl focus:outline-none">
              <i x-show="!isOpen" class="fas fa-bars"></i>
              <i x-show="isOpen" class="fas fa-times"></i>
            </button>
          </div>

          <nav class="flex flex-col pt-4">
            <a
              href="index.html"
              class="flex items-center active-nav-link text-white py-2 pl-4 nav-item"
            >
              <i class="fas fa-tachometer-alt mr-3"></i>
              Dashboard
            </a>
            <a
              href="blank.html"
              class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i class="fas fa-sticky-note mr-3"></i>
              Blank Page
            </a>
            <a
              href="tables.html"
              class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i class="fas fa-table mr-3"></i>
              Tables
            </a>
            <a
              href="forms.html"
              class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i class="fas fa-align-left mr-3"></i>
              Forms
            </a>
            <a
              href="tabs.html"
              class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i class="fas fa-tablet-alt mr-3"></i>
              Tabbed Content
            </a>
            <a
              href="calendar.html"
              class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i class="fas fa-calendar mr-3"></i>
              Calendar
            </a>
            <a
              href="#"
              class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i class="fas fa-cogs mr-3"></i>
              Support
            </a>
            <a
              href="#"
              class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i class="fas fa-user mr-3"></i>
              My Account
            </a>
            <a
              href="#"
              class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i class="fas fa-sign-out-alt mr-3"></i>
              Sign Out
            </a>
          </nav>
        </header>

        <div
          class="z-20 w-full overflow-x-hidden border-t flex flex-col"
          style={{ border: '1px soild red' }}
        >
          <main class="w-full overflow-scroll flex-grow p-6">
            <h1 class="text-3xl text-black pb-6">Dashboard</h1>

            <div class="flex flex-wrap mt-6">
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
            </div>

            <div class="w-full mt-12">
              <p class="text-xl pb-3 flex items-center">
                <i class="fas fa-list mr-3"></i> Latest Reports
              </p>
              <div class="bg-white overflow-auto">
                <table class="min-w-full bg-white">
                  <thead class="bg-gray-800 text-white">
                    <tr>
                      <th class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Name
                      </th>
                      <th class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Last name
                      </th>
                      <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                        Phone
                      </th>
                      <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-700">
                    <tr>
                      <td class="w-1/3 text-left py-3 px-4">Lian</td>
                      <td class="w-1/3 text-left py-3 px-4">Smith</td>
                      <td class="text-left py-3 px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          622322662
                        </a>
                      </td>
                      <td class="text-left py-3 px-4">
                        <a
                          class="hover:text-blue-500"
                          href="mailto:jonsmith@mail.com"
                        >
                          jonsmith@mail.com
                        </a>
                      </td>
                    </tr>
                    <tr class="bg-gray-200">
                      <td class="w-1/3 text-left py-3 px-4">Emma</td>
                      <td class="w-1/3 text-left py-3 px-4">Johnson</td>
                      <td class="text-left py-3 px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          622322662
                        </a>
                      </td>
                      <td class="text-left py-3 px-4">
                        <a
                          class="hover:text-blue-500"
                          href="mailto:jonsmith@mail.com"
                        >
                          jonsmith@mail.com
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td class="w-1/3 text-left py-3 px-4">Oliver</td>
                      <td class="w-1/3 text-left py-3 px-4">Williams</td>
                      <td class="text-left py-3 px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          622322662
                        </a>
                      </td>
                      <td class="text-left py-3 px-4">
                        <a
                          class="hover:text-blue-500"
                          href="mailto:jonsmith@mail.com"
                        >
                          jonsmith@mail.com
                        </a>
                      </td>
                    </tr>
                    <tr class="bg-gray-200">
                      <td class="w-1/3 text-left py-3 px-4">Isabella</td>
                      <td class="w-1/3 text-left py-3 px-4">Brown</td>
                      <td class="text-left py-3 px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          622322662
                        </a>
                      </td>
                      <td class="text-left py-3 px-4">
                        <a
                          class="hover:text-blue-500"
                          href="mailto:jonsmith@mail.com"
                        >
                          jonsmith@mail.com
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td class="w-1/3 text-left py-3 px-4">Lian</td>
                      <td class="w-1/3 text-left py-3 px-4">Smith</td>
                      <td class="text-left py-3 px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          622322662
                        </a>
                      </td>
                      <td class="text-left py-3 px-4">
                        <a
                          class="hover:text-blue-500"
                          href="mailto:jonsmith@mail.com"
                        >
                          jonsmith@mail.com
                        </a>
                      </td>
                    </tr>
                    <tr class="bg-gray-200">
                      <td class="w-1/3 text-left py-3 px-4">Emma</td>
                      <td class="w-1/3 text-left py-3 px-4">Johnson</td>
                      <td class="text-left py-3 px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          622322662
                        </a>
                      </td>
                      <td class="text-left py-3 px-4">
                        <a
                          class="hover:text-blue-500"
                          href="mailto:jonsmith@mail.com"
                        >
                          jonsmith@mail.com
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td class="w-1/3 text-left py-3 px-4">Oliver</td>
                      <td class="w-1/3 text-left py-3 px-4">Williams</td>
                      <td class="text-left py-3 px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          622322662
                        </a>
                      </td>
                      <td class="text-left py-3 px-4">
                        <a
                          class="hover:text-blue-500"
                          href="mailto:jonsmith@mail.com"
                        >
                          jonsmith@mail.com
                        </a>
                      </td>
                    </tr>
                    <tr class="bg-gray-200">
                      <td class="w-1/3 text-left py-3 px-4">Isabella</td>
                      <td class="w-1/3 text-left py-3 px-4">Brown</td>
                      <td class="text-left py-3 px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          622322662
                        </a>
                      </td>
                      <td class="text-left py-3 px-4">
                        <a
                          class="hover:text-blue-500"
                          href="mailto:jonsmith@mail.com"
                        >
                          jonsmith@mail.com
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
