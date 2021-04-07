import React, { useState, useContext } from 'react';
import './signup.css';
import { Link, useHistory } from 'react-router-dom';
import { registerService } from '../../../services/auth-service';
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

const error = () => {
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: 'Email/Phone already exists',
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
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    confirmpassword: null,
    phoneno: null,
    country: null,
    city: null,
    citizenidno: null,
    formErrors: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmpassword: '',
      phoneno: '',
      country: '',
      city: '',
      citizenidno: '',
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
      case 'firstname':
        formErrors.firstname = value.length < 3 ? 'Minimum 3 characters' : '';
        break;
      case 'lastname':
        formErrors.lastname = value.length === 0 ? 'required field' : '';
        break;
      case 'password':
        formErrors.password = value.length < 5 ? 'Atleast 5 char' : '';
        break;
      case 'confirmpassword':
        formErrors.confirmpassword =
          state.password !== value ? setmatch(false) : setmatch(true);
        break;
      case 'phoneno':
        formErrors.phoneno =
          +value < 9000000000 || +value > 9999999999
            ? 'Number didnot match'
            : '';
        break;
      case 'country':
        formErrors.country =
          value.length < 1 ? 'Please fill out this field' : '';
        break;
      case 'city':
        formErrors.city = value.length < 1 ? 'Please fill out this field' : '';
        break;
      case 'citizenidno':
        formErrors.citizenidno =
          value.length < 1 ? 'Please fill out this field' : '';
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
    if (props?.location?.query?.admin) {
      if (isFormValid(state)) {
        const { formErrors, ...userData } = state;
        delete userData.confirmpassword;
        registerService(userData)
          .then(({ data }) => {
            if (data.status == 400) {
              return setformError(data.message);
            }
            success();
            setUserId(
              data.data.id,
              data.data.firstname + ' ' + data.data.lastname,
              data.data.email
            );
            history.push('/addcustomer', { user_id: data.data.id });
          })
          .catch((err) => error());
      } else {
        setformError('Please fill all the required * fields.');
      }
    } else {
      if (isFormValid(state)) {
        const { formErrors, ...userData } = state;
        delete userData.confirmpassword;
        registerService(userData)
          .then(({ data }) => {
            if (data.status == 400) {
              return setformError(data.message);
            }
            success();
            history.push('/login');
          })
          .catch((err) => error());
      } else {
        setformError('Please fill all the required * fields.');
      }
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
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                id="grid-first-name"
                type="text"
                placeholder="John"
                name="firstname"
                value={state.firstname}
                onChange={handleChange}
              />
              <p class="text-red-500 text-xs italic">
                {state.formErrors.firstname && state.formErrors.firstname}
              </p>
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                id="grid-last-name"
                type="text"
                placeholder="Doe"
                name="lastname"
                value={state.lastname}
                onChange={handleChange}
              />
              <p class="text-red-500 text-xs italic">
                {state.formErrors.lastname && state.formErrors.lastname}
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
            <div class="md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-c-password"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                id="grid-c-password"
                type="password"
                placeholder="**********"
                name="confirmpassword"
                value={state.confirmpassword}
                onChange={handleChange}
              />
              <p class="text-red-500 text-xs italic">
                {!match && state.formErrors.confirmpassword}
              </p>
            </div>

            <div class="md:w-4 px-3 py-1 md:pt-10 lg:pt-10 ">
              <svg
                class={classnames(
                  'w-6',
                  'h-6',
                  `${match ? 'text-green-400' : 'text-red-400'}`
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
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
                name="phoneno"
                value={state.phoneno}
                onChange={handleChange}
              />
              <p class="text-red-500 text-xs italic">
                {state.formErrors.phoneno && state.formErrors.phoneno}
              </p>
            </div>
          </div>
          <div class="-mx-3 md:flex mb-2">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-countru"
              >
                Country <span className="text-red-500">*</span>
              </label>
              <input
                class="appearance-none bg-gray-200 block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                id="grid-country"
                type="text"
                placeholder="Nepal"
                name="country"
                value={state.country}
                onChange={handleChange}
              />
              <p class="text-red-500 text-xs italic">
                {state.formErrors.country && state.formErrors.country}
              </p>
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-city"
              >
                City <span className="text-red-500">*</span>
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-grey-darker border border-grey-lighter rounded py-3 px-4"
                id="grid-city"
                type="text"
                placeholder="Kathmandu"
                name="city"
                value={state.city}
                onChange={handleChange}
              />
              <p class="text-red-500 text-xs italic">
                {state.formErrors.city && state.formErrors.city}
              </p>
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-citizen"
              >
                Citizen Id/Passport No <span className="text-red-500">*</span>
              </label>
              <input
                class="appearance-none bg-gray-200 block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                id="grid-citizen"
                type="text"
                placeholder="123-456-789"
                name="citizenidno"
                value={state.citizenidno}
                onChange={handleChange}
              />
              <p class="text-red-500 text-xs italic">
                {state.formErrors.citizenidno && state.formErrors.citizenidno}
              </p>
            </div>
          </div>
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
