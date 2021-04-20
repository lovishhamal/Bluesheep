import React, { useEffect, useState } from 'react';
import { getBill, checkout } from '../../../services/user-service';
import Placeholder from '../../../common/Placeholder';
import Logo from '../../../assets/images/bluesheep_logo.png';
import colors from '../../../colors/colors';

let foods = [];
let totalPrice = 0;
let totalRoom = 0;
const tax = 10;
let finalPrice = 0;

export default function Customers(props) {
  const [data, setData] = useState({ food: [], booking: [] });
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(false);
  const [food, setFood] = useState([]);

  console.log('props -> ', props.location);
  useEffect(() => {
    (async () => {
      try {
        if (props?.location?.query?.user?.id) {
          const data = await getBill(
            props.location.query.user.id,
            props?.location?.query
          );

          totalRoom = data.data.data.booking
            .map((item) => item.price)
            .reduce((c, v) => c + v);

          if (data.data.data.food.length > 0) {
            totalPrice = data.data.data.food
              .map((item) => item.food[0].price)
              .reduce((c, v) => c + v);
          } else {
            totalPrice = data.d;
            foods = [];
            totalPrice = 0;
          }

          finalPrice = (totalPrice + totalRoom) / tax;

          setBooking(data.data.data.booking);
          setData(data?.data?.data ?? { food: [], booking: [] });
          let mapItem = data?.data?.data?.food?.map((item) => {
            return {
              ...item.food[0],
              count: 1,
              rate: item.food[0].price,
            };
          });
          for (let i in mapItem) {
            const find = foods.find((item) => item.id === mapItem[i].id);
            if (!find) {
              foods.push(mapItem[i]);
            } else {
              find.price += mapItem[i].price;
              find.count = find.count + 1;
            }
          }
        }
        setFood(foods ?? []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [props?.location?.query?.user?.id]);

  const Print = async () => {
    try {
      await checkout(props?.location?.query?.id);
      window.print();
    } catch (error) {}
  };

  return (
    <div class="z-20 w-full overflow-x-hidden border-t flex flex-col">
      <main class="w-full overflow-scroll flex-grow p-6">
        <div class="w-full flex-col justify-center items-center">
          {loading ? (
            <Placeholder />
          ) : data ? (
            <div
              class="bg-white overflow-auto px-4 py-4 rounded flex-col justify-start items-start flex"
              style={{ borderWidth: 1 }}
            >
              <div className="flex-row justify-start items-start flex">
                <img src={Logo} style={{ width: 140, height: 140 }} />
                <span style={{ marginLeft: 20 }} />
                <div style={{ flexDirection: 'column', paddingTop: 10 }}>
                  <h1 style={{ fontSize: 30, fontWeight: '700' }}>
                    BlueSheep Hotel
                  </h1>
                  <h1 style={{ fontSize: 20, marginTop: -10 }}>
                    Hotels invoice
                  </h1>
                </div>
              </div>
              <div
                style={{ marginTop: 20 }}
                className="flex-row justify-between items-start flex w-full"
              >
                <div>
                  <h1 style={{ color: colors.primaryColor }}>Billed To</h1>
                  <h1>
                    {props?.location?.query?.user?.firstname +
                      ' ' +
                      props?.location?.query?.user?.lastname}
                  </h1>
                  <h1>{props?.location?.query?.user?.email}</h1>
                  <h1>
                    {props?.location?.query?.user?.city +
                      ', ' +
                      props?.location?.query?.user?.country}
                  </h1>
                </div>
                <div>
                  <h1 style={{ color: colors.primaryColor }}>Date of issue</h1>
                  <h1>{new Date().toISOString().slice(0, 10)}</h1>
                </div>
                <div>
                  <h1 style={{ color: colors.primaryColor }}>Invoice Number</h1>
                  <h1>{(Math.random() * 100000000).toString().slice(0, 14)}</h1>
                </div>
                <div>
                  <h1 style={{ color: colors.primaryColor }}>Amount Due</h1>
                  <h1>Rs {totalPrice + totalRoom}</h1>
                </div>
              </div>
              <div
                className="w-full"
                style={{
                  marginTop: 10,
                  height: 5,
                  backgroundColor: colors.primaryColor,
                }}
              />
              <span style={{ marginTop: 10 }} />
              <div class="w-full">
                <div class="align-middle inline-block w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
                  <table class="w-full">
                    <thead>
                      <tr>
                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                          Food
                        </th>
                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                          Rate
                        </th>
                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                          Quantity
                        </th>
                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white">
                      {food.length > 0 &&
                        food.map((item) => (
                          <tr>
                            <td class="px-6 py-4 whitespace-no-wrap">
                              <div class="flex items-center">
                                <div>
                                  <div class="text-sm leading-5 text-gray-800">
                                    {item.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap">
                              <div class="text-sm leading-5 text-blue-900">
                                {item.rate}
                              </div>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap text-blue-900 text-sm leading-5">
                              {item.count}
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap text-blue-900 text-sm leading-5">
                              {item.price}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="flex flex-col justify-end items-end w-full mt-4 mb-4">
                    <div className="flex flex-row justify-between">
                      <h1 style={{ color: colors.primaryColor }}>Total</h1>
                      <span style={{ marginRight: 40 }} />
                      <h1> Rs {totalPrice}</h1>
                    </div>
                  </div>
                </div>
              </div>
              <span style={{ marginTop: 20 }} />
              <div class="w-full">
                <div class="align-middle inline-block w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
                  <table class="w-full">
                    <thead>
                      <tr>
                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                          Room No
                        </th>
                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                          Room Name
                        </th>
                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                          Rate
                        </th>
                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                          Checkin At
                        </th>
                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                          Checkout At
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white">
                      {booking.length > 0 &&
                        booking.map((item) => (
                          <tr>
                            <td class="px-6 py-4 whitespace-no-wrap">
                              <div class="flex items-center">
                                <div>
                                  <div class="text-sm leading-5 text-gray-800">
                                    {item.roomno}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap">
                              <div class="text-sm leading-5 text-blue-900">
                                {item.roomname}
                              </div>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap text-blue-900 text-sm leading-5">
                              {item.price}
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap text-blue-900 text-sm leading-5">
                              {item.start_date}
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap text-blue-900 text-sm leading-5">
                              {item.end_date}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="flex flex-col justify-end items-end w-full mt-4 mb-4">
                    <div className="flex flex-row justify-between">
                      <h1 style={{ color: colors.primaryColor }}>Total</h1>
                      <span style={{ marginRight: 40 }} />
                      <h1> Rs {totalRoom}</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-end items-end w-full mt-4">
                <div className="flex flex-col justify-end items-end w-full mt-4">
                  <h1>Sub Total</h1>
                  <span style={{ marginTop: 10 }} />
                  <h1>Tax</h1>
                  <span style={{ marginTop: 10 }} />
                  <h1 style={{ color: colors.primaryColor }}>Grand Total</h1>
                </div>
                <span style={{ marginRight: 10 }} />
                <div
                  className="flex flex-col justify-end items-end"
                  style={{ width: '10%' }}
                >
                  <h1>Rs {totalPrice + totalRoom}</h1>
                  <span style={{ marginTop: 10 }} />
                  <h1>{`${tax}%`}</h1>
                  <span style={{ marginTop: 10 }} />
                  <h1>Rs {totalPrice + totalRoom + finalPrice}</h1>
                </div>
              </div>
              <div className="flex justify-end items-end w-full">
                <button
                  type="button"
                  class="inline-flex justify-center w-2/12 rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5 mt-5"
                  onClick={Print}
                >
                  Print
                </button>
              </div>
            </div>
          ) : (
            <h1>No billing found</h1>
          )}
        </div>
      </main>
    </div>
  );
}
