import React, { useEffect, useState } from 'react';
import { getRoom } from '../services/room-service';

const Context = React.createContext({});

const ContextProvider = (props) => {
  const [rooms, setrooms] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      getRoom().then((data) => setrooms(data.data));
    };
    fetchData();
  }, []);
  return (
    <Context.Provider value={{ rooms }}>{props.children}</Context.Provider>
  );
};

export { Context, ContextProvider };
