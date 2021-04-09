import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { addFood, editFood } from '../services/food';

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

const isValid = (form) => {
  let valid = true;
  Object.values(form).forEach((val) => {
    val == '' && (valid = false);
  });
  return valid;
};

export default function Addfood(props) {
  const [images, setimages] = useState([]);
  const [imagepath, setImagePath] = useState([]);

  const [form, setform] = useState({
    name: '',
    price: '',
    description: '',
  });
  useEffect(() => {
    if (props?.match?.params?.id === 'edit') {
      setform(props?.location?.query);
      setimages(props?.location?.query?.images);
      setImagePath(props?.location?.query?.images);
    }
  }, []);
  const onSubmit = (e) => {
    console.log('images -> ', images);
    console.log('form -> ', form);
    e.preventDefault();
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
      editFood(props?.location?.query.id, formData)
        .then(({ data }) => {
          Success('Success');
        })
        .catch((err) => error('error'));
    } else {
      addFood(formData)
        .then(({ data }) => {
          if (data.status == 200) {
            return Success(data.message);
          }
          return error(data.message);
        })
        .catch((err) => console.log('err', err));
    }
  };

  const onChange = (e) => {
    let { name, value } = e.target;
    setform({ ...form, [name]: value });
  };

  const onChangeImage = (e) => {
    setimages([...images, e.target.files[0]]);
    setImagePath([...imagepath, URL.createObjectURL(e.target.files[0])]);
  };

  console.log('imag length -> ', images, images.length);

  return (
    <div className="z-20 overflow-x-hidden flex justify-center">
      <div class="scroll w-full lg:w-1/2 mt-6 pl-0 lg:pl-2">
        <p class="text-xl pb-6 flex items-center">
          <i class="fas fa-list mr-3"></i> Add Food
        </p>
        <div class="leading-loose">
          <form
            class="p-10 bg-white rounded shadow-xl"
            onSubmit={onSubmit}
            id="myForm"
          >
            <div class="">
              <label class="block text-sm text-gray-600" for="cus_name">
                Food Name
              </label>
              <input
                class="w-full px-2 py-1 text-gray-700 bg-gray-200 rounded"
                id="cus_name"
                name="name"
                type="text"
                placeholder="Food Name"
                aria-label="roomno"
                onChange={onChange}
                value={form?.name}
              />
            </div>
            <div class="">
              <label class="block text-sm text-gray-600" for="cus_name">
                Description
              </label>
              <input
                class="w-full px-2 py-1 text-gray-700 bg-gray-200 rounded"
                id="cus_name"
                name="description"
                type="text"
                placeholder="Description"
                aria-label="roomno"
                onChange={onChange}
                value={form?.description}
              />
            </div>
            <div class="mt-2">
              <label class=" block text-sm text-gray-600" for="cus_email">
                Price
              </label>
              <input
                class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="price"
                type="number"
                placeholder="Price"
                aria-label="description"
                onChange={onChange}
                value={form?.price}
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
                  disabled={images?.length === 1 ? true : false}
                />
                <h1 class="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                  To Upload
                </h1>

                <ul id="gallery" class="flex flex-1 flex-wrap -m-1">
                  <li
                    id="empty"
                    class="h-full w-full text-center flex flex-row items-center justify-center items-center"
                  >
                    {images?.length > 0 ? (
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
                              setimages([]);
                              setImagePath([]);
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
                  ? 'Edit Food'
                  : 'Submit Now'}
              </button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
}
