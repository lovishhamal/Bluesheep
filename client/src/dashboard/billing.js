import React, { useEffect, useState, useContext } from 'react';
import { getBill } from '../services/user-service';
import Placeholder from '../common/Placeholder';
import { Context } from '../context';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/bluesheep_logo.png';
import colors from '../colors/colors';

const foods = [];
export default function Customers(props) {
  const [data, setData] = useState({ food: [], booking: [] });
  const [loading, setLoading] = useState(false);
  const [food, setFood] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (props?.location?.query?.user?.id) {
          const data = await getBill(
            props.location.query.user.id,
            props?.location?.query
          );
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
  }, []);

  return (
    <div class="z-20 w-full overflow-x-hidden border-t flex flex-col">
      <main class="w-full overflow-scroll flex-grow p-6">
        <h1 class="text-3xl text-black pb-6">Billing</h1>
        <div class="w-full mt-12 flex-col justify-center items-center">
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
                </div>
                <div>
                  <h1 style={{ color: colors.primaryColor }}>Amount Due</h1>
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
              <div className="flex-row justify-between items-start flex w-full">
                <div>
                  <h1 style={{ color: colors.primaryColor }}>Food</h1>
                </div>
                <div>
                  <h1 style={{ color: colors.primaryColor }}>Rate</h1>
                </div>
                <div>
                  <h1 style={{ color: colors.primaryColor }}>Qty</h1>
                </div>
                <div>
                  <h1 style={{ color: colors.primaryColor }}>Total</h1>
                </div>
              </div>
              {food.map((item) => {
                return (
                  <div className="flex-row justify-between items-center flex w-full">
                    <div>
                      <h1>{item.name}</h1>
                    </div>
                    <div>
                      <h1>{item.rate}</h1>
                    </div>
                    <div>
                      <h1>{item.count}</h1>
                    </div>
                    <div>
                      <h1>{item.price}</h1>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <h1>No billing found</h1>
          )}
        </div>
      </main>
    </div>
  );
}

/* <div class="mt-6">
                <button class="flex items-center justify-between w-full bg-white rounded-md border-2 border-blue-500 p-4 focus:outline-none">
                  <label class="flex items-center">
                    <input
                      type="radio"
                      class="form-radio h-5 w-5 text-blue-600"
                      checked
                    />
                    <span class="ml-2 text-sm text-gray-700">MS Delivery</span>
                  </label>

                  <span class="text-gray-600 text-sm">$18</span>
                </button>
              </div>*/
