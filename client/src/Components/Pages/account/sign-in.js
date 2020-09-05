import React, { useState, useRef } from 'react';
import Colors from '../../../colors/colors';

export default function SignIn() {
  const [formErrors, setformErrors] = useState('');

  const userEl = useRef(null);
  const passwordEl = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (userEl.current.value === '' || passwordEl.current.value === '') {
      setformErrors('Please fill all fields ');
      return;
    }
  };

  return (
    <div
      class="w-full flex items-center justify-center h-screen"
      style={{ backgroundColor: Colors.backgroundcolor }}
    >
      <div class="w-full max-w-xs">
        <form
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={onSubmit}
        >
          {formErrors && (
            <p class="text-red-500 text-xs italic mb-2">
              <div
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span class="block sm:inline">{formErrors}</span>
                <span class="absolute top-0 bottom-0 right-0 px-3 py-2">
                  <svg
                    onClick={() => setformErrors('')}
                    class="fill-current h-6 w-5 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            </p>
          )}
          <div class="mb-4">
            <label
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="grid-firstname"
            >
              Username or email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="John"
              type="text"
              placeholder="John Doe or john@gmail.com"
              ref={userEl}
            />
          </div>
          <div class="mb-6">
            <label
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="grid-firstname"
            >
              Password
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              ref={passwordEl}
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <a
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
