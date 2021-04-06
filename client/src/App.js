import React, { useEffect } from 'react';
import './styles/app.css';
import Routes from './routes';
import { ContextProvider } from './context';
import firebase from './firebase';

function App() {
  useEffect(() => {
    const msg = firebase.messaging();
    msg
      .requestPermission()
      .then((item) => msg.getToken())
      .then((data) => console.log('data->token ', data));
  }, []);
  return (
    <div className="App">
      <ContextProvider>
        <Routes />
      </ContextProvider>
    </div>
  );
}

export default App;
