import React, { useState, useContext } from 'react';
import './signup.css';
import { Link, useHistory } from 'react-router-dom';
import { registerAdminService } from '../../../services/admin-services';
import { classnames } from 'tailwindcss-classnames';
import Swal from 'sweetalert2';
import { Context } from '../../../context';

const emailRegx = RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const success = () => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Your are successfully registered.',
    showConfirmButton: false,
    timer: 1500,
  });
};

const error = (msg) => {
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: msg,
    showConfirmButton: false,
    timer: 1500,
  });
};

export default function SignIn(props) {
  let history = useHistory();
  const [formError, setformError] = useState('');
  const { setUserId } = useContext(Context);
  const [match, setmatch] = useState(false);

  const [state, setState] = useState({
    name: null,
    email: null,
    password: null,
    phone: null,
    role: false,
    formErrors: {
      name: '',
      email: '',
      password: '',
      phone: '',
    },
  });

  const handleChange = (e) => {
    e.preventDefault();

    let { name, value } = e.target;
    let formErrors = state.formErrors;

    switch (name) {
      case 'email':
        if (emailRegx.test(value)) {
          formErrors.email = '';
        } else {
          formErrors.email = 'Ivalid email fromat';
        }
        break;
      case 'name':
        formErrors.firstname = value.length < 3 ? 'Minimum 3 characters' : '';
        break;
      case 'password':
        formErrors.password = value.length < 5 ? 'Atleast 5 char' : '';
        break;
      case 'phone':
        formErrors.phone =
          +value < 9000000000 || +value > 9999999999
            ? 'Number didnot match'
            : '';
        break;
      default:
        break;
    }

    setState({ ...state, formErrors, [name]: value });
  };

  const isFormValid = ({ formErrors, ...rest }) => {
    if (formErrors === undefined) {
      return false;
    }
    let valid = true;
    Object.values(formErrors).forEach((val) => {
      val.length > 0 && (valid = false);
    });
    Object.values(rest).forEach((val) => {
      val === null && (valid = false);
    });

    return valid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    delete state.formErrors.confirmpassword;

    if (isFormValid(state)) {
      const { formErrors, ...userData } = state;
      userData.role = userData.role === true ? 'super-admin' : 'admin';
      registerAdminService(userData)
        .then(({ data }) => {
          if (data.status == 400) {
            return setformError(data.message);
          }
          success();
          history.push('/admin/login');
        })
        .catch((err) => error(err));
    } else {
      setformError('Please fill all the required * fields.');
    }
  };

  return (
    <div class="sign w-full flex items-center justify-center md:h-screen lg:h-screen">
      <div class="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <form onSubmit={onSubmit}>
          <p class="text-red-500 text-xs italic mb-2">
            {formError && (
              <div
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span class="block sm:inline">{formError}</span>
                <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg
                    class="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    onClick={() => setformError('')}
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            )}
          </p>
          <div class="-mx-3 md:flex mb-6">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-firstname"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                id="grid-first-name"
                type="text"
                placeholder="John"
                name="name"
                value={state.name}
                onChange={handleChange}
              />
              <p class="text-red-500 text-xs italic">
                {state.formErrors.name && state.formErrors.name}
              </p>
            </div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-email"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                id="grid-email"
                type="email"
                placeholder="johndoe@gmail.com"
                name="email"
                value={state.email}
                onChange={handleChange}
              />
              <p class="text-red-500 text-xs italic">
                {state.formErrors.email && state.formErrors.email}
              </p>
            </div>
          </div>
          <div class="-mx-3 md:flex mb-6">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs  font-bold mb-2"
                for="grid-password"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                id="grid-password"
                type="password"
                placeholder="**********"
                name="password"
                password={state.password}
                onChange={handleChange}
              />
              <p class="text-red-500 text-xs italic">
                {state.formErrors.password && state.formErrors.password}
              </p>
            </div>
          </div>
          <div class="-mx-3 md:flex mb-6">
            <div class="md:w-full px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-phone"
              >
                Phone No <span className="text-red-500">*</span>
              </label>
              <input
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                id="grid-phone"
                type="number"
                placeholder="9800000000"
                name="phone"
                value={state.phone}
                onChange={handleChange}
              />
              <p class="text-red-500 text-xs italic">
                {state.formErrors.phone && state.formErrors.phone}
              </p>
            </div>
          </div>
          <label class="flex justify-start items-start">
            <div class="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
              <input
                type="checkbox"
                class="opacity-0 absolute"
                checked={state.role}
                onClick={() => setState({ ...state, role: !state.role })}
              />
              <svg
                class="fill-current hidden w-4 h-4 text-green-500 pointer-events-none"
                viewBox="0 0 20 20"
              >
                <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
              </svg>
            </div>
            <div class="select-none">Super Admin</div>
          </label>

          <div class="flex items-center mt-8">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
            <Link
              class="inline-block ml-6 align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/login"
            >
              Already Sign up ?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
