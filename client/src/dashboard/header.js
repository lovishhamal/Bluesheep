import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [account, setaccount] = useState(false);
  return (
    <header class="w-full flex items-center justify-end bg-white py-2 left-0 hidden sm:flex">
      <div class="relative w-32 flex justify-between items-center mr-10">
        <svg
          id="Capa_1"
          enable-background="new 0 0 512 512"
          height="20"
          viewBox="0 0 512 512"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <linearGradient
            id="SVGID_1_"
            gradientUnits="userSpaceOnUse"
            x1="256"
            x2="256"
            y1="512"
            y2="2"
          >
            <stop offset="0" stop-color="#addcff" />
            <stop offset=".5028" stop-color="#eaf6ff" />
            <stop offset="1" stop-color="#eaf6ff" />
          </linearGradient>
          <linearGradient
            id="SVGID_2_"
            gradientUnits="userSpaceOnUse"
            x1="256.001"
            x2="256.001"
            y1="452"
            y2="0"
          >
            <stop offset="0" stop-color="#5558ff" />
            <stop offset="1" stop-color="#00c0ff" />
          </linearGradient>
          <g>
            <g>
              <g>
                <path
                  d="m107.343 28.249c6.212-5.48 6.807-14.958 1.326-21.171-5.479-6.213-14.959-6.807-21.172-1.327-54.97 48.487-86.497 118.195-86.497 191.249 0 8.284 6.716 15 15 15s15-6.716 15-15c0-64.449 27.826-125.956 76.343-168.751zm317.16-22.498c-6.214-5.48-15.693-4.885-21.172 1.327-5.48 6.213-4.886 15.691 1.326 21.171 48.517 42.795 76.343 104.302 76.343 168.751 0 8.284 6.716 15 15 15s15-6.716 15-15c0-73.054-31.527-142.762-86.497-191.249zm-295.365 43.259c-43.303 37.169-68.138 91.109-68.138 147.99 0 8.284 6.716 15 15 15s15-6.716 15-15c0-48.12 21.022-93.763 57.677-125.226 6.286-5.396 7.008-14.866 1.612-21.152-5.396-6.287-14.867-7.008-21.151-1.612zm253.724 0c-6.286-5.396-15.756-4.674-21.151 1.612-5.396 6.286-4.674 15.756 1.612 21.152 36.655 31.463 57.677 77.106 57.677 125.226 0 8.284 6.716 15 15 15s15-6.716 15-15c0-56.881-24.835-110.821-68.138-147.99zm-96.862 372.99h-60c-8.284 0-15 6.716-15 15v30c0 24.813 20.187 45 45 45s45-20.187 45-45v-30c0-8.284-6.716-15-15-15z"
                  fill="url(#SVGID_1_)"
                />
              </g>
            </g>
            <path
              d="m446.604 426.392c-35.857-35.859-55.604-83.535-55.604-134.245v-95.147c0-69.369-52.594-126.676-120-134.162v-47.838c0-8.284-6.716-15-15-15s-15 6.716-15 15v47.838c-67.406 7.486-120 64.793-120 134.162v95.147c0 50.71-19.747 98.385-55.604 134.244-9.283 9.276-2.944 25.609 10.604 25.609h360c13.51 0 19.911-16.308 10.604-25.608z"
              fill="url(#SVGID_2_)"
            />
          </g>
        </svg>
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
