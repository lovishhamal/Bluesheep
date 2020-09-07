import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [account, setaccount] = useState(false);
  return (
    <header class="w-full flex items-center bg-white py-2 left-0 hidden sm:flex">
      <div class="w-1/2"></div>
      <div class="relative w-1/2 flex justify-end mr-10">
        <button
          onClick={() => setaccount(!account)}
          class="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
        >
          <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" />
        </button>

        {account && (
          <div class="absolute w-48 bg-white rounded-lg shadow-lg py-2 mt-16">
            <Link
              href="#"
              class="block px-4 py-2 account-link hover:text-white"
            >
              Sign Out
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
