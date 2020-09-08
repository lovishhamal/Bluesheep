import React from 'react';

import './styles/app.css';
import Routes from './routes';
import { ContextProvider } from './context';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Routes />
      </ContextProvider>
    </div>
  );
}

export default App;
