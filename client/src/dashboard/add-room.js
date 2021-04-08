import React, { useState, useEffect } from 'react';
import './style.css';
import Swal from 'sweetalert2';

import { addRoom, editRoom } from '../services/room-service';

const error = (error) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  });

  Toast.fire({
    icon: 'error',
    title: error,
  });
};

const Success = (msg) => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: msg,
    showConfirmButton: false,
    timer: 1500,
  });
  window.location.reload('/addroom');
};

export default function Addroom(props) {
  const [images, setimages] = useState([]);
  const [imagepath, setImagePath] = useState([]);
  const [form, setform] = useState({
    roomno: '',
    roomname: '',
    price: '',
    capacity: '',
    description: '',
    bed: '',
    bathroom: '',
    extra: '',
  });

  useEffect(() => {
    if (props?.match?.params?.id === 'edit') {
      const formData = new FormData();
      setform(props?.location?.query);
      setimages(props?.location?.query?.images);
      setImagePath(props?.location?.query?.images);
    }
  }, []);

  const isValid = (form) => {
    console.log('form -> vv', form);
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
    delete form?.bookings;
    if (!isValid(form) || images.length < 1) {
      return error('Please fill all the fields');
    }

    const formData = new FormData();
    for (const key of Object.keys(images)) {
      formData.append('files', images[key]);
    }
    form.uImage = imagepath;
    formData.append('body', JSON.stringify(form));

    if (props?.match?.params?.id === 'edit') {
      editRoom(props?.location?.query.id, formData)
        .then(({ data }) => {
          Success('Success');
        })
        .catch((err) => error('error'));
    } else {
      addRoom(formData).then(({ data }) => {
        if (data.status == 200) {
          return Success(data.message);
        }
        return error(data.message);
      });
    }
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
                value={form?.roomno}
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
                value={form?.roomname}
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
                value={form?.price}
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
                value={form?.capacity}
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
                value={form?.description}
              />
            </div>
            <div class="mt-2">
              <label class=" block text-sm text-gray-600" for="cus_email">
                Bed
              </label>
              <input
                class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="bed"
                type="number"
                placeholder="Bed"
                aria-label="bed"
                onChange={onChange}
                value={form?.bed}
              />
            </div>
            <div class="mt-2">
              <label class=" block text-sm text-gray-600" for="cus_email">
                Bathroom
              </label>
              <input
                class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="bathroom"
                type="text"
                placeholder="Bathroom"
                aria-label="bathroom"
                onChange={onChange}
                value={form?.bathroom}
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
                value={form?.extra}
              />
            </div>
            <p class="text-lg text-gray-800 font-medium py-4">Upload Images</p>
            <article
              aria-label="File Upload Modal"
              class="relative h-full flex flex-col bg-white shadow-md rounded-md"
            >
              <section class="h-full overflow-auto p-8 w-full h-full flex flex-col">
                <input
                  id="hidden-input"
                  type="file"
                  multiple
                  class="choose mt-2 rounded-sm px-3 py-10 focus:shadow-outline focus:outline-none"
                  onChange={onChangeImage}
                  disabled={images?.length === 5 ? true : false}
                />

                <h1 class="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                  To Upload
                </h1>

                <ul id="gallery" class="flex flex-1 flex-wrap -m-1">
                  <li
                    id="empty"
                    class="h-full w-full text-center flex flex-row items-center justify-center items-center"
                  >
                    {imagepath?.length > 0 ? (
                      imagepath.map((path) => (
                        <div
                          style={{
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                          }}
                        >
                          {/* <i class="fas fa-close mr-3" onClick={() => {}}></i>*/}
                          <h1
                            onClick={() => {
                              setimages(images.filter((item) => item !== path));
                              setImagePath(
                                imagepath.filter((val) => val !== path)
                              );
                            }}
                          >
                            Delete
                          </h1>
                          <img class="mx-auto w-32" src={path} />
                        </div>
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
                {props?.match?.params?.id === 'edit'
                  ? 'Edit Room'
                  : 'Submit Now'}
              </button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
}
