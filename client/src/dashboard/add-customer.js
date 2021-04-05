import React from 'react';

export default function Addcustomer() {
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
                name="cus_name"
                type="text"
                required=""
                placeholder="Your Name"
                aria-label="Name"
              />
            </div>
            <div class="mt-2">
              <label class="block text-sm text-gray-600" for="cus_email">
                Email
              </label>
              <input
                class="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="cus_email"
                type="text"
                required=""
                placeholder="Your Email"
                aria-label="Email"
              />
            </div>
            <div class="mt-2">
              <label class=" block text-sm text-gray-600" for="cus_email">
                Address
              </label>
              <input
                class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="cus_email"
                type="text"
                required=""
                placeholder="Country"
                aria-label="Email"
              />
            </div>
            <p class="text-lg text-gray-800 font-medium py-4">Identification</p>
            <div class="">
              <label class="block text-sm text-gray-600" for="cus_name">
                Id No
              </label>
              <input
                class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_name"
                name="cus_name"
                type="text"
                required=""
                placeholder="123-4456-789"
                aria-label="Name"
              />
            </div>
            <div class="mt-6">
              <button
                class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                type="submit"
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
