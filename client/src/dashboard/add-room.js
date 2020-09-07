import React, { useState } from 'react';
import './style.css';
import Swal from 'sweetalert2';

import { addRoom } from '../services/room-srvice';

const Error = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  });

  Toast.fire({
    icon: 'error',
    title: 'Please fill all the fields',
  });
};

export default function Addroom() {
  const [images, setimages] = useState([]);
  const [imagepath, setImagePath] = useState([]);
  const [form, setform] = useState({
    roomno: '',
    roomname: '',
    price: '',
    capacity: '',
    description: '',
    extra: '',
  });

  const isValid = (form) => {
    let valid = true;
    Object.values(form).forEach((val) => {
      val == '' && (valid = false);
    });
    return valid;
  };

  const onChangeImage = (e) => {
    setimages([...images, e.target.files[0]]);
    setImagePath([...imagepath, URL.createObjectURL(e.target.files[0])]);
  };

  const onChange = (e) => {
    let { name, value } = e.target;
    setform({ ...form, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isValid(form) || images.length < 1) {
      return Error();
    }

    const formData = new FormData();
    for (const key of Object.keys(images)) {
      formData.append('files', images[key]);
    }
    formData.append('body', JSON.stringify(form));
    addRoom(formData);
  };

  return (
    <div className="z-20 overflow-x-hidden flex justify-center">
      <div class="scroll w-full lg:w-1/2 mt-6 pl-0 lg:pl-2">
        <p class="text-xl pb-6 flex items-center">
          <i class="fas fa-list mr-3"></i> Add Room
        </p>
        <div class="leading-loose">
          <form
            class="p-10 bg-white rounded shadow-xl"
            onSubmit={onSubmit}
            id="myForm"
          >
            <p class="text-lg text-gray-800 font-medium pb-4">
              Customer information
            </p>
            <div class="">
              <label class="block text-sm text-gray-600" for="cus_name">
                Room No
              </label>
              <input
                class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="cus_name"
                name="roomno"
                type="number"
                placeholder="Room No"
                aria-label="roomno"
                onChange={onChange}
              />
            </div>
            <div class="">
              <label class="block text-sm text-gray-600" for="cus_name">
                Room Name
              </label>
              <input
                class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="cus_name"
                name="roomname"
                type="text"
                placeholder="Room Name"
                aria-label="roomname"
                onChange={onChange}
              />
            </div>
            <div class="mt-2">
              <label class="block text-sm text-gray-600" for="cus_email">
                Room Price
              </label>
              <input
                class="w-full px-5  py-1 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="price"
                type="number"
                placeholder="Room Price"
                aria-label="roomprice"
                onChange={onChange}
              />
            </div>
            <div class="mt-2">
              <label class=" block text-sm text-gray-600" for="cus_email">
                Room Capacity
              </label>
              <input
                class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="capacity"
                type="number"
                placeholder="Room Capacity"
                aria-label="capacity"
                onChange={onChange}
              />
            </div>
            <div class="mt-2">
              <label class=" block text-sm text-gray-600" for="cus_email">
                Description
              </label>
              <input
                class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="description"
                type="text"
                placeholder="Description"
                aria-label="description"
                onChange={onChange}
              />
            </div>
            <div class="mt-2">
              <label class=" block text-sm text-gray-600" for="cus_email">
                Extra
              </label>
              <input
                class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="extra"
                type="text"
                placeholder="Extra"
                aria-label="extra"
                onChange={onChange}
              />
            </div>
            <p class="text-lg text-gray-800 font-medium py-4">Upload Images</p>
            <article
              aria-label="File Upload Modal"
              class="relative h-full flex flex-col bg-white shadow-md rounded-md"
            >
              <section class="h-full overflow-auto p-8 w-full h-full flex flex-col">
                <header class="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                  <input
                    id="hidden-input"
                    type="file"
                    multiple
                    class=" choose mt-2 rounded-sm px-3 py-1 focus:shadow-outline focus:outline-none"
                    onChange={onChangeImage}
                    disabled={images.length === 5 ? true : false}
                  />
                  Upload file
                </header>

                <h1 class="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                  To Upload
                </h1>

                <ul id="gallery" class="flex flex-1 flex-wrap -m-1">
                  <li
                    id="empty"
                    class="h-full w-full text-center flex flex-row items-center justify-center items-center"
                  >
                    {images.length > 0 ? (
                      imagepath.map((path) => (
                        <img class="mx-auto w-32" src={path}></img>
                      ))
                    ) : (
                      <span>
                        <img
                          class="mx-auto w-32"
                          src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                          alt="no data"
                        />
                        <span class="text-small text-gray-500">
                          No files selected
                        </span>
                      </span>
                    )}
                  </li>
                </ul>
              </section>
            </article>
            <footer class="flex justify-start pt-8">
              <button
                type="submit"
                id="submit"
                class="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none"
              >
                Submit Now
              </button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
}
