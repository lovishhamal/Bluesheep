import React, { useState, useRef } from 'react';
import './signup.css';
import { Link, useHistory } from 'react-router-dom';
import { loginService } from '../../../services/auth-service';

const emailRegx = RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export default function SignIn() {
  const [formErrors, setformErrors] = useState('');
  let history = useHistory();

  const userEl = useRef(null);
  const passwordEl = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (userEl.current.value === '' || passwordEl.current.value === '') {
      return setformErrors('Please fill all fields ');
    }

    if (!emailRegx.test(userEl.current.value)) {
      return setformErrors('Email format didont matched');
    }

    loginService({
      email: userEl.current.value,
      password: passwordEl.current.value,
    }).then(({ data }) => {
      if (data.status == 400) {
        return setformErrors(data.message);
      }
      localStorage.setItem('token', data.token);
      history.push('/');
    });
  };

  return (
    <div className=" h-screen bg-gray-100 flex self-center">
      <div class="container mx-auto ">
        <div class="flex justify-center px-6 my-12">
          <div class="w-full xl:w-3/4 lg:w-11/12 shadow-2xl flex">
            <div class="login-card w-full h-auto hidden lg:block lg:w-1/2 bg-cover rounded-l-lg" />
            <div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 class="pt-4 text-2xl text-center">WELCOME BACK!</h3>
              <form
                class="px-8 pt-6 pb-8 mb-4 bg-white rounded"
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
                    class="block mb-2 text-sm font-bold text-gray-700"
                    for="username"
                  >
                    Email
                  </label>
                  <input
                    class="w-full px-3 py-4 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="johndoe@gmail.com"
                    ref={userEl}
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block mb-2 text-sm font-bold text-gray-700"
                    for="password"
                  >
                    Password
                  </label>
                  <input
                    class="w-full px-3 py-4 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    ref={passwordEl}
                  />
                </div>
                <div class="mb-4">
                  <input
                    class="mr-2 leading-tight"
                    type="checkbox"
                    id="checkbox_id"
                  />
                  <label class="text-sm" for="checkbox_id">
                    Remember Me
                  </label>
                </div>
                <div class="mb-6 text-center">
                  <button
                    class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Log In
                  </button>
                </div>
                <hr class="mb-6 border-t" />
                <div class="text-center">
                  <Link
                    class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    to="/register"
                  >
                    Create an Account!
                  </Link>
                </div>
                <div class="text-center">
                  <Link
                    class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    to="./forgot-password"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*<div class="w-full max-w-xs">
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
      </div>*/
